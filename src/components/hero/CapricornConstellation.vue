<script setup>
const stars = {
  alpha: { x: 98, y: 8, r: 1.7, name: "Algedi" },
  beta: { x: 95, y: 17.2, r: 2, name: "Dabih" },
  psi: { x: 70, y: 59.2, r: 1.4 },
  omega: { x: 64, y: 65.6, r: 1.4 },
  zeta: { x: 29, y: 47.6, r: 1.4 },
  epsilon: { x: 19, y: 36, r: 1.1 },
  delta: { x: 9, y: 22.4, r: 2.2, name: "Deneb Algedi" },
  gamma: { x: 16, y: 24.8, r: 1.6, name: "Nashira" },
  iota: { x: 34, y: 25.2, r: 1.1 },
  theta: { x: 50, y: 26.8, r: 1.4 },
};

const paths = [
  ["beta", "theta", "iota", "gamma", "delta"],
  ["delta", "epsilon", "zeta", "omega", "psi", "beta"],
  ["alpha", "beta"],
];

const toPoints = (ids) =>
  ids.map((id) => `${stars[id].x},${stars[id].y}`).join(" ");
</script>

<template>
  <svg class="capricorn" viewBox="0 0 110 72" fill="none" aria-hidden="true">
    <polyline
      v-for="(p, i) in paths"
      :key="i"
      :points="toPoints(p)"
      stroke="rgba(255,255,255,.38)"
      stroke-width=".5"
      stroke-linejoin="round"
    />
    <g fill="#fff">
      <circle
        v-for="(s, id, i) in stars"
        :key="id"
        :cx="s.x"
        :cy="s.y"
        :r="s.r"
        class="star"
        :style="{ animationDelay: `${i * 0.7}s` }"
      />
    </g>
  </svg>
</template>

<style scoped>
.capricorn {
  overflow: visible;
}

.star {
  filter: drop-shadow(0 0 1.5px rgba(255, 255, 255, 0.9));
  animation: twinkle 4.5s ease-in-out infinite;
}

@keyframes twinkle {
  50% {
    opacity: 0.55;
  }
}
</style>
