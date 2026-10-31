<script setup>
import { useI18n } from "@/i18n";

const { locale, locales, setLocale, t } = useI18n();
</script>

<template>
  <div class="lang" role="group" :aria-label="t('a11y.language')">
    <button
      v-for="code in locales"
      :key="code"
      type="button"
      :class="{ active: code === locale }"
      :aria-pressed="code === locale"
      @click="setLocale(code)"
    >
      {{ code.toUpperCase() }}
    </button>
  </div>
</template>

<style scoped>
.lang {
  display: inline-flex;
  padding: 3px;
  border: 1px solid var(--border);
  border-radius: var(--radius-pill);
  background: rgba(18, 22, 38, 0.6);
}

button {
  padding: 0.3rem 0.65rem;
  border: 0;
  border-radius: var(--radius-pill);
  background: transparent;
  color: var(--muted);
  font-size: var(--fs-xs);
  font-weight: 600;
  letter-spacing: 0.06em;
  cursor: pointer;
  transition:
    background-color 0.2s var(--ease),
    color 0.2s var(--ease);
}

button:hover {
  color: var(--text);
}

button.active {
  background: var(--accent);
  color: var(--accent-ink);
}
</style>
