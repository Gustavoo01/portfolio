<script setup>
import { useI18n } from "@/i18n";
import { profile } from "@/data/profile";
import AppLogo from "@/components/ui/AppLogo.vue";
import SocialLinks from "@/components/ui/SocialLinks.vue";

const { t } = useI18n();
const year = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <div class="container inner">
      <a href="#top" class="brand">
        <AppLogo :size="30" />
        <span>{{ profile.brand }}</span>
      </a>
      <p class="copy">
        © {{ year }} {{ profile.name }}. {{ t("footer.rights") }}
      </p>
      <SocialLinks :only="['linkedin', 'github']" :size="18" />
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--border);
  background: rgba(7, 9, 15, 0.85);
}

.inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-block: 1.5rem;
  flex-wrap: wrap;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.1rem;
}

.copy {
  color: var(--subtle);
  font-size: var(--fs-small);
}

@media (max-width: 640px) {
  .inner {
    flex-direction: column;
    text-align: center;
  }
}
</style>
