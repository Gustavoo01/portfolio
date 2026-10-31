<script setup>
import { useI18n } from "@/i18n";
import { profile } from "@/data/profile";
import { stack } from "@/data/stack";
import SectionTitle from "@/components/ui/SectionTitle.vue";

const { t, l } = useI18n();
</script>

<template>
  <section id="about" class="section" aria-labelledby="about-title">
    <div class="container">
      <SectionTitle
        id="about-title"
        :title="t('about.title')"
        :subtitle="t('about.subtitle')"
      />

      <div class="layout">
        <div class="bio">
          <p
            v-for="(paragraph, i) in l(profile.about)"
            :key="i"
            :class="{ lead: i === 0 }"
          >
            {{ paragraph }}
          </p>
        </div>

        <div class="stack">
          <h3>{{ t("about.stackTitle") }}</h3>
          <dl>
            <div v-for="g in stack" :key="g.group" class="row">
              <dt>{{ t(`about.groups.${g.group}`) }}</dt>
              <dd>{{ g.items.join(", ") }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: clamp(2.5rem, 6vw, 5rem);
  align-items: start;
}

.bio {
  display: grid;
  gap: 1.2rem;
  max-width: 38rem;
  color: var(--muted);
  font-size: 1.05rem;
}

.lead {
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 1.8vw, 1.4rem);
  font-weight: 500;
  line-height: 1.5;
  color: var(--text);
}

.stack h3 {
  margin-bottom: 1rem;
  font-size: var(--fs-h3);
}

.row {
  display: grid;
  grid-template-columns: 9rem minmax(0, 1fr);
  gap: 1rem;
  padding-block: 0.9rem;
  border-top: 1px solid var(--border);
}

.row:last-child {
  border-bottom: 1px solid var(--border);
}

dt {
  color: var(--subtle);
  font-size: var(--fs-small);
  padding-top: 0.1rem;
}

dd {
  margin: 0;
  color: var(--text);
}

@media (max-width: 860px) {
  .layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 440px) {
  .row {
    grid-template-columns: 1fr;
    gap: 0.2rem;
  }
}
</style>
