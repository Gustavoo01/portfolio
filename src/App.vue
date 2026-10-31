<script setup>
import { useI18n } from "@/i18n";
import AppHeader from "@/components/layout/AppHeader.vue";
import StarField from "@/components/hero/StarField.vue";
import HeroSection from "@/components/hero/HeroSection.vue";
import ProjectsSection from "@/components/projects/ProjectsSection.vue";
import AboutSection from "@/components/about/AboutSection.vue";
import ExperienceSection from "@/components/experience/ExperienceSection.vue";

const { t } = useI18n();
</script>

<template>
  <a class="skip-link" href="#main">{{ t("a11y.skip") }}</a>

  <StarField />
  <AppHeader />

  <main id="main">
    <HeroSection />
    <ProjectsSection />
    <AboutSection />
    <ExperienceSection />
  </main>
</template>
