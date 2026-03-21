import { Era } from '@/types/game';

export const unifiedSilla: Era = {
  id: 'unified-silla',
  name: '통일신라',
  nameEn: 'Unified Silla',
  period: '668~935',
  description: '삼국을 통일한 신라가 불교 문화를 꽃피우고 해상 무역을 장악한 시기입니다.',
  imageColor: '#DAA520',
  order: 4,
  periods: [
    {
      id: 'unified-silla-culture',
      eraId: 'unified-silla',
      name: '통일신라 문화',
      years: '668~935',
      description: '불국사와 석굴암으로 대표되는 찬란한 불교 문화와 장보고의 해상 무역이 빛난 시기입니다.',
      events: [
        {
          id: 'bulguksa-seokguram',
          periodId: 'unified-silla-culture',
          eraId: 'unified-silla',
          title: '불국사와 석굴암',
          description: '김대성이 불국사와 석굴암을 건립하여 신라 불교 문화의 절정을 이룬 이야기를 체험합니다.',
          character: {
            id: 'kim-daeseong',
            name: '김대성',
            title: '통일신라 재상',
            description: '전생의 부모를 위해 석굴암을, 현생의 부모를 위해 불국사를 지은 통일신라의 재상입니다.',
            primaryColor: '#DAA520',
            secondaryColor: '#B8860B',
          },
          difficulty: 'medium',
          pointReward: 500,
          steps: [
            {
              id: 'bulguksa-step-1',
              type: 'narration',
              text: '751년, 통일신라 경덕왕 시대. 재상 김대성이 부모에 대한 효심으로 큰 불사(佛事)를 시작하였습니다.',
            },
            {
              id: 'bulguksa-step-2',
              type: 'dialog',
              speaker: '김대성',
              text: '현생의 부모님을 위하여 불국사를 짓고, 전생의 부모님을 위하여 석불사(석굴암)를 지으리라. 이것이 자식의 도리이니라.',
            },
            {
              id: 'bulguksa-step-3',
              type: 'narration',
              text: '불국사는 부처의 나라를 이 땅에 구현한다는 뜻으로 지어졌습니다. 청운교, 백운교, 자하문을 거쳐 극락의 세계로 들어가는 구조입니다.',
            },
            {
              id: 'bulguksa-step-4',
              type: 'dialog',
              speaker: '김대성',
              text: '청운교와 백운교는 속세에서 부처의 세계로 오르는 다리이니라. 돌 하나하나에 부처님의 가르침을 담아야 하느니라.',
            },
            {
              id: 'bulguksa-step-5',
              type: 'quiz',
              quiz: {
                question: '김대성이 석굴암을 지은 이유는?',
                options: [
                  '왕의 명령을 받아서',
                  '전생의 부모를 위해서',
                  '전쟁의 승리를 기원하며',
                  '외국 사신을 접대하기 위해',
                ],
                correctIndex: 1,
                explanation: '김대성은 현생의 부모를 위해 불국사를, 전생의 부모를 위해 석굴암(석불사)을 지었다고 전해집니다.',
              },
            },
            {
              id: 'bulguksa-step-6',
              type: 'narration',
              text: '석굴암은 토함산 중턱에 인공으로 석굴을 만들고 그 안에 본존불을 모신 걸작입니다. 과학적인 설계로 습기를 자연 조절하는 놀라운 기술이 적용되었습니다.',
            },
            {
              id: 'bulguksa-step-7',
              type: 'dialog',
              speaker: '김대성',
              text: '석굴의 둥근 천장은 하늘을, 네모난 바닥은 땅을 뜻하노라. 천원지방(天圓地方)의 원리로 우주를 담았느니라.',
            },
            {
              id: 'bulguksa-step-8',
              type: 'narration',
              text: '불국사의 다보탑과 석가탑은 신라 석탑 예술의 정수입니다. 석가탑에서는 세계에서 가장 오래된 목판 인쇄물인 무구정광대다라니경이 발견되었습니다.',
            },
            {
              id: 'bulguksa-step-9',
              type: 'quiz',
              quiz: {
                question: '불국사 석가탑에서 발견된 것은?',
                options: [
                  '금관',
                  '무구정광대다라니경',
                  '삼국사기',
                  '훈민정음 해례본',
                ],
                correctIndex: 1,
                explanation: '1966년 석가탑 해체 수리 중 세계에서 가장 오래된 목판 인쇄물인 무구정광대다라니경이 발견되었습니다.',
              },
            },
            {
              id: 'bulguksa-step-10',
              type: 'quiz',
              quiz: {
                question: '불국사와 석굴암이 지어지기 시작한 해는?',
                options: ['651년', '701년', '751년', '801년'],
                correctIndex: 2,
                explanation: '불국사와 석굴암은 751년(경덕왕 10년) 김대성에 의해 건립이 시작되었습니다. 현재 유네스코 세계문화유산으로 등재되어 있습니다.',
              },
            },
          ],
        },
        {
          id: 'jangbogo-maritime',
          periodId: 'unified-silla-culture',
          eraId: 'unified-silla',
          title: '장보고와 해상왕국',
          description: '청해진을 설치하고 동아시아 해상 무역을 장악한 장보고의 이야기를 체험합니다.',
          character: {
            id: 'jangbogo',
            name: '장보고',
            title: '청해진 대사',
            description: '완도에 청해진을 설치하고 동아시아 해상 무역을 장악한 "해상왕"입니다.',
            primaryColor: '#2F4F4F',
            secondaryColor: '#5F9EA0',
          },
          difficulty: 'medium',
          pointReward: 500,
          steps: [
            {
              id: 'jangbogo-step-1',
              type: 'narration',
              text: '9세기 초, 당나라에서 무예를 닦고 군인으로 활약하던 장보고는 충격적인 현실을 목격합니다.',
            },
            {
              id: 'jangbogo-step-2',
              type: 'dialog',
              speaker: '장보고',
              text: '당나라 해적들이 우리 신라 백성을 잡아다 노비로 팔고 있도다! 이를 어찌 보고만 있을 수 있겠느냐! 반드시 이 해적들을 소탕하리라!',
            },
            {
              id: 'jangbogo-step-3',
              type: 'narration',
              text: '828년, 장보고는 신라로 돌아와 흥덕왕을 알현하고 청해진 설치를 건의하였습니다.',
            },
            {
              id: 'jangbogo-step-4',
              type: 'dialog',
              speaker: '장보고',
              text: '전하, 바다를 지키지 않으면 백성을 지킬 수 없사옵니다. 완도에 청해진을 설치하여 해적을 소탕하고 바닷길을 지키게 하여 주소서!',
            },
            {
              id: 'jangbogo-step-5',
              type: 'narration',
              text: '흥덕왕의 허락을 받은 장보고는 완도에 청해진을 설치하고 1만 명의 군사를 거느리며 해적을 소탕하였습니다.',
            },
            {
              id: 'jangbogo-step-6',
              type: 'quiz',
              quiz: {
                question: '장보고가 청해진을 설치한 곳은?',
                options: ['제주도', '거제도', '완도', '울릉도'],
                correctIndex: 2,
                explanation: '장보고는 828년 완도에 청해진을 설치하여 해적을 소탕하고 동아시아 해상 무역의 중심지로 만들었습니다.',
              },
            },
            {
              id: 'jangbogo-step-7',
              type: 'narration',
              text: '장보고는 해적 소탕에 그치지 않고, 신라-당나라-일본을 잇는 해상 무역 네트워크를 구축하였습니다. 그는 "해상왕"이라 불리게 되었습니다.',
            },
            {
              id: 'jangbogo-step-8',
              type: 'dialog',
              speaker: '장보고',
              text: '바다를 지배하는 자가 세상을 지배하느니라! 신라의 비단과 도자기를 당나라와 일본에 팔고, 그들의 물건을 신라에 들여오리라!',
            },
            {
              id: 'jangbogo-step-9',
              type: 'quiz',
              quiz: {
                question: '장보고가 청해진을 설치한 직접적인 이유는?',
                options: [
                  '무역으로 돈을 벌기 위해',
                  '해적에게 잡혀가는 신라 백성을 구하기 위해',
                  '왕의 명령을 받아서',
                  '당나라를 공격하기 위해',
                ],
                correctIndex: 1,
                explanation: '장보고는 당나라에서 신라 백성들이 해적에게 납치되어 노비로 팔리는 것을 목격하고, 이를 막기 위해 청해진을 설치했습니다.',
              },
            },
            {
              id: 'jangbogo-step-10',
              type: 'quiz',
              quiz: {
                question: '장보고가 장악한 무역 경로에 해당하지 않는 나라는?',
                options: ['신라', '당나라', '일본', '인도'],
                correctIndex: 3,
                explanation: '장보고는 신라, 당나라, 일본을 잇는 동아시아 해상 무역 네트워크를 장악하여 "해상왕"이라 불렸습니다.',
              },
            },
          ],
        },
      ],
    },
  ],
};
