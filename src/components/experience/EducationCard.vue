<script setup>
defineProps({
  role: { type: String, required: true },
  org: { type: String, required: true },
  level: { type: String, default: "" },
  period: { type: String, default: "" },
  status: { type: String, default: "" },
  ongoing: Boolean,
});
</script>

<template>
  <article class="edu" :class="{ ongoing }">
    <div class="top">
      <span class="level">{{ level }}</span>
      <span v-if="ongoing" class="status">{{ status }}</span>
    </div>
    <h4>{{ role }}</h4>
    <p class="meta">
      <span class="org">{{ org }}</span>
      <span class="period">{{ period }}</span>
    </p>
  </article>
</template>

<style scoped>
.edu {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1.25rem 1.4rem;
  border-radius: var(--radius-sm);
  background: var(--surface);
  border: 1px solid var(--border);
}

.edu.ongoing {
  border-color: rgba(52, 211, 153, 0.35);
}

.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.65rem;
}

.level {
  color: var(--subtle);
  font-size: var(--fs-small);
}

.status {
  padding: 0.1rem 0.6rem;
  border-radius: var(--radius-pill);
  background: var(--accent-soft);
  color: var(--accent);
  font-size: var(--fs-xs);
  font-weight: 600;
  white-space: nowrap;
}

h4 {
  font-size: 1.1rem;
  line-height: 1.3;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.25rem 1rem;
  margin-top: auto;
  padding-top: 0.9rem;
  font-size: var(--fs-small);
}

.org {
  color: var(--accent);
  font-weight: 500;
}

.period {
  color: var(--subtle);
  font-variant-numeric: tabular-nums;
}
</style>
