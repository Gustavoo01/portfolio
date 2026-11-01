<script setup>
import { computed } from "vue";
import { useI18n } from "@/i18n";
import { work, education } from "@/data/experience";
import SectionTitle from "@/components/ui/SectionTitle.vue";
import TimelineRow from "./TimelineRow.vue";

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
        <div class="axis" aria-hidden="true">
          <div class="years">
            <span v-for="y in years" :key="y" class="year">
              <span class="full">{{ y }}</span>
              <span class="short">’{{ String(y).slice(2) }}</span>
            </span>
            <span class="today">{{ t("experience.today") }}</span>
          </div>
        </div>

        <div v-for="g in groups" :key="g.key" class="group">
          <h3>{{ t(`experience.${g.key}`) }}</h3>
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
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.chart {
  --label: 19rem;
  --gap: 2rem;
}

.axis {
  display: grid;
  grid-template-columns: var(--label) minmax(0, 1fr);
  gap: var(--gap);
  margin-bottom: 0.5rem;
}

.years {
  grid-column: 2;
  position: relative;
  display: grid;
  grid-template-columns: repeat(var(--n), 1fr);
  padding-bottom: 0.6rem;
  border-bottom: 1px solid var(--border);
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

.group {
  margin-top: 1.75rem;
}

h3 {
  margin-bottom: 0.25rem;
  font-size: var(--fs-small);
  font-family: var(--font-body);
  font-weight: 600;
  color: var(--muted);
}

ol {
  list-style: none;
  padding: 0;
}

@media (max-width: 760px) {
  .axis {
    grid-template-columns: 1fr;
  }

  .years {
    grid-column: 1;
  }

  .full {
    display: none;
  }

  .short {
    display: inline;
  }
}
</style>
