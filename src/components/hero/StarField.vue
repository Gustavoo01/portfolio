<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const canvas = ref(null);
let ctx,
  stars = [],
  raf,
  w,
  h,
  dpr;
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function createStars() {
  const count = Math.min(420, Math.floor((w * h) / 4200));
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.1 + 0.2,
    a: Math.random() * 0.6 + 0.25,
    speed: Math.random() * 0.015 + 0.003,
    phase: Math.random() * Math.PI * 2,
  }));
}

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.value.width = w * dpr;
  canvas.value.height = h * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  createStars();
  draw(0);
}

function draw(time) {
  ctx.clearRect(0, 0, w, h);
  for (const s of stars) {
    const twinkle = reduced
      ? 1
      : 0.65 + 0.35 * Math.sin(time * s.speed * 0.06 + s.phase);
    ctx.globalAlpha = s.a * twinkle;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function loop(time) {
  if (!document.hidden) draw(time);
  raf = requestAnimationFrame(loop);
}

onMounted(() => {
  ctx = canvas.value.getContext("2d");
  resize();
  window.addEventListener("resize", resize);
  if (!reduced) raf = requestAnimationFrame(loop);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(raf);
  window.removeEventListener("resize", resize);
});
</script>

<template>
  <div class="sky" aria-hidden="true">
    <canvas ref="canvas" />
  </div>
</template>

<style scoped>
.sky {
  position: fixed;
  inset: 0;
  z-index: -1;
  background:
    radial-gradient(
      ellipse 80% 60% at 15% 10%,
      rgba(40, 60, 120, 0.35),
      transparent 60%
    ),
    radial-gradient(
      ellipse 60% 50% at 90% 30%,
      rgba(90, 80, 170, 0.18),
      transparent 60%
    ),
    linear-gradient(180deg, var(--bg-2) 0%, var(--bg) 70%);
}

canvas {
  width: 100%;
  height: 100%;
}
</style>
