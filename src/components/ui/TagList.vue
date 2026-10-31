<script setup>
defineProps({
  tags: { type: Array, default: () => [] },
  variant: { type: String, default: "accent" }, // accent | neutral
});
</script>

<template>
  <ul class="tags" :class="`tags--${variant}`">
    <li v-for="tag in tags" :key="tag">{{ tag }}</li>
  </ul>
</template>

<style scoped>
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

li {
  padding: 0.2rem 0.65rem;
  border-radius: var(--radius-pill);
  font-size: var(--fs-xs);
  font-weight: 600;
  letter-spacing: 0.02em;
  line-height: 1.6;
}

.tags--accent li {
  background: var(--accent-soft);
  color: var(--accent);
}

.tags--neutral li {
  padding: 0.35rem 0.8rem;
  font-size: var(--fs-small);
  font-weight: 500;
  background: var(--surface-2);
  border: 1px solid var(--border);
  color: var(--text);
}
</style>
