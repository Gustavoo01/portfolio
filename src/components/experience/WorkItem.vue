<script setup>
import TagList from "@/components/ui/TagList.vue";

defineProps({
  role: { type: String, required: true },
  org: { type: String, required: true },
  period: { type: String, required: true },
  duration: { type: String, default: "" },
  current: Boolean,
  currentLabel: { type: String, default: "" },
  summary: { type: String, default: "" },
  highlights: { type: Array, default: () => [] },
  tags: { type: Array, default: () => [] },
});
</script>

<template>
  <article class="work">
    <div class="when">
      <p class="period">{{ period }}</p>
      <p v-if="duration" class="duration">{{ duration }}</p>
      <p v-if="current" class="current">
        <span class="dot" aria-hidden="true" />{{ currentLabel }}
      </p>
    </div>

    <div class="what">
      <h4>{{ role }}</h4>
      <p class="org">{{ org }}</p>
      <p v-if="summary" class="summary">{{ summary }}</p>
      <ul v-if="highlights.length" class="highlights">
        <li v-for="(h, i) in highlights" :key="i">{{ h }}</li>
      </ul>
      <TagList v-if="tags.length" :tags="tags" class="tags" />
    </div>
  </article>
</template>

<style scoped>
.work {
  display: grid;
  grid-template-columns: 12rem minmax(0, 1fr);
  gap: 1.5rem clamp(1.5rem, 4vw, 3rem);
  padding: clamp(1.5rem, 3vw, 2.25rem);
  border-radius: var(--radius);
  background: var(--surface);
  border: 1px solid var(--border);
}

.when {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.period {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.duration {
  color: var(--subtle);
  font-size: var(--fs-small);
}

.current {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  color: var(--accent);
  font-size: var(--fs-small);
  font-weight: 500;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 4px var(--accent-soft);
}

h4 {
  font-size: var(--fs-h3);
}

.org {
  margin-top: 0.2rem;
  color: var(--accent);
  font-weight: 500;
}

.summary {
  margin-top: 0.9rem;
  color: var(--muted);
  max-width: 62ch;
}

.highlights {
  display: grid;
  gap: 0.6rem;
  margin-top: 1.1rem;
  max-width: 68ch;
}

.highlights li {
  position: relative;
  padding-left: 1.25rem;
  color: var(--text);
  font-size: 0.975rem;
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
  margin-top: 1.4rem;
}

@media (max-width: 700px) {
  .work {
    grid-template-columns: 1fr;
  }

  .when {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.25rem 0.9rem;
  }

  .current {
    margin-top: 0;
  }
}
</style>
