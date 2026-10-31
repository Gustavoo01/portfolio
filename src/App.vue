<script setup>
import { useI18n } from "@/i18n";
import AppHeader from "@/components/layout/AppHeader.vue";

const { t } = useI18n();
</script>

<template>
  <a class="skip-link" href="#main">{{ t("a11y.skip") }}</a>
  <AppHeader />

  <main id="main"></main>
</template>
