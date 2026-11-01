<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const CONFIG = {
  density: 4200,
  maxStars: 520,
  scrollParallax: 0.12,
  mouseParallax: 14,
  drift: 0.012,
  shootingEvery: [3500, 9000],
};

const LAYERS = [
  { depth: 0.25, size: [0.25, 0.7], alpha: [0.2, 0.5], share: 0.55 },
  { depth: 0.55, size: [0.5, 1.0], alpha: [0.35, 0.7], share: 0.3 },
  { depth: 1.0, size: [0.9, 1.6], alpha: [0.55, 0.95], share: 0.15 },
];

const canvas = ref(null);
let ctx, raf, w, h, dpr;
let stars = [];
let shooting = [];
let nextShot = 0;
let lastTime = 0;
const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const rand = (min, max) => min + Math.random() * (max - min);

function createStars() {
  const total = Math.min(CONFIG.maxStars, Math.floor((w * h) / CONFIG.density));
  stars = [];
  for (const layer of LAYERS) {
    const count = Math.round(total * layer.share);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: rand(...layer.size),
        a: rand(...layer.alpha),
        depth: layer.depth,
        twinkle: rand(0.0006, 0.0025),
        phase: Math.random() * Math.PI * 2,
        color:
          Math.random() < 0.06
            ? "255,226,170"
            : Math.random() < 0.1
              ? "190,205,255"
              : "255,255,255",
      });
    }
  }
}

function spawnShootingStar() {
  const angle = rand(Math.PI * 0.62, Math.PI * 0.75);
  const speed = rand(0.9, 1.4);
  shooting.push({
    x: rand(w * 0.3, w * 1.05),
    y: rand(-20, h * 0.35),
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    life: 0,
    ttl: rand(700, 1100),
    length: rand(90, 170),
  });
}

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.value.width = w * dpr;
  canvas.value.height = h * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  createStars();
  draw(performance.now(), 0);
}

const wrap = (v, max) => ((v % max) + max) % max;

function draw(time, dt) {
  ctx.clearRect(0, 0, w, h);

  mouse.x += (mouse.tx - mouse.x) * 0.04;
  mouse.y += (mouse.ty - mouse.y) * 0.04;
  const scrollY = window.scrollY;

  for (const s of stars) {
    if (!reduced) s.x -= CONFIG.drift * s.depth * dt;

    const px = wrap(s.x + mouse.x * CONFIG.mouseParallax * s.depth, w);
    const py = wrap(
      s.y -
        scrollY * CONFIG.scrollParallax * s.depth +
        mouse.y * CONFIG.mouseParallax * s.depth,
      h,
    );
    const twinkle = reduced
      ? 1
      : 0.7 + 0.3 * Math.sin(time * s.twinkle + s.phase);

    ctx.globalAlpha = s.a * twinkle;
    ctx.fillStyle = `rgb(${s.color})`;
    ctx.beginPath();
    ctx.arc(px, py, s.r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  for (const sh of shooting) {
    sh.life += dt;
    sh.x += sh.vx * dt;
    sh.y += sh.vy * dt;
    const progress = sh.life / sh.ttl;
    const fade = progress < 0.15 ? progress / 0.15 : 1 - progress;
    const tailX = sh.x - (sh.vx / Math.hypot(sh.vx, sh.vy)) * sh.length;
    const tailY = sh.y - (sh.vy / Math.hypot(sh.vx, sh.vy)) * sh.length;

    const grad = ctx.createLinearGradient(sh.x, sh.y, tailX, tailY);
    grad.addColorStop(0, `rgba(255,255,255,${0.9 * fade})`);
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1.4;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(sh.x, sh.y);
    ctx.lineTo(tailX, tailY);
    ctx.stroke();
  }
  shooting = shooting.filter((sh) => sh.life < sh.ttl);

  if (!reduced && time > nextShot) {
    if (nextShot) spawnShootingStar();
    nextShot = time + rand(...CONFIG.shootingEvery);
  }
}

function loop(time) {
  const dt = lastTime ? Math.min(time - lastTime, 50) : 16;
  lastTime = time;
  if (!document.hidden) draw(time, dt);
  raf = requestAnimationFrame(loop);
}

function onPointerMove(e) {
  mouse.tx = (e.clientX / w) * 2 - 1;
  mouse.ty = (e.clientY / h) * 2 - 1;
}

function onVisibility() {
  lastTime = 0;
}

onMounted(() => {
  ctx = canvas.value.getContext("2d");
  resize();
  window.addEventListener("resize", resize);
  if (reduced) {
    window.addEventListener("scroll", () => draw(0, 0), { passive: true });
    return;
  }
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  document.addEventListener("visibilitychange", onVisibility);
  raf = requestAnimationFrame(loop);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(raf);
  window.removeEventListener("resize", resize);
  window.removeEventListener("pointermove", onPointerMove);
  document.removeEventListener("visibilitychange", onVisibility);
});
</script>

<template>
  <div class="sky" aria-hidden="true">
    <div class="nebula nebula--a" />
    <div class="nebula nebula--b" />
    <canvas ref="canvas" />
  </div>
</template>

<style scoped>
.sky {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  background: linear-gradient(180deg, var(--bg-2) 0%, var(--bg) 70%);
}

.nebula {
  position: absolute;
  width: 70vmax;
  height: 70vmax;
  border-radius: 50%;
  will-change: transform;
}

.nebula--a {
  top: -25vmax;
  left: -20vmax;
  background: radial-gradient(
    circle,
    rgba(45, 70, 150, 0.32) 0%,
    rgba(45, 70, 150, 0.12) 40%,
    transparent 70%
  );
  animation: drift-a 48s ease-in-out infinite alternate;
}

.nebula--b {
  right: -25vmax;
  bottom: -30vmax;
  background: radial-gradient(
    circle,
    rgba(100, 85, 190, 0.24) 0%,
    rgba(52, 211, 153, 0.05) 45%,
    transparent 70%
  );
  animation: drift-b 62s ease-in-out infinite alternate;
}

@keyframes drift-a {
  to {
    transform: translate(18vmax, 12vmax) scale(1.15);
  }
}

@keyframes drift-b {
  to {
    transform: translate(-16vmax, -14vmax) scale(1.1);
  }
}

canvas {
  position: relative;
  width: 100%;
  height: 100%;
}

@media (prefers-reduced-motion: reduce) {
  .nebula {
    animation: none;
  }
}
</style>
