import { Era } from '@/types/game';

export const goryeoLate: Era = {
  id: 'goryeo-late',
  name: '고려 (후기)',
  nameEn: 'Goryeo Late',
  period: '1170~1392',
  description: '무신정권의 수립과 몽골 침입을 겪으며 격동의 시기를 보낸 고려 후기입니다.',
  imageColor: '#006400',
  order: 7,
  periods: [
    {
      id: 'mushin-mongol',
      eraId: 'goryeo-late',
      name: '무신정권과 몽골',
      years: '1170~1270',
      description: '무신들의 반란으로 무신정권이 수립되고, 몽골의 침입에 맞서 항쟁한 시기입니다.',
      events: [
        {
          id: 'mushin-revolt',
          periodId: 'mushin-mongol',
          eraId: 'goryeo-late',
          title: '무신의 난',
          description: '무신들이 문신의 차별에 반발하여 정변을 일으킨 사건을 체험합니다.',
          character: {
            id: 'jeong-jung-bu',
            name: '정중부',
            title: '무신정권 수장',
            description: '고려의 무신으로, 문신들의 차별에 분노하여 무신정변을 일으키고 무신정권을 수립한 인물입니다.',
            primaryColor: '#556B2F',
            secondaryColor: '#8FBC8F',
          },
          difficulty: 'medium',
          pointReward: 500,
          steps: [
            {
              id: 'mushin-step-1',
              type: 'narration',
              text: '고려 중기, 문신들은 높은 관직을 독점하며 무신들을 무시하고 천대하였습니다.',
            },
            {
              id: 'mushin-step-2',
              type: 'dialog',
              speaker: '정중부',
              text: '문신 놈들이 무신을 개돼지 취급하는구나! 김부식의 아들 김돈중은 내 수염에 불까지 붙이지 않았는가!',
            },
            {
              id: 'mushin-step-3',
              type: 'narration',
              text: '1170년, 의종이 보현원으로 행차할 때 정중부, 이의방, 이고 등 무신들이 정변을 일으켰습니다.',
            },
            {
              id: 'mushin-step-4',
              type: 'dialog',
              speaker: '정중부',
              text: '더 이상 참을 수 없다! 문신들의 횡포를 끝내겠노라. 오늘부터 무신이 나라를 이끌겠다!',
            },
            {
              id: 'mushin-step-5',
              type: 'quiz',
              quiz: {
                question: '무신정변이 일어난 해는?',
                options: ['1135년', '1170년', '1196년', '1231년'],
                correctIndex: 1,
                explanation: '무신정변은 1170년에 정중부, 이의방, 이고 등이 일으켰습니다.',
              },
            },
            {
              id: 'mushin-step-6',
              type: 'narration',
              text: '무신들은 문신들을 대거 살해하고 의종을 폐위시켰습니다. 이후 무신들이 권력을 장악하는 무신정권 시대가 열렸습니다.',
            },
            {
              id: 'mushin-step-7',
              type: 'dialog',
              speaker: '정중부',
              text: '왕은 허수아비에 불과하다. 이제 무신이 실질적으로 나라를 다스리겠노라.',
            },
            {
              id: 'mushin-step-8',
              type: 'quiz',
              quiz: {
                question: '무신정변의 주요 원인은?',
                options: [
                  '외적의 침입',
                  '문신의 무신 차별과 천대',
                  '왕위 계승 분쟁',
                  '농민 반란',
                ],
                correctIndex: 1,
                explanation: '무신정변은 고려 사회에서 문신들이 무신들을 지속적으로 차별하고 천대한 것이 직접적인 원인이었습니다.',
              },
            },
          ],
        },
        {
          id: 'mongol-invasion',
          periodId: 'mushin-mongol',
          eraId: 'goryeo-late',
          title: '몽골 침입과 팔만대장경',
          description: '몽골의 침입에 맞서 강화도로 천도하고 팔만대장경을 조판한 사건을 체험합니다.',
          character: {
            id: 'kim-yun-hu',
            name: '김윤후',
            title: '고려 승려 장군',
            description: '처인성 전투에서 몽골 장수 살리타이를 사살하여 몽골군의 침입을 저지한 승려 출신 장군입니다.',
            primaryColor: '#006400',
            secondaryColor: '#32CD32',
          },
          difficulty: 'hard',
          pointReward: 700,
          steps: [
            {
              id: 'mongol-step-1',
              type: 'narration',
              text: '1231년, 몽골이 대군을 이끌고 고려를 침입하였습니다. 이후 약 30년간 여섯 차례에 걸친 침입이 이어졌습니다.',
            },
            {
              id: 'mongol-step-2',
              type: 'narration',
              text: '무신정권의 최우는 몽골에 항복하는 대신 수도를 강화도로 옮겨 장기 항전을 결정하였습니다.',
            },
            {
              id: 'mongol-step-3',
              type: 'dialog',
              speaker: '김윤후',
              text: '몽골 기마병은 강하나 바다를 건너지는 못하오. 강화도에서 항전하면 버틸 수 있소이다.',
            },
            {
              id: 'mongol-step-4',
              type: 'quiz',
              quiz: {
                question: '몽골 침입 때 고려가 수도를 옮긴 곳은?',
                options: ['서경', '강화도', '남경', '탐라'],
                correctIndex: 1,
                explanation: '고려는 몽골의 침입에 맞서 수도를 강화도로 옮겨 장기 항전하였습니다.',
              },
            },
            {
              id: 'mongol-step-5',
              type: 'narration',
              text: '1232년, 처인성에서 김윤후가 이끄는 고려군이 몽골 장수 살리타이를 사살하는 큰 전과를 올렸습니다.',
            },
            {
              id: 'mongol-step-6',
              type: 'dialog',
              speaker: '김윤후',
              text: '승려의 몸이지만 나라가 위태로우니 칼을 들지 않을 수 없소이다. 처인성을 지키겠소!',
            },
            {
              id: 'mongol-step-7',
              type: 'dialog',
              speaker: '김윤후',
              text: '화살 한 발로 적장 살리타이를 쓰러뜨렸소이다! 백성과 승려, 노비까지 힘을 합치면 이길 수 있소!',
            },
            {
              id: 'mongol-step-8',
              type: 'quiz',
              quiz: {
                question: '처인성 전투에서 김윤후가 사살한 몽골 장수는?',
                options: ['칭기즈 칸', '쿠빌라이', '살리타이', '오고타이'],
                correctIndex: 2,
                explanation: '김윤후는 처인성 전투에서 몽골의 장수 살리타이를 사살하여 몽골군의 진격을 저지하였습니다.',
              },
            },
            {
              id: 'mongol-step-9',
              type: 'narration',
              text: '고려는 부처의 힘으로 몽골을 물리치고자 16년에 걸쳐 팔만대장경을 조판하였습니다.',
            },
            {
              id: 'mongol-step-10',
              type: 'dialog',
              speaker: '김윤후',
              text: '팔만여 장의 목판에 불경을 새기는 대업이오. 부처님의 가호로 나라를 지키고자 하는 백성들의 염원이 담겨 있소이다.',
            },
            {
              id: 'mongol-step-11',
              type: 'narration',
              text: '팔만대장경은 8만여 장의 목판에 새겨진 불교 경전으로, 오늘날 해인사에 보관되어 유네스코 세계기록유산으로 등재되어 있습니다.',
            },
            {
              id: 'mongol-step-12',
              type: 'quiz',
              quiz: {
                question: '팔만대장경이 현재 보관되어 있는 곳은?',
                options: ['불국사', '해인사', '통도사', '송광사'],
                correctIndex: 1,
                explanation: '팔만대장경은 경남 합천의 해인사 장경판전에 보관되어 있으며, 유네스코 세계기록유산입니다.',
              },
            },
          ],
        },
      ],
    },
  ],
};
