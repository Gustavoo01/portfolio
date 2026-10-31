<script setup>
import { useI18n } from "@/i18n";
import { asset } from "@/utils/asset";
import TagList from "@/components/ui/TagList.vue";
import BaseIcon from "@/components/ui/BaseIcon.vue";

defineProps({
  project: { type: Object, required: true },
});

const { t, l } = useI18n();
</script>

<template>
  <article class="card">
    <div class="media">
      <img
        v-if="project.image"
        :src="asset(project.image)"
        :alt="project.title"
        loading="lazy"
        decoding="async"
        width="640"
        height="360"
      />
      <div v-else class="placeholder">
        <BaseIcon name="image" :size="44" />
        <span class="sr-only">{{ t("projects.noImage") }}</span>
      </div>
    </div>

    <div class="body">
      <TagList :tags="project.tags" />
      <h3>{{ project.title }}</h3>
      <p>{{ l(project.description) }}</p>

      <div v-if="project.links?.demo || project.links?.code" class="links">
        <a
          v-if="project.links.demo"
          :href="project.links.demo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BaseIcon name="external" :size="16" /> {{ t("projects.demo") }}
        </a>
        <a
          v-if="project.links.code"
          :href="project.links.code"
          target="_blank"
          rel="noopener noreferrer"
        >
          <BaseIcon name="github" :size="16" /> {{ t("projects.code") }}
        </a>
      </div>
    </div>
  </article>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--surface);
  border: 1px solid var(--border);
  transition:
    transform 0.3s var(--ease),
    border-color 0.3s var(--ease),
    box-shadow 0.3s var(--ease);
}

.card:hover {
  transform: translateY(-4px);
  border-color: var(--border-strong);
  box-shadow: var(--shadow);
}

.media {
  aspect-ratio: 16 / 9;
  background: var(--media);
}

.media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder {
  height: 100%;
  display: grid;
  place-items: center;
  color: rgba(255, 255, 255, 0.35);
}

.body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.25rem 1.4rem 1.5rem;
}

h3 {
  font-size: var(--fs-h3);
  font-weight: 700;
}

p {
  color: var(--muted);
  font-size: 0.95rem;
}

.links {
  display: flex;
  gap: 1.25rem;
  margin-top: auto;
  padding-top: 0.5rem;
}

.links a {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: var(--fs-small);
  font-weight: 600;
  color: var(--accent);
}

.links a:hover {
  color: var(--accent-hover);
  text-decoration: underline;
  text-underline-offset: 3px;
}
</style>
