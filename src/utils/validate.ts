import { getMaximumStarByLevel } from "./reinforce";

const MAXIMUM_LEVEL: number = 300; // 현기준 최대 레벨
const MAXIMUM_STAR: number = 25; // 현기준 최대 강화 단계

/**
 * level 입력이 올바른 입력인지 판단하여 반환하는 함수
 * @param level 입력한 레벨
 * @returns 올바른 입력인지 여부
 */
export function isValidLevel(level: string): boolean {
    let levelNumber: number = Number(level);

    if (isNaN(levelNumber))
        return false;

    if (levelNumber < 0 || levelNumber > MAXIMUM_LEVEL)
        return false;

    return true;
}

/**
 * 시작 강화 단계 입력이 올바른 입력인지 판단하여 반환하는 함수
 * @param level 입력한 장비 레벨
 * @param start 입력한 시작 단계
 * @returns 올바른 입력인지 여부
 */
export function isValidStart(level: string, start: string): boolean {
    if (start === "") return false; // 입력이 없는 경우

    if (!isValidLevel(level) || level === "") return false;
    let levelNumber: number = Number(level);
    let startNumber: number = Number(start);

    if (isNaN(startNumber))
        return false;

    if (startNumber < 0 || startNumber > getMaximumStarByLevel(levelNumber) - 1)
        return false;

    return true;
}

/**
 * 목표 강화 단계 입력이 올바른 입력인지 판단하여 반환하는 함수
 * @param level 입력한 장비 레벨
 * @param start 입력한 시작 단계
 * @param goal 입력한 목표 단계
 * @returns 올바른 입력인지 여부
 */
export function isValidGoal(level: string, start: string, goal: string): boolean {
    if (goal === "") return false; // 입력이 없는 경우

    if (!isValidLevel(level) || level === "") return false;
    let levelNumber: number = Number(level);
    let startNumber: number = !isNaN(Number(start)) ? Number(start) : 0; // 시작이 올바르지 않다면 0으로 임의 지정
    let goalNumber: number = Number(goal);

    if (isNaN(goalNumber))
        return false;

    if (goalNumber <= startNumber)
        return false;

    if (goalNumber < 0 || goalNumber > getMaximumStarByLevel(levelNumber))
        return false;

    return true;
}

/**
 * 장비 복구 비용 입력이 올바른 입력인지 판단하여 반환하는 함수
 * @param cost 입력한 장비 복구 비용
 * @returns 올바른 입력인지 여부
 */
export function isValidRestoreCost(cost: string): boolean {
    if (cost === "") return false;
    let costNumber: number = Number(cost);
    if (isNaN(costNumber))
        return false;

    if (costNumber < 0)
        return false;

    return true;
}