<script setup>
import TagList from "@/components/ui/TagList.vue";

defineProps({
  kind: { type: String, default: "education" }, // work | education
  role: { type: String, required: true },
  org: { type: String, required: true },
  level: { type: String, default: "" },
  period: { type: String, default: "" },
  duration: { type: String, default: "" },
  ongoing: Boolean,
  status: { type: String, default: "" },
  bar: { type: Object, required: true },
  summary: { type: String, default: "" },
  highlights: { type: Array, default: () => [] },
  tags: { type: Array, default: () => [] },
});
</script>

<template>
  <li class="row" :class="[kind, { ongoing }]">
    <div class="info">
      <h4>{{ role }}</h4>
      <p class="meta">
        <span class="org">{{ org }}</span>
        <template v-if="level"> · {{ level }}</template>
      </p>
      <p class="period">
        {{ period }}
        <template v-if="duration"> · {{ duration }}</template>
        <span v-if="ongoing" class="status">{{ status }}</span>
      </p>
    </div>

    <div class="track">
      <span class="bar" :style="bar" aria-hidden="true" />

      <div v-if="summary || highlights.length" class="details">
        <p v-if="summary" class="summary">{{ summary }}</p>
        <ul v-if="highlights.length" class="highlights">
          <li v-for="(h, i) in highlights" :key="i">{{ h }}</li>
        </ul>
        <TagList v-if="tags.length" :tags="tags" class="tags" />
      </div>
    </div>
  </li>
</template>

<style scoped>
.row {
  display: grid;
  grid-template-columns: var(--label) minmax(0, 1fr);
  gap: var(--gap);
  border-bottom: 1px solid var(--border);
}

.info {
  padding-block: 1rem;
}

h4 {
  font-size: 1.05rem;
  line-height: 1.3;
}

.meta {
  margin-top: 0.15rem;
  color: var(--muted);
  font-size: var(--fs-small);
}

.org {
  color: var(--accent);
  font-weight: 500;
}

.period {
  margin-top: 0.15rem;
  color: var(--subtle);
  font-size: var(--fs-small);
  font-variant-numeric: tabular-nums;
}

.status {
  margin-left: 0.5rem;
  color: var(--accent);
  font-weight: 500;
}

.track {
  position: relative;
  padding-top: 3rem;
  padding-bottom: 1rem;
  background-image: linear-gradient(
    to right,
    var(--border) 1px,
    transparent 1px
  );
  background-size: calc(100% / var(--n)) 100%;
}

.track::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: var(--today);
  border-left: 1px dashed rgba(52, 211, 153, 0.45);
}

.bar {
  position: absolute;
  top: 1.35rem;
  height: 10px;
  border-radius: var(--radius-pill);
  background: var(--border-strong);
}

.work .bar {
  background: linear-gradient(90deg, rgba(52, 211, 153, 0.55), var(--accent));
}

.education.ongoing .bar {
  background: linear-gradient(
    90deg,
    rgba(52, 211, 153, 0.18),
    rgba(52, 211, 153, 0.7)
  );
}

.ongoing .bar::after {
  content: "";
  position: absolute;
  right: -5px;
  top: 50%;
  width: 12px;
  height: 12px;
  margin-top: -6px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 4px var(--accent-soft);
  animation: pulse 2.4s var(--ease) infinite;
}

@keyframes pulse {
  50% {
    box-shadow: 0 0 0 8px rgba(52, 211, 153, 0);
  }
}

.details {
  position: relative;
  z-index: 1;
  padding: 1.25rem 1.4rem;
  border-radius: var(--radius-sm);
  background: rgba(18, 22, 38, 0.92);
  border: 1px solid var(--border);
}

.summary {
  color: var(--muted);
}

.highlights {
  display: grid;
  gap: 0.55rem;
  margin-top: 0.9rem;
}

.highlights li {
  position: relative;
  padding-left: 1.2rem;
  font-size: 0.95rem;
}

.highlights li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.62em;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: 1.5px solid var(--accent);
}

.tags {
  margin-top: 1.1rem;
}

@media (max-width: 760px) {
  .row {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .info {
    padding-bottom: 0.25rem;
  }

  .track {
    padding-top: 2rem;
  }

  .bar {
    top: 0.7rem;
  }
}
</style>
