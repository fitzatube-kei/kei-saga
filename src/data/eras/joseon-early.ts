import { Era } from '@/types/game';

export const joseonEarly: Era = {
  id: 'joseon-early',
  name: '조선 (전기)',
  nameEn: 'Joseon Early',
  period: '1392~1592',
  description: '조선 건국부터 임진왜란까지, 유교 문화가 꽃피운 시기입니다.',
  imageColor: '#4B0082',
  order: 8,
  periods: [
    // ============================================================
    // Period 1: 조선 건국 (1392~1398)
    // ============================================================
    {
      id: 'joseon-founding',
      eraId: 'joseon-early',
      name: '조선 건국',
      years: '1392~1398',
      description:
        '고려 말 혼란기를 거쳐 이성계가 새로운 왕조 조선을 건국하고 한양으로 천도한 시기입니다.',
      events: [
        // ── Event 1: 위화도 회군 ──
        {
          id: 'wihwado-retreat',
          periodId: 'joseon-founding',
          eraId: 'joseon-early',
          title: '위화도 회군',
          description:
            '이성계가 요동 정벌을 위해 출병했다가 위화도에서 회군하여 고려를 멸하고 조선을 건국하는 이야기를 체험합니다.',
          character: {
            id: 'yi-seong-gye',
            name: '이성계',
            title: '조선 태조',
            description:
              '고려 말 뛰어난 무장으로 위화도 회군을 통해 권력을 장악하고, 1392년 조선을 건국한 태조입니다.',
            primaryColor: '#4B0082',
            secondaryColor: '#FFD700',
          },
          difficulty: 'medium',
          pointReward: 500,
          steps: [
            {
              id: 'wihwado-step-1',
              type: 'narration',
              text: '1388년, 고려 말. 명나라가 철령 이북의 영토를 요구하자 최영 장군은 요동 정벌을 주장하였고, 우왕은 이를 받아들였습니다.',
            },
            {
              id: 'wihwado-step-2',
              type: 'dialog',
              speaker: '이성계',
              text: '소장이 아뢰옵니다. 지금 요동을 치는 것은 네 가지 불가한 이유가 있사옵니다. 작은 나라로 큰 나라를 거스르는 것이 첫째요, 여름에 군사를 동원하는 것이 둘째요, 온 나라 군사를 동원하면 왜적이 틈을 노릴 것이 셋째요, 장마철이라 활의 아교가 풀어지고 군사들이 전염병에 걸릴 것이 넷째이옵니다.',
            },
            {
              id: 'wihwado-step-3',
              type: 'dialog',
              speaker: '이성계',
              text: '허나 최영 장군과 우왕 전하께서 뜻을 굽히지 않으시니, 부득이 출정하겠나이다.',
            },
            {
              id: 'wihwado-step-4',
              type: 'narration',
              text: '이성계는 5만 대군을 이끌고 압록강 하류의 위화도에 도착했습니다. 그러나 장마로 강물이 불어 도강이 어려웠습니다.',
            },
            {
              id: 'wihwado-step-5',
              type: 'dialog',
              speaker: '이성계',
              text: '보아라, 장마비에 강물이 넘치고 군사들은 지쳐 쓰러지고 있다. 이대로 나아가면 전군이 위태로울 것이다. 나는 회군을 결심하였노라!',
            },
            {
              id: 'wihwado-step-6',
              type: 'quiz',
              quiz: {
                question: '위화도 회군이 일어난 해는 언제인가요?',
                options: ['1385년', '1388년', '1390년', '1392년'],
                correctIndex: 1,
                explanation:
                  '위화도 회군은 1388년에 일어났습니다. 이성계는 요동 정벌을 위해 출병했다가 압록강 위화도에서 군사를 돌렸습니다.',
              },
            },
            {
              id: 'wihwado-step-7',
              type: 'narration',
              text: '이성계는 군사를 돌려 개경으로 진군하였습니다. 최영 장군은 체포되고 우왕은 폐위되었습니다.',
            },
            {
              id: 'wihwado-step-8',
              type: 'dialog',
              speaker: '이성계',
              text: '최영 장군에게는 미안하나 이것이 나라와 백성을 위한 길이다. 무고한 백성의 피를 흘리게 할 수는 없었노라.',
            },
            {
              id: 'wihwado-step-9',
              type: 'quiz',
              quiz: {
                question:
                  '이성계가 회군을 결심한 가장 직접적인 이유는 무엇인가요?',
                options: [
                  '명나라와 비밀 협약을 맺어서',
                  '장마와 군사들의 피로 등 현실적 어려움',
                  '최영 장군과의 개인적 갈등',
                  '왜구의 침입 소식을 들어서',
                ],
                correctIndex: 1,
                explanation:
                  '이성계는 장마로 인한 도강 불가, 군사들의 피로와 질병 등 현실적인 이유로 회군을 결심하였습니다.',
              },
            },
            {
              id: 'wihwado-step-10',
              type: 'narration',
              text: '이후 이성계는 고려의 실권을 장악하고, 1392년 7월 마침내 새 왕조 조선을 건국하였습니다.',
            },
            {
              id: 'wihwado-step-11',
              type: 'dialog',
              speaker: '이성계',
              text: '새 나라의 이름은 조선이라 하겠노라. 아침의 고요한 나라, 조선! 백성이 편안하고 나라가 태평한 세상을 열겠노라!',
            },
            {
              id: 'wihwado-step-12',
              type: 'quiz',
              quiz: {
                question: '조선이 건국된 해는 언제인가요?',
                options: ['1388년', '1390년', '1392년', '1394년'],
                correctIndex: 2,
                explanation:
                  '조선은 1392년에 이성계에 의해 건국되었습니다. 위화도 회군(1388)으로부터 4년 뒤의 일입니다.',
              },
            },
          ],
        },
        // ── Event 2: 한양 천도 ──
        {
          id: 'hanyang-capital',
          periodId: 'joseon-founding',
          eraId: 'joseon-early',
          title: '한양 천도',
          description:
            '조선 건국 후 수도를 개경에서 한양(서울)으로 옮기는 과정과 풍수지리에 기반한 입지 선정 이야기를 체험합니다.',
          character: {
            id: 'yi-seong-gye-taejo',
            name: '이성계',
            title: '조선 태조',
            description:
              '조선을 건국한 태조로서, 새 왕조의 수도를 한양으로 정하고 경복궁을 건설하여 조선의 기틀을 다졌습니다.',
            primaryColor: '#4B0082',
            secondaryColor: '#FFD700',
          },
          difficulty: 'easy',
          pointReward: 300,
          steps: [
            {
              id: 'hanyang-step-1',
              type: 'narration',
              text: '1394년, 조선을 건국한 태조 이성계는 새 나라에 걸맞은 새 수도를 정하고자 하였습니다. 개경은 고려의 도읍이었기에 새로운 시작이 필요했습니다.',
            },
            {
              id: 'hanyang-step-2',
              type: 'dialog',
              speaker: '이성계',
              text: '새 나라를 세웠으니 새 도읍이 있어야 하느니라. 풍수를 살펴 천하의 명당을 찾으라 명하노라.',
            },
            {
              id: 'hanyang-step-3',
              type: 'narration',
              text: '풍수지리학자 무학대사와 정도전 등이 여러 후보지를 검토하였습니다. 계룡산, 무악(지금의 신촌 일대), 한양 등이 후보에 올랐습니다.',
            },
            {
              id: 'hanyang-step-4',
              type: 'dialog',
              speaker: '이성계',
              text: '정도전이 아뢰기를, 한양은 사방이 산으로 둘러싸이고 한강이 흐르니 천혜의 요새라 하였느니라. 북으로 북악산, 남으로 남산, 좌로 낙산, 우로 인왕산이 감싸고 있다 하니 이보다 좋은 곳이 어디 있겠는가!',
            },
            {
              id: 'hanyang-step-5',
              type: 'quiz',
              quiz: {
                question:
                  '한양 천도가 이루어진 해는 언제인가요?',
                options: ['1392년', '1393년', '1394년', '1396년'],
                correctIndex: 2,
                explanation:
                  '한양 천도는 1394년에 이루어졌습니다. 조선 건국(1392) 2년 후의 일입니다.',
              },
            },
            {
              id: 'hanyang-step-6',
              type: 'narration',
              text: '태조는 한양을 새 수도로 정하고, 경복궁 건설을 시작하였습니다. 정도전은 궁궐과 도성의 이름을 짓는 중요한 역할을 맡았습니다.',
            },
            {
              id: 'hanyang-step-7',
              type: 'dialog',
              speaker: '이성계',
              text: '정도전이 지은 궁의 이름 \'경복궁\', 큰 복을 누리라는 뜻이라 하니 참으로 좋구나. 이 궁에서 만대의 태평성대를 이루리라!',
            },
            {
              id: 'hanyang-step-8',
              type: 'quiz',
              quiz: {
                question:
                  '한양이 수도로 선정된 주요 이유 중 하나로 올바른 것은?',
                options: [
                  '바다와 가까워서',
                  '사방이 산으로 둘러싸인 풍수지리적 명당',
                  '이전 왕조의 궁궐을 재활용하기 위해',
                  '중국과의 거리가 가장 가까워서',
                ],
                correctIndex: 1,
                explanation:
                  '한양은 북악산·남산·낙산·인왕산이 사방을 감싸고 한강이 흐르는 풍수지리적 명당이었기에 수도로 선정되었습니다.',
              },
            },
          ],
        },
      ],
    },

    // ============================================================
    // Period 2: 세종대왕 시대 (1418~1450)
    // ============================================================
    {
      id: 'sejong-era',
      eraId: 'joseon-early',
      name: '세종대왕 시대',
      years: '1418~1450',
      description:
        '한글 창제, 과학 기술 발전 등 조선의 문화적 전성기를 이끈 세종대왕의 치세입니다.',
      events: [
        // ── Event 3: 한글 창제 (기존 유지) ──
        {
          id: 'hangul-creation',
          periodId: 'sejong-era',
          eraId: 'joseon-early',
          title: '한글 창제',
          description: '세종대왕이 백성을 위해 훈민정음을 창제한 역사적 사건을 체험합니다.',
          character: {
            id: 'king-sejong',
            name: '세종대왕',
            title: '조선 제4대 왕',
            description: '한글을 창제하고 과학, 문화, 예술 등 다방면에서 조선의 황금기를 이끈 위대한 군주입니다.',
            primaryColor: '#4B0082',
            secondaryColor: '#FFD700',
          },
          difficulty: 'medium',
          pointReward: 500,
          steps: [
            {
              id: 'sejong-hangul-step-1',
              type: 'narration',
              text: '1443년, 조선의 궁궐. 백성들의 문맹률이 높아 고민하던 세종대왕이 신하들을 불러 모았습니다.',
            },
            {
              id: 'sejong-hangul-step-2',
              type: 'dialog',
              speaker: '세종대왕',
              text: '백성들이 글을 몰라 자신의 뜻을 펴지 못하니, 내 이를 딱하게 여겨 새 글자를 만들고자 하노라.',
            },
            {
              id: 'sejong-hangul-step-3',
              type: 'dialog',
              speaker: '세종대왕',
              text: '한자는 우리말과 맞지 않아 백성들이 배우기 어렵다. 누구나 쉽게 배울 수 있는 글자가 필요하다.',
            },
            {
              id: 'sejong-hangul-step-4',
              type: 'quiz',
              quiz: {
                question: '세종대왕이 한글을 만든 가장 큰 이유는?',
                options: [
                  '중국과 다른 문자를 갖기 위해',
                  '백성들이 쉽게 읽고 쓸 수 있도록',
                  '학자들의 연구를 위해',
                  '외국과의 외교를 위해',
                ],
                correctIndex: 1,
                explanation: '세종대왕은 백성들이 한자를 몰라 자신의 뜻을 표현하지 못하는 것을 안타깝게 여겨 한글을 창제했습니다.',
              },
            },
            {
              id: 'sejong-hangul-step-5',
              type: 'narration',
              text: '세종대왕은 집현전 학자들과 함께 수년간 연구를 거듭했습니다.',
            },
            {
              id: 'sejong-hangul-step-6',
              type: 'dialog',
              speaker: '세종대왕',
              text: '하늘, 땅, 사람의 모양을 본떠 기본 글자를 만들었다. 천지인(天地人)의 원리로 모음을, 발음 기관의 모양으로 자음을 만들었노라.',
            },
            {
              id: 'sejong-hangul-step-7',
              type: 'quiz',
              quiz: {
                question: '훈민정음의 모음은 무엇을 본떠 만들었나요?',
                options: [
                  '동물의 모양',
                  '천지인(하늘, 땅, 사람)',
                  '산과 강의 모양',
                  '별자리',
                ],
                correctIndex: 1,
                explanation: 'ㅣ는 사람, ㅡ는 땅, ㆍ는 하늘을 본떠 만들었습니다.',
              },
            },
            {
              id: 'sejong-hangul-step-8',
              type: 'dialog',
              speaker: '세종대왕',
              text: '이 글자의 이름은 \'훈민정음\'이라. 백성을 가르치는 바른 소리라는 뜻이니라.',
            },
            {
              id: 'sejong-hangul-step-9',
              type: 'narration',
              text: '1446년, 드디어 훈민정음이 반포되었습니다. 그러나 많은 신하들이 반대했습니다.',
            },
            {
              id: 'sejong-hangul-step-10',
              type: 'dialog',
              speaker: '세종대왕',
              text: '최만리를 비롯한 신하들이 반대하지만, 이는 백성을 위한 것이다. 반드시 이루어내겠노라!',
            },
            {
              id: 'sejong-hangul-step-11',
              type: 'quiz',
              quiz: {
                question: '훈민정음이 반포된 해는?',
                options: ['1443년', '1444년', '1445년', '1446년'],
                correctIndex: 3,
                explanation: '훈민정음은 1443년에 창제되고 1446년에 공식 반포되었습니다.',
              },
            },
            {
              id: 'sejong-hangul-step-12',
              type: 'narration',
              text: '훈민정음은 28자로 이루어져 있었으며, 과학적이고 체계적인 문자 체계로 세계적으로도 인정받고 있습니다.',
            },
            {
              id: 'sejong-hangul-step-13',
              type: 'quiz',
              quiz: {
                question: '원래 훈민정음은 몇 자로 이루어져 있었나요?',
                options: ['24자', '26자', '28자', '30자'],
                correctIndex: 2,
                explanation: '훈민정음은 원래 28자(자음 17자, 모음 11자)로 만들어졌으며, 현재 한글은 24자를 사용합니다.',
              },
            },
            {
              id: 'sejong-hangul-step-14',
              type: 'dialog',
              speaker: '세종대왕',
              text: '지혜로운 사람은 하루 아침에 깨칠 수 있고, 어리석은 사람도 열흘이면 배울 수 있느니라.',
            },
            {
              id: 'sejong-hangul-step-15',
              type: 'narration',
              text: '한글은 오늘날 대한민국의 공식 문자로, 유네스코 세계기록유산에 등재되어 전 세계에서 가장 과학적인 문자 체계로 인정받고 있습니다.',
            },
          ],
        },
        // ── Event 4: 측우기와 과학 ──
        {
          id: 'jang-yeongshil-science',
          periodId: 'sejong-era',
          eraId: 'joseon-early',
          title: '측우기와 과학',
          description:
            '세종대왕 시대 장영실의 과학 발명품들 — 측우기, 앙부일구, 자격루 등의 이야기를 체험합니다.',
          character: {
            id: 'jang-yeongshil',
            name: '장영실',
            title: '발명가',
            description:
              '노비 출신이면서도 뛰어난 재능을 인정받아 세종대왕의 총애를 받으며 측우기, 앙부일구, 자격루 등 수많은 과학 기구를 발명한 조선 최고의 과학자입니다.',
            primaryColor: '#2E8B57',
            secondaryColor: '#87CEEB',
          },
          difficulty: 'medium',
          pointReward: 500,
          steps: [
            {
              id: 'jang-step-1',
              type: 'narration',
              text: '세종대왕은 백성의 삶을 개선하기 위해 과학 기술 발전에 큰 관심을 기울였습니다. 그중에서도 노비 출신 장영실의 재능을 알아보고 파격적으로 등용하였습니다.',
            },
            {
              id: 'jang-step-2',
              type: 'dialog',
              speaker: '장영실',
              text: '소인은 미천한 노비 출신이오나, 전하께서 재능을 알아봐 주시니 목숨을 다해 보답하겠사옵니다.',
            },
            {
              id: 'jang-step-3',
              type: 'dialog',
              speaker: '장영실',
              text: '전하, 농사는 하늘에 달려 있사옵니다. 비가 얼마나 오는지 정확히 재는 기구를 만들면 백성들의 농사에 큰 도움이 될 것이옵니다.',
            },
            {
              id: 'jang-step-4',
              type: 'narration',
              text: '1441년, 장영실은 세계 최초의 강우량 측정 기구인 측우기를 발명하였습니다. 이는 서양보다 약 200년이나 앞선 것이었습니다.',
            },
            {
              id: 'jang-step-5',
              type: 'quiz',
              quiz: {
                question: '측우기가 발명된 해는 언제인가요?',
                options: ['1420년', '1432년', '1441년', '1446년'],
                correctIndex: 2,
                explanation:
                  '측우기는 1441년에 발명되었습니다. 이는 서양의 강우량 측정기보다 약 200년이나 앞선 세계 최초의 우량 측정 기구입니다.',
              },
            },
            {
              id: 'jang-step-6',
              type: 'dialog',
              speaker: '장영실',
              text: '전하, 이 그릇에 빗물이 고이면 자 대로 그 깊이를 재어 기록하면 되옵니다. 이를 측우기라 이름 짓겠사옵니다.',
            },
            {
              id: 'jang-step-7',
              type: 'narration',
              text: '장영실의 발명은 여기서 그치지 않았습니다. 해시계인 앙부일구를 만들어 백성들이 시간을 알 수 있게 하였습니다.',
            },
            {
              id: 'jang-step-8',
              type: 'dialog',
              speaker: '장영실',
              text: '앙부일구는 솥을 엎어놓은 모양의 해시계이옵니다. 가마솥처럼 오목한 면에 그림자가 지면 시각을 알 수 있사옵니다. 글을 모르는 백성도 동물 그림으로 시각을 알 수 있도록 십이지를 새겨 넣었사옵니다.',
            },
            {
              id: 'jang-step-9',
              type: 'quiz',
              quiz: {
                question: '앙부일구는 어떤 용도의 기구인가요?',
                options: [
                  '강우량을 측정하는 기구',
                  '해시계 (시간을 측정하는 기구)',
                  '바람의 방향을 측정하는 기구',
                  '온도를 측정하는 기구',
                ],
                correctIndex: 1,
                explanation:
                  '앙부일구는 오목한 반구 모양의 해시계로, 해의 그림자로 시간을 알려주는 기구입니다.',
              },
            },
            {
              id: 'jang-step-10',
              type: 'narration',
              text: '장영실은 또한 물의 힘으로 스스로 시간을 알려주는 자동 물시계인 자격루도 만들었습니다.',
            },
            {
              id: 'jang-step-11',
              type: 'dialog',
              speaker: '장영실',
              text: '자격루는 물이 일정하게 흘러내리면 자동으로 종과 북, 징을 울려 시각을 알려주는 물시계이옵니다. 밤에도 시간을 알 수 있사옵니다.',
            },
            {
              id: 'jang-step-12',
              type: 'quiz',
              quiz: {
                question:
                  '다음 중 장영실이 발명한 것이 아닌 것은?',
                options: ['측우기', '앙부일구', '자격루', '훈민정음'],
                correctIndex: 3,
                explanation:
                  '훈민정음은 세종대왕이 직접 창제한 문자입니다. 측우기, 앙부일구, 자격루는 장영실이 발명한 과학 기구입니다.',
              },
            },
          ],
        },
      ],
    },

    // ============================================================
    // Period 3: 사림의 시대 (1469~1545)
    // ============================================================
    {
      id: 'sarim-era',
      eraId: 'joseon-early',
      name: '사림의 시대',
      years: '1469~1545',
      description:
        '사림파와 훈구파의 대립, 네 차례의 사화(士禍)가 일어나며 정치적 격변이 이어진 시기입니다.',
      events: [
        // ── Event 5: 무오사화 ──
        {
          id: 'muo-sahwa',
          periodId: 'sarim-era',
          eraId: 'joseon-early',
          title: '무오사화',
          description:
            '1498년 연산군 시대, 사림파의 거두 김종직의 제자들이 화를 입은 무오사화의 이야기를 체험합니다.',
          character: {
            id: 'kim-jongjik',
            name: '김종직',
            title: '사림파 학자',
            description:
              '조선 전기 사림파의 종조(宗祖)로 불리는 대학자입니다. 그의 제자들이 조정에 진출하여 훈구파와 대립하였고, 그가 쓴 조의제문이 화근이 되어 무오사화가 일어났습니다.',
            primaryColor: '#8B0000',
            secondaryColor: '#CD853F',
          },
          difficulty: 'medium',
          pointReward: 500,
          steps: [
            {
              id: 'muo-step-1',
              type: 'narration',
              text: '조선 초기, 조정에는 두 세력이 있었습니다. 조선 건국에 공을 세운 훈구파와, 지방에서 학문을 닦다가 중앙으로 진출한 사림파입니다.',
            },
            {
              id: 'muo-step-2',
              type: 'dialog',
              speaker: '김종직',
              text: '학문이란 벼슬을 위한 것이 아니라 올바른 도리를 행하기 위한 것이니라. 제자들아, 조정에 나아가 바른 정치를 펼쳐야 하느니라.',
            },
            {
              id: 'muo-step-3',
              type: 'narration',
              text: '김종직은 일찍이 「조의제문(弔義帝文)」이라는 글을 썼습니다. 이는 표면적으로는 초나라 의제의 죽음을 슬퍼하는 글이었지만, 실제로는 세조의 왕위 찬탈을 비판하는 내용이었습니다.',
            },
            {
              id: 'muo-step-4',
              type: 'dialog',
              speaker: '김종직',
              text: '의로운 임금을 내쫓고 왕위를 빼앗은 것은 천도에 어긋나는 일이니, 후세 사람들이 어찌 통탄하지 않겠는가.',
            },
            {
              id: 'muo-step-5',
              type: 'quiz',
              quiz: {
                question:
                  '무오사화의 직접적인 원인이 된 김종직의 글은 무엇인가요?',
                options: [
                  '격몽요결',
                  '조의제문',
                  '동국통감',
                  '소학',
                ],
                correctIndex: 1,
                explanation:
                  '조의제문(弔義帝文)은 김종직이 쓴 글로, 세조의 왕위 찬탈을 간접적으로 비판한 내용이 담겨 있어 무오사화의 직접적 원인이 되었습니다.',
              },
            },
            {
              id: 'muo-step-6',
              type: 'narration',
              text: '1498년, 연산군 4년. 훈구파의 유자광 등이 김종직의 조의제문을 문제 삼아 사림파를 대거 숙청하였습니다. 이미 세상을 떠난 김종직은 부관참시를 당했습니다.',
            },
            {
              id: 'muo-step-7',
              type: 'quiz',
              quiz: {
                question: '무오사화가 일어난 해는 언제인가요?',
                options: ['1494년', '1498년', '1504년', '1519년'],
                correctIndex: 1,
                explanation:
                  '무오사화는 1498년(연산군 4년)에 일어났습니다. 이는 조선 최초의 사화(士禍)였습니다.',
              },
            },
            {
              id: 'muo-step-8',
              type: 'narration',
              text: '무오사화로 사림파는 큰 타격을 입었지만, 이후에도 끊임없이 중앙 정계에 진출하여 훈구파에 맞섰습니다. 이는 조선 정치사의 큰 흐름이 되었습니다.',
            },
          ],
        },
        // ── Event 6: 조광조의 개혁 ──
        {
          id: 'jo-gwangjo-reform',
          periodId: 'sarim-era',
          eraId: 'joseon-early',
          title: '조광조의 개혁',
          description:
            '중종 시대 급진적 개혁을 추진하다가 기묘사화로 화를 입은 조광조의 이야기를 체험합니다.',
          character: {
            id: 'jo-gwangjo',
            name: '조광조',
            title: '개혁가',
            description:
              '중종 시대의 사림파 지도자로, 성리학적 이상 정치를 실현하고자 급진적 개혁을 추진하였으나 기묘사화로 사약을 받고 생을 마감한 비운의 개혁가입니다.',
            primaryColor: '#006400',
            secondaryColor: '#90EE90',
          },
          difficulty: 'medium',
          pointReward: 500,
          steps: [
            {
              id: 'jo-step-1',
              type: 'narration',
              text: '1515년, 중종 10년. 연산군의 폭정을 끝내고 즉위한 중종은 개혁적인 사림파 학자 조광조를 등용하였습니다.',
            },
            {
              id: 'jo-step-2',
              type: 'dialog',
              speaker: '조광조',
              text: '전하, 임금과 신하가 함께 도학 정치를 행하면 요순시대와 같은 태평성대를 이룰 수 있사옵니다. 소신이 미력하나마 전하를 보필하여 바른 정치를 세우겠나이다.',
            },
            {
              id: 'jo-step-3',
              type: 'narration',
              text: '조광조는 소격서 폐지, 현량과 실시, 향약 보급 등 과감한 개혁을 추진하였습니다. 특히 중종반정의 공신 중 부당하게 책봉된 이들의 공훈을 삭제하는 위훈삭제를 단행하였습니다.',
            },
            {
              id: 'jo-step-4',
              type: 'dialog',
              speaker: '조광조',
              text: '전하, 반정 당시 공이 없으면서 공신에 이름을 올린 자들이 있사옵니다. 이는 나라의 기강을 어지럽히는 일이오니 마땅히 바로잡아야 하옵니다.',
            },
            {
              id: 'jo-step-5',
              type: 'quiz',
              quiz: {
                question:
                  '조광조가 추진한 개혁 중 훈구파의 큰 반발을 산 것은?',
                options: [
                  '한글 보급',
                  '위훈삭제 (부당한 공신 훈작 삭제)',
                  '과거제 폐지',
                  '불교 장려',
                ],
                correctIndex: 1,
                explanation:
                  '위훈삭제는 중종반정 당시 공이 없으면서 공신에 이름을 올린 자들의 훈작을 삭제하는 것으로, 훈구파의 큰 반발을 불러일으켰습니다.',
              },
            },
            {
              id: 'jo-step-6',
              type: 'narration',
              text: '1519년, 훈구파의 남곤·심정 등은 "조광조가 붕당을 만들어 나라를 어지럽힌다"고 중종에게 고하였습니다. 결국 기묘사화가 일어나 조광조와 사림파가 대거 숙청되었습니다.',
            },
            {
              id: 'jo-step-7',
              type: 'dialog',
              speaker: '조광조',
              text: '임금을 사랑하는 마음이 아비를 사랑하는 마음과 같았거늘, 이제 이리 되었으니 하늘이 무심하구나...',
            },
            {
              id: 'jo-step-8',
              type: 'quiz',
              quiz: {
                question:
                  '기묘사화가 일어난 해는 언제인가요?',
                options: ['1498년', '1504년', '1519년', '1545년'],
                correctIndex: 2,
                explanation:
                  '기묘사화는 1519년(중종 14년)에 일어났습니다. 조광조를 비롯한 사림파 인사들이 대거 화를 입었습니다.',
              },
            },
            {
              id: 'jo-step-9',
              type: 'narration',
              text: '조광조는 사약을 받고 38세의 나이로 생을 마감했습니다. 그러나 그의 개혁 정신은 후대 사림파에게 이어져 마침내 선조 때 사림파가 정권을 장악하는 데 밑거름이 되었습니다.',
            },
          ],
        },
      ],
    },

    // ============================================================
    // Period 4: 임진왜란 (1592)
    // ============================================================
    {
      id: 'imjin-war',
      eraId: 'joseon-early',
      name: '임진왜란',
      years: '1592',
      description:
        '일본의 대규모 침략에 맞서 이순신 장군의 해전 승리와 전국 각지 의병의 활약으로 나라를 지켜낸 시기입니다.',
      events: [
        // ── Event 7: 임진왜란 발발 ──
        {
          id: 'imjin-war-outbreak',
          periodId: 'imjin-war',
          eraId: 'joseon-early',
          title: '임진왜란 발발',
          description:
            '1592년 일본의 침략과 이순신 장군의 해전 승리, 한산도 대첩의 이야기를 체험합니다.',
          character: {
            id: 'yi-sun-sin',
            name: '이순신',
            title: '삼도수군통제사',
            description:
              '임진왜란 당시 조선 수군을 이끌고 23전 23승의 신화를 이룬 불멸의 명장입니다. 한산도 대첩, 명량 해전 등으로 조선을 위기에서 구했습니다.',
            primaryColor: '#000080',
            secondaryColor: '#4169E1',
          },
          difficulty: 'hard',
          pointReward: 700,
          steps: [
            {
              id: 'imjin-step-1',
              type: 'narration',
              text: '1592년 4월 13일, 도요토미 히데요시가 이끄는 일본군 약 20만 명이 부산포에 상륙하였습니다. 200년간 평화가 이어지던 조선은 전쟁 준비가 되어 있지 않았습니다.',
            },
            {
              id: 'imjin-step-2',
              type: 'narration',
              text: '일본군은 파죽지세로 북상하여 불과 20일 만에 한양을 함락시켰습니다. 선조는 의주로 피란을 떠났습니다.',
            },
            {
              id: 'imjin-step-3',
              type: 'dialog',
              speaker: '이순신',
              text: '육지에서의 패배 소식이 연이어 들려오나 낙심할 때가 아니다. 바다를 지키면 적의 보급로를 끊을 수 있다. 수군이 나라를 구할 것이니라!',
            },
            {
              id: 'imjin-step-4',
              type: 'quiz',
              quiz: {
                question: '임진왜란이 발발한 해는 언제인가요?',
                options: ['1590년', '1591년', '1592년', '1593년'],
                correctIndex: 2,
                explanation:
                  '임진왜란은 1592년 4월 13일 일본군이 부산포에 상륙하면서 시작되었습니다.',
              },
            },
            {
              id: 'imjin-step-5',
              type: 'narration',
              text: '전라좌수사 이순신은 옥포, 사천, 당포 해전에서 연이어 승리를 거두며 일본 수군을 격파하였습니다.',
            },
            {
              id: 'imjin-step-6',
              type: 'dialog',
              speaker: '이순신',
              text: '거북선을 앞세워 적진으로 돌격하라! 거북선은 지붕에 철갑을 두르고 사방에 총통을 장착하였으니, 적이 감히 올라타지 못하리라!',
            },
            {
              id: 'imjin-step-7',
              type: 'quiz',
              quiz: {
                question: '거북선의 특징으로 올바른 것은?',
                options: [
                  '항해 속도가 가장 빨랐다',
                  '지붕을 덮어 적이 올라타지 못하게 하였다',
                  '대포가 장착되지 않았다',
                  '일본에서 수입한 배였다',
                ],
                correctIndex: 1,
                explanation:
                  '거북선은 지붕을 덮고 그 위에 칼과 송곳을 꽂아 적이 올라타지 못하게 한 것이 가장 큰 특징입니다.',
              },
            },
            {
              id: 'imjin-step-8',
              type: 'narration',
              text: '1592년 7월, 한산도 앞바다. 이순신은 결전의 때가 왔음을 직감했습니다.',
            },
            {
              id: 'imjin-step-9',
              type: 'dialog',
              speaker: '이순신',
              text: '학익진(鶴翼陣)을 펼쳐라! 학이 날개를 펼치듯 적을 포위하여 섬멸하겠노라! 판옥선들은 활 모양으로 에워싸고, 일제히 포격하라!',
            },
            {
              id: 'imjin-step-10',
              type: 'narration',
              text: '한산도 대첩에서 조선 수군은 학익진 전법으로 일본 전선 약 60여 척을 격침시키는 대승을 거두었습니다. 이 전투로 일본군의 서해 진출이 완전히 차단되었습니다.',
            },
            {
              id: 'imjin-step-11',
              type: 'quiz',
              quiz: {
                question: '한산도 대첩에서 이순신이 사용한 진법은?',
                options: [
                  '어린진 (물고기 비늘 진)',
                  '학익진 (학의 날개 진)',
                  '방원진 (원형 진)',
                  '장사진 (뱀 모양 진)',
                ],
                correctIndex: 1,
                explanation:
                  '학익진은 학이 날개를 펼친 형태로 적을 포위하는 진법입니다. 한산도 대첩에서 이순신이 사용하여 대승을 거두었습니다.',
              },
            },
            {
              id: 'imjin-step-12',
              type: 'dialog',
              speaker: '이순신',
              text: '한산도 대첩의 승리로 적의 보급로를 끊었노라. 그러나 전쟁은 아직 끝나지 않았다. 방심하지 말고 더욱 경계하라!',
            },
            {
              id: 'imjin-step-13',
              type: 'quiz',
              quiz: {
                question:
                  '임진왜란 당시 이순신 장군의 직책은 무엇이었나요?',
                options: [
                  '병조판서',
                  '도원수',
                  '삼도수군통제사',
                  '훈련도감 대장',
                ],
                correctIndex: 2,
                explanation:
                  '이순신은 임진왜란 중 삼도수군통제사에 임명되어 경상·전라·충청 삼도의 수군을 총지휘하였습니다.',
              },
            },
            {
              id: 'imjin-step-14',
              type: 'narration',
              text: '이순신의 연이은 해전 승리는 일본군의 보급로를 차단하여 전세를 역전시키는 결정적 계기가 되었습니다. 그의 23전 23승은 세계 해전사에서도 유례가 없는 기록입니다.',
            },
          ],
        },
        // ── Event 8: 의병의 활약 ──
        {
          id: 'uibyeong-activity',
          periodId: 'imjin-war',
          eraId: 'joseon-early',
          title: '의병의 활약',
          description:
            '임진왜란 당시 전국 각지에서 일어난 의병 활동과 곽재우 홍의장군의 활약상을 체험합니다.',
          character: {
            id: 'gwak-jae-u',
            name: '곽재우',
            title: '의병장',
            description:
              '임진왜란 최초의 의병장으로, 붉은 옷을 입고 전투에 나서 "홍의장군"이라 불렸습니다. 경상도 의령 지역에서 일본군을 크게 무찔러 백성들의 사기를 높였습니다.',
            primaryColor: '#8B4513',
            secondaryColor: '#DEB887',
          },
          difficulty: 'medium',
          pointReward: 500,
          steps: [
            {
              id: 'uibyeong-step-1',
              type: 'narration',
              text: '1592년, 일본군이 파죽지세로 북상하는 가운데 관군은 연이어 패배하였습니다. 그러나 전국 각지에서 백성들이 스스로 무기를 들고 일어났습니다. 이들이 바로 의병입니다.',
            },
            {
              id: 'uibyeong-step-2',
              type: 'dialog',
              speaker: '곽재우',
              text: '나라가 위태로운데 어찌 집에 앉아 있을 수 있겠는가! 비록 관군은 아니지만, 이 땅의 백성으로서 적을 무찌르겠노라!',
            },
            {
              id: 'uibyeong-step-3',
              type: 'narration',
              text: '경상도 의령의 선비 곽재우는 재산을 털어 의병을 모집하고, 붉은 옷을 입고 전투에 나섰습니다. 사람들은 그를 "홍의장군"이라 불렀습니다.',
            },
            {
              id: 'uibyeong-step-4',
              type: 'dialog',
              speaker: '곽재우',
              text: '이 붉은 옷은 나라를 지키겠다는 결의의 표시이니라! 낙동강과 남강의 지리를 이용하여 적을 기습하겠노라. 적은 이 고장의 물길을 모르니 이것이 우리의 이점이다!',
            },
            {
              id: 'uibyeong-step-5',
              type: 'quiz',
              quiz: {
                question:
                  '곽재우가 "홍의장군"이라 불린 이유는?',
                options: [
                  '성씨가 홍(洪)이어서',
                  '붉은 옷을 입고 전투에 나서서',
                  '홍의문 앞에서 승리해서',
                  '붉은 깃발을 사용해서',
                ],
                correctIndex: 1,
                explanation:
                  '곽재우는 전투에 나설 때 항상 붉은 옷(홍의, 紅衣)을 입었기 때문에 "홍의장군"이라 불렸습니다.',
              },
            },
            {
              id: 'uibyeong-step-6',
              type: 'narration',
              text: '곽재우 외에도 전국 각지에서 의병이 일어났습니다. 전라도의 고경명, 충청도의 조헌, 경상도의 정인홍 등 수많은 의병장이 활약하였습니다.',
            },
            {
              id: 'uibyeong-step-7',
              type: 'dialog',
              speaker: '곽재우',
              text: '의병은 이 고장 지리를 손바닥 보듯 아는 백성들이니라. 산과 강, 고개와 골짜기를 이용하면 적은 수로도 큰 적을 무찌를 수 있느니라!',
            },
            {
              id: 'uibyeong-step-8',
              type: 'quiz',
              quiz: {
                question:
                  '임진왜란 때 의병이 중요했던 이유로 가장 적절한 것은?',
                options: [
                  '외국에서 원군을 데려와서',
                  '최신 무기를 보유하고 있어서',
                  '지역 지리를 잘 알고 유격전으로 적의 후방을 교란했으므로',
                  '관군보다 수가 많아서',
                ],
                correctIndex: 2,
                explanation:
                  '의병은 해당 지역의 지리를 잘 알았기 때문에 유격전으로 일본군의 후방 보급로를 교란하고 점령지를 회복하는 데 큰 역할을 하였습니다.',
              },
            },
            {
              id: 'uibyeong-step-9',
              type: 'narration',
              text: '의병의 활약은 이순신의 해전 승리, 명나라 원군과 함께 임진왜란의 전세를 역전시키는 세 가지 핵심 요인 중 하나였습니다. 백성 스스로 나라를 지킨 의병 정신은 이후 한국사에서 외침에 맞서는 전통으로 이어졌습니다.',
            },
          ],
        },
      ],
    },
  ],
};
