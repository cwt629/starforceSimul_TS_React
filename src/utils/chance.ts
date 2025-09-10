export function isChance(fallen: [boolean, boolean]): boolean {
  // 제일 마지막 두번 모두 fallen이 true인 경우만 찬스 타임 성립
  return fallen[0] && fallen[1];
}
