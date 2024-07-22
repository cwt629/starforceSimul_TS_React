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
    cost: bigint,
    successPercent: number,
    failurePercent: number,
    destroyPercent: number,
    noStarcatch: boolean,
    preventDestroy: boolean,
    log: LogData[],
    achieved: boolean,
    ableToFall: boolean
};