<script setup>
import { useI18n } from "@/i18n";
import { work, education } from "@/data/experience";
import SectionTitle from "@/components/ui/SectionTitle.vue";
import TimelineItem from "./TimelineItem.vue";

const { t, l } = useI18n();

const educationSorted = [...education].sort(
  (a, b) => (a.status === "ongoing" ? 0 : 1) - (b.status === "ongoing" ? 0 : 1),
);

const columns = [
  { key: "work", items: work },
  { key: "education", items: educationSorted },
];
</script>

<template>
  <section id="experience" class="section" aria-labelledby="experience-title">
    <div class="container">
      <SectionTitle
        id="experience-title"
        :title="t('experience.title')"
        :subtitle="t('experience.subtitle')"
      />

      <div class="columns">
        <div v-for="col in columns" :key="col.key" class="column">
          <h3>
            {{ t(`experience.${col.key}`) }}
            <span class="count">{{ col.items.length }}</span>
          </h3>
          <ol class="timeline">
            <TimelineItem
              v-for="item in col.items"
              :key="item.id"
              :role="l(item.role)"
              :org="item.org"
              :period="l(item.period)"
              :description="l(item.description) || ''"
              :level="item.level ? t(`experience.levels.${item.level}`) : ''"
              :status="item.status ? t(`experience.status.${item.status}`) : ''"
              :ongoing="item.status === 'ongoing'"
            />
          </ol>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.columns {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(2rem, 5vw, 4rem);
  align-items: start;
}

.column {
  padding: clamp(1.25rem, 3vw, 2rem);
  border-radius: var(--radius);
  background: rgba(18, 22, 38, 0.55);
  border: 1px solid var(--border);
}

h3 {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
  font-size: var(--fs-h3);
}

.count {
  display: inline-grid;
  place-items: center;
  min-width: 1.6rem;
  height: 1.6rem;
  padding-inline: 0.4rem;
  border-radius: var(--radius-pill);
  background: var(--surface-2);
  color: var(--muted);
  font-size: var(--fs-xs);
  font-family: var(--font-body);
}

.timeline {
  list-style: none;
  padding: 0;
}

@media (max-width: 860px) {
  .columns {
    grid-template-columns: 1fr;
  }
}
</style>
