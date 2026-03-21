export const APP_NAME = "KEI-SAGA";

export const POINTS_PER_QUIZ = 100;
export const POINTS_PER_COMPLETE = 500;

export interface Level {
  name: string;
  minPoints: number;
  maxPoints: number;
}

export const LEVELS: Level[] = [
  { name: "백성", minPoints: 0, maxPoints: 499 },
  { name: "양반", minPoints: 500, maxPoints: 1499 },
  { name: "선비", minPoints: 1500, maxPoints: 3499 },
  { name: "관리", minPoints: 3500, maxPoints: 6499 },
  { name: "장군", minPoints: 6500, maxPoints: 10999 },
  { name: "재상", minPoints: 11000, maxPoints: 17499 },
  { name: "왕", minPoints: 17500, maxPoints: Infinity },
];

export function getLevelByPoints(points: number): Level {
  return (
    LEVELS.find((level) => points >= level.minPoints && points <= level.maxPoints) ??
    LEVELS[0]
  );
}
