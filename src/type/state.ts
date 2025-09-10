import { AutoInterval } from "./auto";
import { MVPRank } from "./discount";
import { Result } from "./result";

export interface InitialData {
  level: number;
  start: number;
  goal: number;
  restoreCost: number;
}

export interface CurrentState {
  ready: boolean;
  level: number;
  start: number;
  goal: number;
  lastResult?: Result;
  maxStar: number;
  restoreCost: bigint;
  totalSpent: bigint;
  totalSuccess: number;
  totalFailure: number;
  totalDestroy: number;
  currentStar: number;
  nextStar: number; // 현재 강화에서 성공하면 이동되는 단계
  originalCost: bigint; // 기존 비용
  cost: bigint; // 할인, 파괴방지 추가비용 등이 적용된 비용
  successPercent: number;
  failurePercent: number;
  destroyPercent: number;
  noStarcatch: boolean;
  preventDestroy: boolean;
  fallen: [boolean, boolean];
  achieved: boolean;
  ableToFall: boolean;
  autoSaved: boolean; // 자동 저장이 되었는지 여부
  mvpRank: MVPRank; // 옵션에서 체크된 MVP 등급
  pcRoomApplied: boolean; // PC방 혜택 적용 여부
  bonusUnderTen: boolean; // 10성 이하 강화시 1+1 이벤트 적용 여부
  eventDC30: boolean; // 강화 비용 30% 할인 이벤트 적용 여부
  successOnFives: boolean; // 5, 10, 15성 강화 성공 100% 이벤트 적용 여부
  reduceDestroy: boolean; // 스타포스 21성 이하에서 강화 시도 시 파괴 확률 30% 감소
  autoIntervalID: AutoInterval; // 자동 강화 루프(setInterval) ID
}
