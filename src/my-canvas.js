import Dot from "./class/Dot";
import { getAxisLength, getPythagoras } from "./utils";

// ============================================
// 설정 (Configuration)
// ============================================
// 배경색 (Background Color)
const BACKGROUND_COLOR = '#1a1a1a';

// 점 색상 (Dot Color)
const DOT_COLOR = '#888888';

// 점 크기 (Dot Size)
const DOT_SIZE = 2;

// 점들 사이의 간격 (Gap between dots)
const GAP = 100;

// 마우스 영향 범위 반경 (Mouse influence radius)
const INFLUENCE_RADIUS = 120;

// 마우스 영향 강도 (Mouse influence power)
const INFLUENCE_POWER = 0.8;

// 점들이 원래 위치로 돌아가는 속도 (Return speed to original position)
const RETURN_SPEED = 0.15;
// ============================================

let canvas;
let ctx;
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
const GAP_XAXIS_FOR_CENTER = windowWidth % (GAP + DOT_SIZE);
const GAP_YAXIS_FOR_CENTER = windowHeight % (GAP + DOT_SIZE);

const dots = [];
let mouseX = -1000;
let mouseY = -1000;

/**
 * Canvas 초기 설정
 */
function setupCanvas() {
  canvas = document.getElementById('my-canvas');
  canvas.setAttribute('width', String(windowWidth));
  canvas.setAttribute('height', String(windowHeight));
  ctx = canvas.getContext('2d');
}

/**
 * 점들 초기 생성
 */
function setupDots() {
  const dotsXSize = getAxisLength(windowWidth, GAP + DOT_SIZE);
  const dotsYSize = getAxisLength(windowHeight, GAP + DOT_SIZE);

  for (let i = 0; i < dotsXSize; i++) {
    for (let j = 0; j < dotsYSize; j++) {
      dots.push(new Dot(
        i * GAP + GAP_XAXIS_FOR_CENTER,
        j * GAP + GAP_YAXIS_FOR_CENTER,
        DOT_SIZE
      ));
    }
  }
}

/**
 * 점들의 위치 업데이트
 */
function updateDots() {
  dots.forEach(dot => {
    // 마우스와 점 사이의 거리 계산
    const dx = dot.originalX - mouseX;
    const dy = dot.originalY - mouseY;
    const distance = getPythagoras(Math.abs(dx), Math.abs(dy));

    // 마우스 영향 범위 내에 있는 경우
    if (distance < INFLUENCE_RADIUS) {
      // 거리에 따른 영향력 계산 (가까울수록 더 강하게)
      const force = (INFLUENCE_RADIUS - distance) / INFLUENCE_RADIUS;

      // 마우스로부터 멀어지는 방향 벡터 정규화
      const angle = Math.atan2(dy, dx);
      const pushX = Math.cos(angle) * force * INFLUENCE_POWER * GAP;
      const pushY = Math.sin(angle) * force * INFLUENCE_POWER * GAP;

      // 새 위치 계산
      const targetX = dot.originalX + pushX;
      const targetY = dot.originalY + pushY;

      // 부드럽게 이동
      dot.x += (targetX - dot.x) * RETURN_SPEED;
      dot.y += (targetY - dot.y) * RETURN_SPEED;
    } else {
      // 영향 범위 밖에서는 원래 위치로 서서히 복귀
      dot.x += (dot.originalX - dot.x) * RETURN_SPEED;
      dot.y += (dot.originalY - dot.y) * RETURN_SPEED;
    }
  });
}

/**
 * Canvas에 점들 그리기
 */
function draw() {
  // Canvas 초기화
  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.fillRect(0, 0, windowWidth, windowHeight);

  // 모든 점 그리기
  dots.forEach(dot => {
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.size, 0, 2 * Math.PI, true);
    ctx.fillStyle = DOT_COLOR;
    ctx.fill();
    ctx.closePath();
  });
}

/**
 * 애니메이션 루프
 */
function animate() {
  updateDots();
  draw();
  requestAnimationFrame(animate);
}

/**
 * 마우스 이동 이벤트 핸들러
 */
function handleMouseMove(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

// 이벤트 리스너 등록
window.addEventListener('mousemove', handleMouseMove);

// 초기화 및 시작
setupCanvas();
setupDots();
animate();