import { Era } from '@/types/game';

export const modern: Era = {
  id: 'modern',
  name: '현대',
  nameEn: 'Modern',
  period: '1945~현재',
  description: '광복 이후 대한민국의 수립과 한국전쟁, 그리고 현대 대한민국의 성장을 다루는 시기입니다.',
  imageColor: '#1E90FF',
  order: 12,
  periods: [
    {
      id: 'republic-founding',
      eraId: 'modern',
      name: '대한민국 수립',
      years: '1945~1953',
      description: '광복과 대한민국 정부 수립, 한국전쟁을 겪은 격동의 시기입니다.',
      events: [
        {
          id: 'liberation-republic',
          periodId: 'republic-founding',
          eraId: 'modern',
          title: '광복과 대한민국 수립',
          description: '8.15 광복부터 남북 분단, 대한민국 정부 수립까지의 역사를 체험합니다.',
          character: {
            id: 'kim-gu',
            name: '김구',
            title: '대한민국 임시정부 주석',
            description: '대한민국 임시정부의 마지막 주석으로, 평생을 독립운동에 바친 민족 지도자입니다. 통일 정부 수립을 위해 노력하였습니다.',
            primaryColor: '#1E90FF',
            secondaryColor: '#4169E1',
          },
          difficulty: 'medium',
          pointReward: 500,
          steps: [
            {
              id: 'liberation-step-1',
              type: 'narration',
              text: '1945년 8월 15일, 일본이 연합군에 무조건 항복하면서 35년간의 일제강점기가 끝나고 광복을 맞이하였습니다.',
            },
            {
              id: 'liberation-step-2',
              type: 'dialog',
              speaker: '김구',
              text: '드디어 광복입니다! 그러나 기쁨도 잠시, 38도선을 경계로 남쪽에는 미군이, 북쪽에는 소련군이 진주하고 있습니다.',
            },
            {
              id: 'liberation-step-3',
              type: 'narration',
              text: '미국과 소련의 냉전 대립 속에서 한반도는 38도선을 기준으로 남과 북으로 나뉘게 되었습니다.',
            },
            {
              id: 'liberation-step-4',
              type: 'dialog',
              speaker: '김구',
              text: '나는 통일 정부를 세워야 한다고 생각합니다. 남과 북이 따로 정부를 세우면 분단이 영구화됩니다.',
            },
            {
              id: 'liberation-step-5',
              type: 'quiz',
              quiz: {
                question: '광복 후 한반도를 남북으로 나눈 기준선은?',
                options: ['36도선', '37도선', '38도선', '39도선'],
                correctIndex: 2,
                explanation: '광복 후 한반도는 38도선을 기준으로 남쪽은 미군, 북쪽은 소련군이 진주하여 분단되었습니다.',
              },
            },
            {
              id: 'liberation-step-6',
              type: 'narration',
              text: '1948년 5월 10일, 유엔 감시 하에 남한 단독 총선거가 실시되었습니다. 김구는 단독 정부 수립에 반대하여 선거에 불참하였습니다.',
            },
            {
              id: 'liberation-step-7',
              type: 'dialog',
              speaker: '김구',
              text: '나는 통일된 조국을 건설하려다가 38도선을 베고 쓰러질지언정, 일신의 구차한 안일을 위해 단독 정부를 세우는 데는 협력하지 않겠습니다.',
            },
            {
              id: 'liberation-step-8',
              type: 'quiz',
              quiz: {
                question: '대한민국 정부가 수립된 해는?',
                options: ['1945년', '1946년', '1947년', '1948년'],
                correctIndex: 3,
                explanation: '1948년 8월 15일, 이승만을 초대 대통령으로 하는 대한민국 정부가 공식 수립되었습니다.',
              },
            },
            {
              id: 'liberation-step-9',
              type: 'narration',
              text: '1948년 8월 15일, 이승만을 초대 대통령으로 하는 대한민국 정부가 수립되었습니다. 북한에서도 9월 9일 조선민주주의인민공화국이 수립되어 분단이 고착화되었습니다.',
            },
            {
              id: 'liberation-step-10',
              type: 'quiz',
              quiz: {
                question: '김구가 남한 단독 선거에 반대한 이유는?',
                options: [
                  '이승만과의 개인적 갈등',
                  '통일 정부 수립을 원했기 때문',
                  '미군정에 대한 반감',
                  '선거 제도에 대한 불신',
                ],
                correctIndex: 1,
                explanation: '김구는 남한만의 단독 정부가 수립되면 분단이 영구화될 것을 우려하여 통일 정부 수립을 주장하였습니다.',
              },
            },
          ],
        },
        {
          id: 'korean-war',
          periodId: 'republic-founding',
          eraId: 'modern',
          title: '6.25 전쟁',
          description: '한국전쟁의 발발부터 인천상륙작전, 휴전까지의 역사를 체험합니다.',
          character: {
            id: 'syngman-rhee',
            name: '이승만',
            title: '대한민국 초대 대통령',
            description: '대한민국의 초대 대통령으로, 한국전쟁이라는 국난을 겪으며 나라를 이끈 지도자입니다.',
            primaryColor: '#000080',
            secondaryColor: '#0000CD',
          },
          difficulty: 'hard',
          pointReward: 700,
          steps: [
            {
              id: 'war-step-1',
              type: 'narration',
              text: '1950년 6월 25일 새벽, 북한군이 38도선 전역에서 남침을 개시하였습니다. 한국전쟁이 시작된 것입니다.',
            },
            {
              id: 'war-step-2',
              type: 'narration',
              text: '북한군의 기습 남침으로 3일 만에 서울이 함락되었습니다. 국군은 낙동강 방어선까지 후퇴하며 최후의 방어전을 펼쳤습니다.',
            },
            {
              id: 'war-step-3',
              type: 'dialog',
              speaker: '이승만',
              text: '국군과 유엔군이 힘을 합쳐 반드시 나라를 지켜낼 것입니다. 자유 대한민국은 결코 무너지지 않습니다.',
            },
            {
              id: 'war-step-4',
              type: 'quiz',
              quiz: {
                question: '6.25 전쟁이 발발한 해는?',
                options: ['1948년', '1949년', '1950년', '1951년'],
                correctIndex: 2,
                explanation: '한국전쟁(6.25 전쟁)은 1950년 6월 25일 북한의 남침으로 시작되었습니다.',
              },
            },
            {
              id: 'war-step-5',
              type: 'narration',
              text: '유엔 안전보장이사회는 북한의 침략을 규탄하고, 유엔군 파병을 결정하였습니다. 맥아더 장군이 유엔군 총사령관에 임명되었습니다.',
            },
            {
              id: 'war-step-6',
              type: 'narration',
              text: '1950년 9월 15일, 맥아더 장군이 지휘하는 유엔군은 인천상륙작전을 감행하여 전세를 뒤집었습니다.',
            },
            {
              id: 'war-step-7',
              type: 'quiz',
              quiz: {
                question: '전쟁의 전세를 역전시킨 인천상륙작전이 실행된 날짜는?',
                options: [
                  '1950년 7월 15일',
                  '1950년 8월 15일',
                  '1950년 9월 15일',
                  '1950년 10월 15일',
                ],
                correctIndex: 2,
                explanation: '인천상륙작전은 1950년 9월 15일에 실행되어 전쟁의 전세를 역전시킨 결정적 작전이었습니다.',
              },
            },
            {
              id: 'war-step-8',
              type: 'narration',
              text: '인천상륙작전 성공 후 서울을 수복하고 북진하였으나, 중공군의 개입으로 다시 후퇴하는 1.4 후퇴를 겪었습니다.',
            },
            {
              id: 'war-step-9',
              type: 'narration',
              text: '이후 전선은 38도선 부근에서 교착 상태에 빠졌고, 2년간의 휴전 협상 끝에 1953년 7월 27일 휴전 협정이 체결되었습니다.',
            },
            {
              id: 'war-step-10',
              type: 'dialog',
              speaker: '이승만',
              text: '휴전에 동의할 수 없지만, 국민의 더 큰 희생을 막기 위해 받아들입니다. 통일은 반드시 이루어야 할 우리 민족의 과제입니다.',
            },
            {
              id: 'war-step-11',
              type: 'quiz',
              quiz: {
                question: '한국전쟁 휴전 협정이 체결된 해는?',
                options: ['1951년', '1952년', '1953년', '1954년'],
                correctIndex: 2,
                explanation: '한국전쟁의 휴전 협정은 1953년 7월 27일 판문점에서 체결되었습니다.',
              },
            },
            {
              id: 'war-step-12',
              type: 'narration',
              text: '3년간의 전쟁으로 수백만 명의 사상자와 이산가족이 발생하였습니다. 한반도는 오늘날까지 휴전 상태로 남아 있습니다.',
            },
          ],
        },
      ],
    },
  ],
};
