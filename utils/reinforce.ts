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