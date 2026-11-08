<script setup>
import { computed } from "vue";
import { useI18n } from "@/i18n";
import { work, education } from "@/data/experience";
import SectionTitle from "@/components/ui/SectionTitle.vue";
import TimelineRow from "./TimelineRow.vue";
import BaseIcon from "@/components/ui/BaseIcon.vue";

const { t, l } = useI18n();

const now = new Date();
const thisYear = now.getFullYear();
const yearStart = new Date(thisYear, 0, 1);
const yearEnd = new Date(thisYear + 1, 0, 1);
const today = thisYear + (now - yearStart) / (yearEnd - yearStart);

const all = [...work, ...education];
const firstYear = Math.min(...all.map((i) => i.start));
const years = Array.from(
  { length: thisYear - firstYear + 1 },
  (_, i) => firstYear + i,
);
const span = thisYear + 1 - firstYear;
const pct = (year) => ((year - firstYear) / span) * 100;
const todayPct = pct(today);

const bar = (item) => {
  const from = pct(item.start);
  const to =
    item.end == null ? todayPct : Math.min(pct(item.end + 1), todayPct);
  return { left: `${from}%`, width: `${Math.max(to - from, 1.5)}%` };
};

const period = (item) =>
  `${item.start} — ${item.end ?? t("experience.present")}`;

const duration = (item) => {
  const yrs = (item.end ?? thisYear) - item.start;
  if (yrs < 1) return "";
  return t(yrs === 1 ? "experience.year" : "experience.years", { n: yrs });
};

const chrono = (a, b) =>
  a.start - b.start || (a.end ?? Infinity) - (b.end ?? Infinity);

const groups = computed(() => [
  {
    key: "work",
    icon: "briefcase",
    rows: [...work].sort(chrono).map((job) => ({
      id: job.id,
      kind: "work",
      role: l(job.role),
      org: job.org,
      period: period(job),
      duration: duration(job),
      ongoing: job.end == null,
      bar: bar(job),
      summary: l(job.summary) || "",
      highlights: l(job.highlights) || [],
      tags: job.tags || [],
    })),
  },
  {
    key: "education",
    icon: "graduation",
    rows: [...education].sort(chrono).map((c) => ({
      id: c.id,
      kind: "education",
      role: l(c.role),
      org: c.org,
      level: c.level ? t(`experience.levels.${c.level}`) : "",
      period: period(c),
      ongoing: c.end == null,
      bar: bar(c),
    })),
  },
]);
</script>

<template>
  <section id="experience" class="section" aria-labelledby="experience-title">
    <div class="container">
      <SectionTitle
        id="experience-title"
        :title="t('experience.title')"
        :subtitle="t('experience.subtitle', { since: firstYear })"
      />

      <div
        class="chart"
        :style="{ '--n': years.length, '--today': `${todayPct}%` }"
      >
        <section
          v-for="g in groups"
          :key="g.key"
          class="panel"
          :class="g.key"
          :aria-labelledby="`timeline-${g.key}`"
        >
          <header class="panel-head">
            <h3 :id="`timeline-${g.key}`">
              <span class="icon"><BaseIcon :name="g.icon" :size="18" /></span>
              {{ t(`experience.${g.key}`) }}
            </h3>

            <div class="years" aria-hidden="true">
              <span v-for="y in years" :key="y" class="year">
                <span class="full">{{ y }}</span>
                <span class="short">’{{ String(y).slice(2) }}</span>
              </span>
              <span class="today">{{ t("experience.today") }}</span>
            </div>
          </header>

          <ol>
            <TimelineRow
              v-for="row in g.rows"
              :key="row.id"
              v-bind="row"
              :status="
                g.key === 'work'
                  ? t('experience.current')
                  : t('experience.status.ongoing')
              "
            />
          </ol>
        </section>
      </div>
    </div>
  </section>
</template>

<style scoped>
.chart {
  --label: 19rem;
  --gap: 2rem;
  display: grid;
  gap: 1.5rem;
}

.panel {
  padding: clamp(1.25rem, 3vw, 2rem);
  border-radius: var(--radius);
  background: rgba(18, 22, 38, 0.6);
  border: 1px solid var(--border);
}

.panel.work {
  border-color: rgba(52, 211, 153, 0.28);
}

.panel-head {
  display: grid;
  grid-template-columns: var(--label) minmax(0, 1fr);
  gap: var(--gap);
  align-items: end;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border);
}

h3 {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: var(--fs-h3);
}

.icon {
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: var(--radius-sm);
  background: var(--accent-soft);
  color: var(--accent);
}

.education .icon {
  background: var(--surface-2);
  color: var(--muted);
}

.years {
  position: relative;
  display: grid;
  grid-template-columns: repeat(var(--n), 1fr);
}

.year {
  padding-left: 0.4rem;
  color: var(--subtle);
  font-size: var(--fs-small);
  font-variant-numeric: tabular-nums;
}

.short {
  display: none;
}

.today {
  position: absolute;
  left: var(--today);
  bottom: calc(100% + 0.2rem);
  transform: translateX(-50%);
  color: var(--accent);
  font-size: var(--fs-xs);
  font-weight: 600;
  white-space: nowrap;
}

ol {
  list-style: none;
  padding: 0;
}

ol :deep(.row:last-child) {
  border-bottom: 0;
}

@media (max-width: 760px) {
  .panel-head {
    grid-template-columns: 1fr;
    gap: 1.75rem;
  }

  .full {
    display: none;
  }

  .short {
    display: inline;
  }
}
</style>
