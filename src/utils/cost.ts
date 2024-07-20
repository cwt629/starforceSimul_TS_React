export function getUpgradeCost(level: number, star: number): bigint {
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
            return BigInt(1000 + Math.pow(level, 3) * (star + 1) / 36);
        // 10성
        case 10:
            return BigInt(1000 + Math.pow(level, 3) * Math.pow(star + 1, 2.7) / 571);
        // 11성
        case 11:
            return BigInt(1000 + Math.pow(level, 3) * Math.pow(star + 1, 2.7) / 314);
        // 12성
        case 12:
            return BigInt(1000 + Math.pow(level, 3) * Math.pow(star + 1, 2.7) / 214);
        // 13성
        case 13:
            return BigInt(1000 + Math.pow(level, 3) * Math.pow(star + 1, 2.7) / 157);
        // 14성
        case 14:
            return BigInt(1000 + Math.pow(level, 3) * Math.pow(star + 1, 2.7) / 107);
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
            return BigInt(1000 + Math.pow(level, 3) * Math.pow(star + 1, 2.7) / 200);

        default:
            return BigInt(0);
    }
}