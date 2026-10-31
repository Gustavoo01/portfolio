<script setup>
import { ref, watch } from "vue";
import { useI18n } from "@/i18n";
import { navItems } from "@/data/navigation";
import { useActiveSection } from "@/composables/useActiveSection";
import { useScrolled } from "@/composables/useScrolled";
import AppLogo from "@/components/ui/AppLogo.vue";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher.vue";
import BaseIcon from "@/components/ui/BaseIcon.vue";

const { t } = useI18n();
const active = useActiveSection(navItems.map((i) => i.id));
const scrolled = useScrolled();
const open = ref(false);

watch(open, (v) =>
  document.body.style.setProperty("overflow", v ? "hidden" : ""),
);
const close = () => (open.value = false);
</script>

<template>
  <header class="header" :class="{ scrolled, open }">
    <div class="container bar">
      <a href="#top" class="logo" :aria-label="t('a11y.home')" @click="close">
        <AppLogo :size="38" />
      </a>

      <nav id="main-nav" class="nav" :class="{ open }">
        <ul>
          <li v-for="item in navItems" :key="item.id">
            <a
              :href="`#${item.id}`"
              :class="{ active: active === item.id }"
              :aria-current="active === item.id ? 'true' : null"
              @click="close"
            >
              {{ t(`nav.${item.key}`) }}
            </a>
          </li>
        </ul>
        <LanguageSwitcher class="lang-mobile" />
      </nav>

      <div class="actions">
        <LanguageSwitcher class="lang-desktop" />
        <button
          class="menu-btn"
          type="button"
          aria-controls="main-nav"
          :aria-expanded="open"
          :aria-label="open ? t('a11y.closeMenu') : t('a11y.openMenu')"
          @click="open = !open"
        >
          <BaseIcon :name="open ? 'close' : 'menu'" :size="24" />
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 50;
  height: var(--header-h);
  transition:
    background-color 0.3s var(--ease),
    border-color 0.3s var(--ease);
  border-bottom: 1px solid transparent;
}

.header.scrolled,
.header.open {
  background: rgba(7, 9, 15, 0.82);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom-color: var(--border);
}

.bar {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.logo {
  color: var(--text);
  display: inline-flex;
}

.nav ul {
  display: flex;
  gap: 0.25rem;
}

.nav a {
  position: relative;
  display: block;
  padding: 0.5rem 0.9rem;
  font-family: var(--font-display);
  font-weight: 500;
  font-size: 0.95rem;
  color: var(--muted);
  transition: color 0.2s var(--ease);
}

.nav a:hover,
.nav a.active {
  color: var(--text);
}

.nav a.active::after {
  content: "";
  position: absolute;
  left: 0.9rem;
  right: 0.9rem;
  bottom: 0.2rem;
  height: 2px;
  border-radius: 2px;
  background: var(--accent);
}

.actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.menu-btn {
  display: none;
  padding: 0.4rem;
  border: 0;
  background: none;
  color: var(--text);
  cursor: pointer;
}

.lang-mobile {
  display: none;
}

@media (max-width: 760px) {
  .menu-btn {
    display: inline-flex;
  }

  .lang-desktop {
    display: none;
  }

  .nav {
    position: fixed;
    inset: var(--header-h) 0 0;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem var(--gutter);
    background: rgba(7, 9, 15, 0.97);
    transform: translateY(-8px);
    opacity: 0;
    visibility: hidden;
    transition:
      opacity 0.25s var(--ease),
      transform 0.25s var(--ease),
      visibility 0.25s;
  }

  .nav.open {
    transform: none;
    opacity: 1;
    visibility: visible;
  }

  .nav ul {
    flex-direction: column;
  }

  .nav a {
    font-size: 1.5rem;
    padding: 0.6rem 0;
  }

  .nav a.active::after {
    left: 0;
    right: auto;
    width: 32px;
  }

  .lang-mobile {
    display: inline-flex;
    align-self: flex-start;
  }
}
</style>
