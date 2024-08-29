import { MVPRank } from "../type/discount";
import { isPreventableStar } from "./reinforce";

interface DataForCost {
    originalCost: bigint,
    currentStar: number,
    destroyPercent: number,
    preventDestroy: boolean,
    mvpRank: MVPRank,
    pcRoomApplied: boolean,
    eventDC30: boolean
}

const PC_ROOM_DISCOUNT_RATE = 5; // PC방 할인 혜택
const BRONZE_DISCOUNT_RATE = 0; // MVP브론즈 할인 혜택
const SILVER_DISCOUNT_RATE = 3; // MVP실버 할인 혜택
const GOLD_DISCOUNT_RATE = 5; // MVP골드 할인 혜택
const DIA_DISCOUNT_RATE = 10; // MVP다이아/레드 할인 혜택

export function getUpgradeCost(level: number, star: number): bigint {
    let cost: number = 0;
    switch (star) {
        // 0~9성
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
            cost = 1000 + Math.pow(level, 3) * (star + 1) / 36;
            break;
        // 10성
        case 10:
            cost = 1000 + Math.pow(level, 3) * Math.pow(star + 1, 2.7) / 571;
            break;
        // 11성
        case 11:
            cost = 1000 + Math.pow(level, 3) * Math.pow(star + 1, 2.7) / 314;
            break;
        // 12성
        case 12:
            cost = 1000 + Math.pow(level, 3) * Math.pow(star + 1, 2.7) / 214;
            break;
        // 13성
        case 13:
            cost = 1000 + Math.pow(level, 3) * Math.pow(star + 1, 2.7) / 157;
            break;
        // 14성
        case 14:
            cost = 1000 + Math.pow(level, 3) * Math.pow(star + 1, 2.7) / 107;
            break;
        // 15-24성
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
        case 21:
        case 22:
        case 23:
        case 24:
            cost = 1000 + Math.pow(level, 3) * Math.pow(star + 1, 2.7) / 200;
            break;
        default:
            cost = 0;
            break;
    }

    // 계산된 값을 10의 자리에서 반올림한다
    cost = Math.round(cost / 10) * 10;

    return BigInt(cost);
}

export function getActualCost(data: DataForCost): bigint {
    // 파괴방지에 의해 penalty가 적용되는지 여부
    let applyPenalty: boolean = isPreventableStar(data.currentStar) && data.destroyPercent > 0 && data.preventDestroy;
    let penaltyCost: bigint = (applyPenalty) ? data.originalCost : BigInt(0);
    // mvp 혜택에 의한 할인율 먼저 구해주기
    let discountRate: number = (data.mvpRank === MVPRank.bronze) ? BRONZE_DISCOUNT_RATE :
        (data.mvpRank === MVPRank.silver) ? SILVER_DISCOUNT_RATE :
            (data.mvpRank === MVPRank.gold) ? GOLD_DISCOUNT_RATE : DIA_DISCOUNT_RATE;
    // 구해진 할인율에 pc방 혜택에 의한 할인율을 더해준다
    discountRate += (data.pcRoomApplied) ? PC_ROOM_DISCOUNT_RATE : 0;
    // 30% 할인 이벤트에 의한 할인율
    let eventDiscountRate: number = (data.eventDC30) ? 30 : 0;

    // 위 할인 혜택에 의거해 비용 계산
    let actualCost: bigint = data.originalCost * BigInt(100 - discountRate) * BigInt(100 - eventDiscountRate) / BigInt(10000) + penaltyCost;

    return actualCost;
}