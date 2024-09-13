import { MVPRank } from "./discount"
import { Result } from "./result"

export interface InitialData {
    level: number,
    start: number,
    goal: number,
    restoreCost: number
}

export interface LogData {
    result: Result,
    from: number,
    to: number,
    fallen: boolean // 등급 하락 여부(찬스타임 구현 위함)
};

export interface CurrentState {
    ready: boolean,
    level: number,
    start: number,
    goal: number,
    maxStar: number,
    restoreCost: bigint,
    totalSpent: bigint,
    totalSuccess: number,
    totalFailure: number,
    totalDestroy: number,
    currentStar: number,
    nextStar: number, // 현재 강화에서 성공하면 이동되는 단계
    originalCost: bigint, // 기존 비용
    cost: bigint, // 할인, 파괴방지 추가비용 등이 적용된 비용
    successPercent: number,
    failurePercent: number,
    destroyPercent: number,
    noStarcatch: boolean,
    preventDestroy: boolean,
    log: LogData[],
    achieved: boolean,
    ableToFall: boolean,
    autoSaved: boolean, // 자동 저장이 되었는지 여부
    mvpRank: MVPRank, // 옵션에서 체크된 MVP 등급
    pcRoomApplied: boolean, // PC방 혜택 적용 여부
    bonusUnderTen: boolean, // 10성 이하 강화시 1+1 이벤트 적용 여부
    eventDC30: boolean, // 강화 비용 30% 할인 이벤트 적용 여부
    successOnFives: boolean, // 5, 10, 15성 강화 성공 100% 이벤트 적용 여부
    autoIntervalID: number | null
};