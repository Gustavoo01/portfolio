<script setup>
import { useI18n } from "@/i18n";
import { profile } from "@/data/profile";
import { asset } from "@/utils/asset";
import BaseButton from "@/components/ui/BaseButton.vue";
import SocialLinks from "@/components/ui/SocialLinks.vue";
import AvailabilityBadge from "./AvailabilityBadge.vue";
import PlanetScene from "./PlanetScene.vue";

const { t } = useI18n();
</script>

<template>
  <section id="top" class="hero">
    <div class="container layout">
      <div class="content">
        <AvailabilityBadge :label="t('hero.available')" />

        <h1>{{ profile.name }}</h1>
        <p class="role">{{ t("hero.role") }}</p>
        <p class="tagline">{{ t("hero.tagline") }}</p>

        <div class="ctas">
          <BaseButton href="#projects">{{ t("hero.ctaProjects") }}</BaseButton>
          <BaseButton
            :href="asset(profile.cvUrl)"
            variant="ghost"
            icon="download"
            download
          >
            {{ t("hero.ctaCv") }}
          </BaseButton>
        </div>

        <SocialLinks :only="['linkedin', 'github']" class="socials" />

        <ul class="skills">
          <li v-for="skill in t('hero.skills')" :key="skill">{{ skill }}</li>
        </ul>
      </div>

      <PlanetScene class="visual" />
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: clamp(640px, 100svh, 1100px);
  display: flex;
  align-items: center;
  padding-top: var(--header-h);
  overflow: hidden;
}

.layout {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
  align-items: center;
  gap: 2rem;
}

.content {
  position: relative;
  z-index: 1;
  padding-block: 3rem;
}

h1 {
  font-size: var(--fs-hero);
  font-weight: 600;
  letter-spacing: -0.02em;
  margin-top: 1.5rem;
}

.role {
  margin-top: 0.75rem;
  font-family: var(--font-display);
  font-size: clamp(1.15rem, 2vw, 1.4rem);
  font-weight: 600;
  color: var(--accent);
}

.tagline {
  margin-top: 1.25rem;
  max-width: 40rem;
  font-size: 1.075rem;
  color: var(--muted);
}

.ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2.25rem;
}

.socials {
  margin-top: 1.75rem;
}

.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
  margin-top: 3rem;
  font-size: var(--fs-small);
  color: var(--subtle);
}

.skills li {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
}

.skills li::before {
  content: "";
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent);
  opacity: 0.7;
}

@media (max-width: 900px) {
  .layout {
    position: static;
    display: block;
  }

  .content {
    padding-block: 2.5rem 3rem;
  }

  .content :deep(.badge) {
    margin-top: 6rem;
  }

  .skills {
    margin-top: 2.5rem;
  }
}

@media (max-width: 520px) {
  .ctas > * {
    flex: 1 1 auto;
  }
}
</style>
