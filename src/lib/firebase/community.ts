import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  setDoc,
  increment,
  serverTimestamp,
  query,
  orderBy,
  limit as firestoreLimit,
  startAfter,
  DocumentSnapshot,
} from 'firebase/firestore';
import { db } from './config';
import type { Post, Comment } from '@/types';

/* ------------------------------------------------------------------ */
/*  Posts                                                              */
/* ------------------------------------------------------------------ */

export async function createPost(
  post: Omit<Post, 'id' | 'likes' | 'commentCount' | 'createdAt'>
): Promise<string> {
  const ref = await addDoc(collection(db, 'posts'), {
    ...post,
    likes: 0,
    commentCount: 0,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function getPosts(
  limitCount: number = 20,
  lastDoc?: DocumentSnapshot
): Promise<{ posts: Post[]; lastDoc: DocumentSnapshot | null }> {
  let q = query(
    collection(db, 'posts'),
    orderBy('createdAt', 'desc'),
    firestoreLimit(limitCount)
  );

  if (lastDoc) {
    q = query(
      collection(db, 'posts'),
      orderBy('createdAt', 'desc'),
      startAfter(lastDoc),
      firestoreLimit(limitCount)
    );
  }

  const snap = await getDocs(q);
  const posts: Post[] = snap.docs.map((d) => {
    const data = d.data();
    return {
      ...data,
      id: d.id,
      createdAt: data.createdAt?.toDate?.() ?? new Date(),
      poll: data.poll
        ? {
            ...data.poll,
            endsAt: data.poll.endsAt?.toDate?.() ?? undefined,
          }
        : undefined,
    } as Post;
  });

  const last = snap.docs.length > 0 ? snap.docs[snap.docs.length - 1] : null;
  return { posts, lastDoc: last };
}

export async function getPost(postId: string): Promise<Post | null> {
  const ref = doc(db, 'posts', postId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  const data = snap.data();
  return {
    ...data,
    id: snap.id,
    createdAt: data.createdAt?.toDate?.() ?? new Date(),
    poll: data.poll
      ? {
          ...data.poll,
          endsAt: data.poll.endsAt?.toDate?.() ?? undefined,
        }
      : undefined,
  } as Post;
}

/* ------------------------------------------------------------------ */
/*  Likes                                                             */
/* ------------------------------------------------------------------ */

export async function likePost(postId: string): Promise<void> {
  const ref = doc(db, 'posts', postId);
  await updateDoc(ref, { likes: increment(1) });
}

/* ------------------------------------------------------------------ */
/*  Comments                                                          */
/* ------------------------------------------------------------------ */

export async function addComment(
  postId: string,
  comment: Omit<Comment, 'id' | 'postId' | 'createdAt'>
): Promise<string> {
  const commentsRef = collection(db, 'posts', postId, 'comments');
  const ref = await addDoc(commentsRef, {
    ...comment,
    postId,
    createdAt: serverTimestamp(),
  });

  // 댓글 수 증가
  const postRef = doc(db, 'posts', postId);
  await updateDoc(postRef, { commentCount: increment(1) });

  return ref.id;
}

export async function getComments(postId: string): Promise<Comment[]> {
  const q = query(
    collection(db, 'posts', postId, 'comments'),
    orderBy('createdAt', 'asc')
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      ...data,
      id: d.id,
      postId,
      createdAt: data.createdAt?.toDate?.() ?? new Date(),
    } as Comment;
  });
}

/* ------------------------------------------------------------------ */
/*  Poll Voting                                                       */
/* ------------------------------------------------------------------ */

export async function votePoll(
  postId: string,
  optionId: string,
  userId: string
): Promise<boolean> {
  // 중복 투표 확인
  const voterRef = doc(db, 'posts', postId, 'voters', userId);
  const voterSnap = await getDoc(voterRef);

  if (voterSnap.exists()) {
    return false; // 이미 투표함
  }

  // 투표 기록 저장
  await setDoc(voterRef, { optionId, votedAt: serverTimestamp() });

  // 게시글의 poll 데이터 업데이트를 위해 현재 데이터 가져오기
  const postRef = doc(db, 'posts', postId);
  const postSnap = await getDoc(postRef);
  if (!postSnap.exists()) return false;

  const postData = postSnap.data();
  const poll = postData.poll;
  if (!poll) return false;

  const updatedOptions = poll.options.map(
    (opt: { id: string; text: string; votes: number }) =>
      opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
  );

  await updateDoc(postRef, {
    'poll.options': updatedOptions,
    'poll.totalVotes': increment(1),
  });

  return true;
}
