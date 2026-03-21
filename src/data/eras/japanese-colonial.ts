import { Era } from '@/types/game';

export const japaneseColonial: Era = {
  id: 'japanese-colonial',
  name: '일제강점기',
  nameEn: 'Japanese Colonial',
  period: '1910~1945',
  description: '일본 제국주의의 지배 아래에서 독립을 위해 싸운 시기입니다.',
  imageColor: '#2F4F4F',
  order: 11,
  periods: [
    {
      id: 'independence-movement',
      eraId: 'japanese-colonial',
      name: '독립운동',
      years: '1919~1945',
      description: '3.1 운동을 시작으로 다양한 독립운동이 전개된 시기입니다.',
      events: [
        {
          id: 'march-1st-movement',
          periodId: 'independence-movement',
          eraId: 'japanese-colonial',
          title: '3.1 운동',
          description: '1919년 3.1 만세운동과 유관순의 활약, 대한민국 임시정부 수립을 체험합니다.',
          character: {
            id: 'yu-gwan-sun',
            name: '유관순',
            title: '독립운동가',
            description: '아우내 장터에서 만세 시위를 주도한 독립운동가입니다. 일제의 고문에도 굴하지 않은 불굴의 의지를 보여주었습니다.',
            primaryColor: '#2F4F4F',
            secondaryColor: '#FFFFFF',
          },
          difficulty: 'medium',
          pointReward: 500,
          steps: [
            {
              id: 'march1-step-1',
              type: 'narration',
              text: '1919년, 제1차 세계대전이 끝나고 윌슨 대통령의 민족자결주의가 전 세계에 퍼졌습니다. 조선에서도 독립의 희망이 타올랐습니다.',
            },
            {
              id: 'march1-step-2',
              type: 'narration',
              text: '1919년 3월 1일, 민족 대표 33인이 독립선언서를 낭독하고, 서울 탑골공원을 시작으로 전국에서 만세 시위가 벌어졌습니다.',
            },
            {
              id: 'march1-step-3',
              type: 'dialog',
              speaker: '유관순',
              text: '대한 독립 만세! 우리는 일본의 식민지가 아닙니다. 조선은 독립국이며, 우리 민족은 자주 민족입니다!',
            },
            {
              id: 'march1-step-4',
              type: 'quiz',
              quiz: {
                question: '3.1 운동이 일어난 해는?',
                options: ['1910년', '1919년', '1926년', '1945년'],
                correctIndex: 1,
                explanation: '3.1 운동은 1919년 3월 1일에 시작되어 전국으로 확산된 대규모 독립운동입니다.',
              },
            },
            {
              id: 'march1-step-5',
              type: 'narration',
              text: '이화학당 학생이었던 유관순은 학교가 휴교되자 고향 천안으로 내려가 만세 시위를 준비하였습니다.',
            },
            {
              id: 'march1-step-6',
              type: 'dialog',
              speaker: '유관순',
              text: '서울에서만 만세를 부를 수는 없습니다. 고향에서도 독립의 함성을 올려야 합니다. 아우내 장터에서 만세 시위를 벌이겠습니다!',
            },
            {
              id: 'march1-step-7',
              type: 'narration',
              text: '4월 1일, 유관순은 아우내 장터에서 수천 명의 군중과 함께 만세 시위를 주도하였습니다. 일본 헌병의 발포로 부모님이 순국하였습니다.',
            },
            {
              id: 'march1-step-8',
              type: 'dialog',
              speaker: '유관순',
              text: '부모님을 잃었지만, 독립을 향한 의지는 꺾을 수 없습니다. 감옥에서도 만세를 부르겠습니다!',
            },
            {
              id: 'march1-step-9',
              type: 'quiz',
              quiz: {
                question: '유관순이 만세 시위를 주도한 곳은?',
                options: [
                  '탑골공원',
                  '아우내 장터',
                  '서대문 형무소',
                  '광화문',
                ],
                correctIndex: 1,
                explanation: '유관순은 천안의 아우내 장터에서 만세 시위를 주도하였습니다.',
              },
            },
            {
              id: 'march1-step-10',
              type: 'narration',
              text: '유관순은 체포되어 서대문 형무소에 수감되었으나, 옥중에서도 만세를 외치며 저항하다가 1920년 순국하였습니다.',
            },
            {
              id: 'march1-step-11',
              type: 'narration',
              text: '3.1 운동의 결과, 1919년 4월 상해에 대한민국 임시정부가 수립되었습니다. 이는 대한민국의 법통이 되었습니다.',
            },
            {
              id: 'march1-step-12',
              type: 'quiz',
              quiz: {
                question: '3.1 운동의 결과로 수립된 것은?',
                options: [
                  '독립협회',
                  '신민회',
                  '대한민국 임시정부',
                  '광복군',
                ],
                correctIndex: 2,
                explanation: '3.1 운동을 계기로 1919년 상해에 대한민국 임시정부가 수립되어 독립운동의 구심점이 되었습니다.',
              },
            },
          ],
        },
        {
          id: 'yun-bong-gil',
          periodId: 'independence-movement',
          eraId: 'japanese-colonial',
          title: '윤봉길 의거',
          description: '상해 홍구공원에서 윤봉길의 의거와 대한민국 임시정부의 활동을 체험합니다.',
          character: {
            id: 'yun-bong-gil',
            name: '윤봉길',
            title: '독립운동가',
            description: '상해 홍구공원에서 일본 군부 요인들에게 폭탄을 투척한 독립운동가입니다. 대한민국 임시정부의 활동에 큰 전환점을 만들었습니다.',
            primaryColor: '#333333',
            secondaryColor: '#696969',
          },
          difficulty: 'medium',
          pointReward: 500,
          steps: [
            {
              id: 'yun-bg-step-1',
              type: 'narration',
              text: '1930년대, 대한민국 임시정부는 독립운동의 돌파구를 찾기 위해 고심하고 있었습니다. 김구는 한인애국단을 조직하여 의열 투쟁을 계획했습니다.',
            },
            {
              id: 'yun-bg-step-2',
              type: 'dialog',
              speaker: '윤봉길',
              text: '김구 선생님, 저에게 기회를 주십시오. 나라를 되찾기 위해 이 한 몸 바치겠습니다.',
            },
            {
              id: 'yun-bg-step-3',
              type: 'narration',
              text: '1932년 4월 29일, 일본은 상해 홍구공원에서 일왕 생일 기념행사와 상해사변 전승 축하 기념식을 열었습니다.',
            },
            {
              id: 'yun-bg-step-4',
              type: 'dialog',
              speaker: '윤봉길',
              text: '사나이가 집을 떠나 뜻을 이루기 전에는 돌아오지 않겠습니다. 이 시계를 김구 선생님께 드리겠습니다. 제 시계는 6원짜리이고, 선생님 것은 2원짜리이니 바꿉시다.',
            },
            {
              id: 'yun-bg-step-5',
              type: 'quiz',
              quiz: {
                question: '윤봉길 의거가 일어난 장소는?',
                options: [
                  '도쿄 궁성',
                  '상해 홍구공원',
                  '남경 총독부',
                  '북경 천안문',
                ],
                correctIndex: 1,
                explanation: '윤봉길 의거는 1932년 4월 29일 상해 홍구공원에서 일어났습니다.',
              },
            },
            {
              id: 'yun-bg-step-6',
              type: 'narration',
              text: '윤봉길은 도시락 모양의 폭탄을 단상에 투척하여 일본군 대장 시라카와 등 여러 군부 요인을 처단하였습니다.',
            },
            {
              id: 'yun-bg-step-7',
              type: 'dialog',
              speaker: '윤봉길',
              text: '대한 독립 만세!',
            },
            {
              id: 'yun-bg-step-8',
              type: 'narration',
              text: '윤봉길은 현장에서 체포되어 그해 12월 일본 가나자와에서 순국하였습니다. 향년 25세였습니다.',
            },
            {
              id: 'yun-bg-step-9',
              type: 'quiz',
              quiz: {
                question: '윤봉길이 소속된 독립운동 단체는?',
                options: ['의열단', '한인애국단', '광복군', '독립협회'],
                correctIndex: 1,
                explanation: '윤봉길은 김구가 조직한 한인애국단 소속으로 의거를 실행하였습니다.',
              },
            },
            {
              id: 'yun-bg-step-10',
              type: 'quiz',
              quiz: {
                question: '윤봉길 의거의 역사적 의의는?',
                options: [
                  '일본이 즉시 항복했다',
                  '중국의 지원을 이끌어내 임시정부 활동이 활성화되었다',
                  '미국이 독립을 승인했다',
                  '일본 내에서 반전 운동이 일어났다',
                ],
                correctIndex: 1,
                explanation: '윤봉길 의거는 중국 국민당 장제스의 감탄을 이끌어내 중국의 대한민국 임시정부 지원이 본격화되는 계기가 되었습니다.',
              },
            },
          ],
        },
      ],
    },
  ],
};
