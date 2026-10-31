<script setup>
defineProps({ label: { type: String, required: true } });
</script>

<template>
  <p class="badge">
    <span class="dot" aria-hidden="true" />
    {{ label }}
  </p>
</template>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.4rem 0.9rem;
  border-radius: var(--radius-pill);
  border: 1px solid rgba(52, 211, 153, 0.35);
  background: rgba(52, 211, 153, 0.08);
  color: var(--text);
  font-size: var(--fs-small);
  font-weight: 500;
}

.dot {
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
}

.dot::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: var(--accent);
  animation: ping 2s var(--ease) infinite;
}

@keyframes ping {
  80%,
  100% {
    transform: scale(2.6);
    opacity: 0;
  }
}
</style>
