<script setup>
import { computed, ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import { useI18n } from "@/i18n";
import { projects } from "@/data/projects";
import SectionTitle from "@/components/ui/SectionTitle.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import ProjectCard from "./ProjectCard.vue";

const { t } = useI18n();

const ordered = [
  ...projects.filter((p) => p.featured),
  ...projects.filter((p) => !p.featured),
];

const grid = ref(null);
const columns = ref(3);
const pages = ref(1);
const rowsPerPage = computed(() => (columns.value === 1 ? 3 : 2));
const perPage = computed(() => columns.value * rowsPerPage.value);
const shown = computed(() =>
  Math.min(ordered.length, perPage.value * pages.value),
);
const visible = computed(() => ordered.slice(0, shown.value));
const hasMore = computed(() => shown.value < ordered.length);
const canCollapse = computed(() => !hasMore.value && pages.value > 1);

let observer;
const gridEl = () => grid.value?.$el ?? grid.value;

function measure() {
  const el = gridEl();
  if (!el) return;
  const tracks = getComputedStyle(el)
    .gridTemplateColumns.split(" ")
    .filter(Boolean);
  columns.value = Math.max(1, tracks.length);
}

onMounted(() => {
  measure();
  observer = new ResizeObserver(measure);
  observer.observe(gridEl());
});
onBeforeUnmount(() => observer?.disconnect());

async function toggle() {
  if (hasMore.value) {
    pages.value++;
  } else {
    pages.value = 1;
    await nextTick();
    document
      .getElementById("projects")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
</script>

<template>
  <section id="projects" class="section" aria-labelledby="projects-title">
    <div class="container">
      <SectionTitle
        id="projects-title"
        :title="t('projects.title')"
        :subtitle="t('projects.subtitle')"
      />

      <TransitionGroup ref="grid" tag="ul" name="card" class="grid">
        <li
          v-for="(project, i) in visible"
          :key="project.id"
          :style="{ '--i': i % perPage }"
        >
          <ProjectCard :project="project" />
        </li>
      </TransitionGroup>

      <div v-if="hasMore || canCollapse" class="more">
        <p class="count">
          {{ t("projects.count", { shown, total: ordered.length }) }}
        </p>
        <BaseButton variant="ghost" @click="toggle">
          {{ hasMore ? t("projects.showMore") : t("projects.showLess") }}
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
  gap: 1.5rem;
}

.more {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  margin-top: 2.5rem;
}

.count {
  color: var(--subtle);
  font-size: var(--fs-small);
}

.card-enter-active {
  transition:
    opacity 0.45s var(--ease),
    transform 0.45s var(--ease);
  transition-delay: calc(var(--i) * 60ms);
}

.card-enter-from {
  opacity: 0;
  transform: translateY(16px);
}
</style>
