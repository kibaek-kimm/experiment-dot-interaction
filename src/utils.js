/**
 * 창 크기를 기준으로 축의 길이 계산
 */
export function getAxisLength(windowSize, divider) {
  return Math.floor(windowSize / divider);
}

/**
 * 피타고라스 정리로 두 점 사이의 거리 계산
 */
export function getPythagoras(a, b) {
  return Math.sqrt(a ** 2 + b ** 2);
}