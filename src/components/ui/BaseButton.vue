<script setup>
import BaseIcon from "./BaseIcon.vue";

defineProps({
  href: { type: String, default: "" },
  variant: { type: String, default: "primary" }, // primary | ghost
  size: { type: String, default: "md" }, // md | sm
  icon: { type: String, default: "" },
  type: { type: String, default: "button" },
  disabled: Boolean,
  download: { type: [Boolean, String], default: false },
  external: Boolean,
});
</script>

<template>
  <a
    v-if="href"
    :href="href"
    class="btn"
    :class="[`btn--${variant}`, `btn--${size}`]"
    :download="download || null"
    :target="external ? '_blank' : null"
    :rel="external ? 'noopener noreferrer' : null"
  >
    <slot />
    <BaseIcon v-if="icon" :name="icon" :size="18" />
  </a>
  <button
    v-else
    :type="type"
    class="btn"
    :class="[`btn--${variant}`, `btn--${size}`]"
    :disabled="disabled"
  >
    <slot />
    <BaseIcon v-if="icon" :name="icon" :size="18" />
  </button>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: var(--radius-pill);
  font-family: var(--font-display);
  font-weight: 600;
  letter-spacing: 0.01em;
  border: 1px solid transparent;
  cursor: pointer;
  transition:
    background-color 0.2s var(--ease),
    border-color 0.2s var(--ease),
    color 0.2s var(--ease),
    transform 0.2s var(--ease);
}

.btn--md {
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
}

.btn--sm {
  padding: 0.5rem 1rem;
  font-size: var(--fs-small);
}

.btn--primary {
  background: var(--accent);
  color: var(--accent-ink);
}

.btn--primary:hover {
  background: var(--accent-hover);
  transform: translateY(-1px);
}

.btn--ghost {
  background: transparent;
  color: var(--text);
  border-color: var(--border-strong);
}

.btn--ghost:hover {
  border-color: var(--accent);
  color: var(--accent);
}

.btn:disabled {
  opacity: 0.6;
  cursor: progress;
  transform: none;
}
</style>
