<script setup>
import { useI18n } from "@/i18n";

const { t } = useI18n();
</script>

<template>
  <a class="skip-link" href="#main">{{ t("a11y.skip") }}</a>

  <main id="main"></main>
</template>
