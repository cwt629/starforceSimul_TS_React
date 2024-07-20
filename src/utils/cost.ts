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