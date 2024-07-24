import { Result } from "../type/result";

// 성공 확률과 파괴 확률을 토대로 강화 결과를 반환하는 함수
export function getReinforceResult(success: number, destroy: number = 0): Result {
    // 0~100 사이의 난수
    let rand = Math.random() * 100;
    // 성공
    if (rand <= success) return Result.success;
    // 파괴
    if (rand <= success + destroy) return Result.destroy;
    // 실패
    return Result.failure;
}

// 특정 레벨의 최대 강화 수치를 반환하는 함수
export function getMaximumStarByLevel(level: number): number {
    if (level < 95) return 5;
    if (level < 108) return 8;
    if (level < 118) return 10;
    if (level < 128) return 15;
    if (level < 138) return 20;
    return 25;
}

// 특정 레벨에 파괴방지가 가능한지 여부를 반환하는 함수
export function isPreventableStar(star: number): boolean {
    // 15~16성만 파괴방지 가능
    return (star >= 15 && star < 17);
}