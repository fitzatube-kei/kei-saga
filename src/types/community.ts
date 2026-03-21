import type { AvatarConfig } from '@/types/user';

export interface Post {
  id: string;
  authorUid: string;
  authorNickname: string;
  authorAvatar: AvatarConfig; // denormalized
  type: 'text' | 'poll';
  title: string;
  content: string;
  poll?: PollData;
  likes: number;
  commentCount: number;
  createdAt: Date;
}

export interface PollData {
  options: PollOption[];
  totalVotes: number;
  endsAt?: Date;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Comment {
  id: string;
  postId: string;
  authorUid: string;
  authorNickname: string;
  authorAvatar: AvatarConfig;
  content: string;
  createdAt: Date;
}

export interface FriendRequest {
  id: string;
  fromUid: string;
  fromNickname: string;
  fromAvatar: AvatarConfig;
  toUid: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}
