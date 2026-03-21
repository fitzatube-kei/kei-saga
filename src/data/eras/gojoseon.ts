import { Era } from '@/types/game';

export const gojoseon: Era = {
  id: 'gojoseon',
  name: '고조선',
  nameEn: 'Gojoseon',
  period: 'BC 2333~BC 108',
  description: '한민족 최초의 국가 고조선, 단군왕검의 건국 신화와 범금8조로 알아보는 고대 한국의 시작입니다.',
  imageColor: '#8B4513',
  order: 1,
  periods: [
    {
      id: 'dangun-era',
      eraId: 'gojoseon',
      name: '단군 시대',
      years: 'BC 2333~BC 108',
      description: '단군왕검이 고조선을 세우고, 홍익인간의 이념 아래 나라를 다스린 시대입니다.',
      events: [
        {
          id: 'dangun-myth',
          periodId: 'dangun-era',
          eraId: 'gojoseon',
          title: '단군 건국 신화',
          description: '환웅이 하늘에서 내려오고, 곰이 사람이 되어 단군왕검이 고조선을 건국한 이야기를 체험합니다.',
          character: {
            id: 'dangun',
            name: '단군왕검',
            title: '고조선 시조',
            description: '하늘의 뜻을 받들어 고조선을 세우고, 홍익인간의 이념으로 백성을 다스린 한민족의 시조입니다.',
            primaryColor: '#8B4513',
            secondaryColor: '#DAA520',
          },
          difficulty: 'easy',
          pointReward: 300,
          steps: [
            {
              id: 'dangun-myth-step-1',
              type: 'narration',
              text: '아득히 먼 옛날, 하늘나라 환인의 아들 환웅이 인간 세상을 내려다보며 큰 뜻을 품었습니다.',
            },
            {
              id: 'dangun-myth-step-2',
              type: 'dialog',
              speaker: '환웅',
              text: '인간 세상을 널리 이롭게 하고자 하노라. 아버지 환인께서 천부인 세 개를 내려주셨으니, 이제 태백산으로 내려가리라.',
            },
            {
              id: 'dangun-myth-step-3',
              type: 'narration',
              text: '환웅은 바람의 신, 비의 신, 구름의 신과 3,000명의 무리를 이끌고 태백산 신단수 아래로 내려왔습니다. 이곳을 신시(神市)라 하였습니다.',
            },
            {
              id: 'dangun-myth-step-4',
              type: 'narration',
              text: '그때 한 곰과 호랑이가 환웅을 찾아와 사람이 되게 해달라고 빌었습니다.',
            },
            {
              id: 'dangun-myth-step-5',
              type: 'dialog',
              speaker: '환웅',
              text: '이 쑥과 마늘을 먹고 백일 동안 햇빛을 보지 않으면 사람이 되리라. 인내하는 자에게 복이 있을 것이니라.',
            },
            {
              id: 'dangun-myth-step-6',
              type: 'narration',
              text: '곰은 삼칠일(21일) 만에 여자의 몸이 되었으나, 호랑이는 참지 못하고 뛰쳐나가 사람이 되지 못했습니다.',
            },
            {
              id: 'dangun-myth-step-7',
              type: 'quiz',
              quiz: {
                question: '곰과 호랑이 중 사람이 된 것은?',
                options: ['호랑이', '곰', '둘 다 사람이 되었다', '둘 다 사람이 되지 못했다'],
                correctIndex: 1,
                explanation: '곰은 인내심을 가지고 쑥과 마늘만 먹으며 21일을 견뎌 여자(웅녀)가 되었지만, 호랑이는 참지 못하고 뛰쳐나갔습니다.',
              },
            },
            {
              id: 'dangun-myth-step-8',
              type: 'narration',
              text: '사람이 된 웅녀는 환웅과 혼인하여 아들을 낳았으니, 그가 바로 단군왕검입니다.',
            },
            {
              id: 'dangun-myth-step-9',
              type: 'dialog',
              speaker: '단군왕검',
              text: '나는 홍익인간의 뜻을 받들어 이 땅에 나라를 세우리라. 널리 인간 세상을 이롭게 하는 것이 나의 사명이니라.',
            },
            {
              id: 'dangun-myth-step-10',
              type: 'quiz',
              quiz: {
                question: '단군왕검이 고조선을 건국한 해는?',
                options: ['BC 1000년', 'BC 2333년', 'BC 3000년', 'BC 1500년'],
                correctIndex: 1,
                explanation: '단군왕검은 기원전 2333년에 고조선을 건국하였다고 전해집니다. 이 해를 기준으로 단군기원(단기)을 사용합니다.',
              },
            },
            {
              id: 'dangun-myth-step-11',
              type: 'quiz',
              quiz: {
                question: '"고조선"이라는 이름의 의미는?',
                options: [
                  '오래된 아침의 나라',
                  '높은 산의 나라',
                  '큰 강의 나라',
                  '밝은 태양의 나라',
                ],
                correctIndex: 0,
                explanation: '고조선은 "옛 조선"이라는 뜻으로, 조선(朝鮮)은 "아침이 선명한 나라", 즉 "아침의 나라"라는 의미입니다. 후대의 조선과 구분하기 위해 "고(古)"를 붙였습니다.',
              },
            },
          ],
        },
        {
          id: 'gojoseon-8laws',
          periodId: 'dangun-era',
          eraId: 'gojoseon',
          title: '고조선의 8조법',
          description: '고조선의 법률인 범금8조를 통해 당시 사회의 모습과 질서를 알아봅니다.',
          character: {
            id: 'dangun',
            name: '단군왕검',
            title: '고조선 시조',
            description: '하늘의 뜻을 받들어 고조선을 세우고, 홍익인간의 이념으로 백성을 다스린 한민족의 시조입니다.',
            primaryColor: '#8B4513',
            secondaryColor: '#DAA520',
          },
          difficulty: 'easy',
          pointReward: 300,
          steps: [
            {
              id: 'gojoseon-law-step-1',
              type: 'narration',
              text: '고조선은 나라를 다스리기 위해 범금8조(犯禁八條)라는 법률을 만들었습니다. 오늘날에는 그중 3개 조항만이 전해지고 있습니다.',
            },
            {
              id: 'gojoseon-law-step-2',
              type: 'dialog',
              speaker: '단군왕검',
              text: '나라를 다스리려면 백성이 지켜야 할 법도가 있어야 하느니라. 이에 여덟 가지 금하는 법을 정하노라.',
            },
            {
              id: 'gojoseon-law-step-3',
              type: 'narration',
              text: '첫째, 사람을 죽인 자는 즉시 사형에 처한다. 이는 생명을 소중히 여기는 고조선의 정신을 보여줍니다.',
            },
            {
              id: 'gojoseon-law-step-4',
              type: 'narration',
              text: '둘째, 남에게 상해를 입힌 자는 곡식으로 배상한다. 이를 통해 고조선이 농경 사회였음을 알 수 있습니다.',
            },
            {
              id: 'gojoseon-law-step-5',
              type: 'narration',
              text: '셋째, 남의 물건을 훔친 자는 노비로 삼는다. 다만 스스로 속죄하려는 자는 50만 전을 내야 한다. 이는 사유 재산이 존재했음을 보여줍니다.',
            },
            {
              id: 'gojoseon-law-step-6',
              type: 'dialog',
              speaker: '단군왕검',
              text: '이 법은 백성의 생명과 재산을 지키기 위함이니라. 서로를 해치지 않고, 남의 것을 탐하지 않는 것이 나라의 근본이니라.',
            },
            {
              id: 'gojoseon-law-step-7',
              type: 'quiz',
              quiz: {
                question: '범금8조에서 알 수 있는 고조선 사회의 모습이 아닌 것은?',
                options: [
                  '생명을 중시하였다',
                  '농경 사회였다',
                  '사유 재산을 인정하였다',
                  '신분 차별이 없었다',
                ],
                correctIndex: 3,
                explanation: '범금8조에는 노비 제도에 대한 내용이 있어 신분의 차이가 존재했음을 알 수 있습니다. 도둑질을 한 자를 노비로 삼는다는 조항이 이를 증명합니다.',
              },
            },
            {
              id: 'gojoseon-law-step-8',
              type: 'quiz',
              quiz: {
                question: '범금8조 중 현재까지 전해지는 조항은 몇 개인가요?',
                options: ['1개', '3개', '5개', '8개'],
                correctIndex: 1,
                explanation: '범금8조는 원래 8개 조항이었으나, 오늘날에는 사람을 죽인 자, 상해를 입힌 자, 도둑질한 자에 대한 3개 조항만 전해지고 있습니다.',
              },
            },
          ],
        },
      ],
    },
  ],
};
