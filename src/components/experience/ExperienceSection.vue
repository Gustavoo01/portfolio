<script setup>
import { computed } from "vue";
import { useI18n } from "@/i18n";
import { work, education } from "@/data/experience";
import SectionTitle from "@/components/ui/SectionTitle.vue";
import WorkItem from "./WorkItem.vue";
import EducationCard from "./EducationCard.vue";

const { t, l } = useI18n();
const thisYear = new Date().getFullYear();

const period = (item) =>
  `${item.start} — ${item.end ?? t("experience.present")}`;

const duration = (item) => {
  const years = (item.end ?? thisYear) - item.start;
  if (years < 1) return "";
  return t(years === 1 ? "experience.year" : "experience.years", { n: years });
};

const jobs = computed(() =>
  work.map((job) => ({
    id: job.id,
    role: l(job.role),
    org: job.org,
    period: period(job),
    duration: duration(job),
    current: job.end == null,
    summary: l(job.summary) || "",
    highlights: l(job.highlights) || [],
    tags: job.tags || [],
  })),
);

const courses = computed(() =>
  [...education]
    .sort(
      (a, b) =>
        (a.end == null ? 0 : 1) - (b.end == null ? 0 : 1) ||
        (b.end ?? 0) - (a.end ?? 0),
    )
    .map((c) => ({
      id: c.id,
      role: l(c.role),
      org: c.org,
      level: c.level ? t(`experience.levels.${c.level}`) : "",
      period: period(c),
      ongoing: c.end == null,
    })),
);
</script>

<template>
  <section id="experience" class="section" aria-labelledby="experience-title">
    <div class="container">
      <SectionTitle
        id="experience-title"
        :title="t('experience.title')"
        :subtitle="t('experience.subtitle')"
      />

      <div class="block">
        <h3>{{ t("experience.work") }}</h3>
        <div class="jobs">
          <WorkItem
            v-for="job in jobs"
            :key="job.id"
            v-bind="job"
            :current-label="t('experience.current')"
          />
        </div>
      </div>

      <div class="block">
        <h3>{{ t("experience.education") }}</h3>
        <ul class="courses">
          <li v-for="c in courses" :key="c.id">
            <EducationCard
              v-bind="c"
              :status="t('experience.status.ongoing')"
            />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.block + .block {
  margin-top: clamp(3rem, 6vw, 4.5rem);
}

h3 {
  margin-bottom: 1.25rem;
  font-size: var(--fs-h3);
}

.jobs {
  display: grid;
  gap: 1.25rem;
}

.courses {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 260px), 1fr));
  gap: 1rem;
}
</style>
