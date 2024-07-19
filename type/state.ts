import { Result } from "./result"

export interface LogData {
    result: Result,
    from: number,
    to: number,
    fallen: boolean[] // 등급 하락 여부를 최근 2회치만 저장하여, 찬스타임 구현
};

export interface CurrentState {
    level: number,
    start: number,
    goal: number,
    restoreCost: bigint,
    totalSpent: bigint,
    success: number,
    failure: number,
    destroy: number,
    currentStar: number,
    nextCost: bigint,
    nextSuccess: number,
    nextFailure: number,
    nextDestroy: number,
    noStarcatch: boolean,
    preventDestroy: boolean,
    log: LogData[],
    isChance: boolean,
    achieved: boolean
};