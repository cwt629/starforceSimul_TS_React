import { LogData } from "../type/state";

export function isChance(log: LogData[]): boolean {
    if (log.length < 2) return false;

    // 제일 마지막 두번 모두 fallen이 true인 경우만 찬스 타임 성립
    return (log[log.length - 1].fallen && log[log.length - 2].fallen);
}