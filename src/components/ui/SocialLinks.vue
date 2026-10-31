<script setup>
import { computed } from "vue";
import BaseIcon from "./BaseIcon.vue";
import { socials } from "@/data/profile";

const props = defineProps({
  only: { type: Array, default: null }, // ex.: ['linkedin', 'github']
  variant: { type: String, default: "icons" }, // icons | list
  size: { type: Number, default: 22 },
});

const items = computed(() =>
  socials.filter((s) => s.href && (!props.only || props.only.includes(s.id))),
);

const isExternal = (href) => href.startsWith("http");
const display = (s) =>
  s.href
    .replace(/^mailto:/, "")
    .replace(/^https?:\/\/(www\.)?/, "")
    .replace(/\/$/, "");
</script>

<template>
  <ul class="socials" :class="`socials--${variant}`">
    <li v-for="s in items" :key="s.id">
      <a
        :href="s.href"
        :aria-label="variant === 'icons' ? s.label : null"
        :target="isExternal(s.href) ? '_blank' : null"
        :rel="isExternal(s.href) ? 'noopener noreferrer' : null"
      >
        <BaseIcon :name="s.icon" :size="size" />
        <span v-if="variant === 'list'" class="text">
          <strong>{{ s.label }}</strong>
          <small>{{ display(s) }}</small>
        </span>
      </a>
    </li>
  </ul>
</template>

<style scoped>
.socials--icons {
  display: flex;
  gap: 0.5rem;
}

.socials--icons a {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  color: var(--muted);
  border: 1px solid var(--border);
  transition:
    color 0.2s var(--ease),
    border-color 0.2s var(--ease);
}

.socials--icons a:hover {
  color: var(--accent);
  border-color: var(--accent);
}

.socials--list {
  display: grid;
  gap: 0.75rem;
}

.socials--list a {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.9rem 1rem;
  border-radius: var(--radius-sm);
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--accent);
  transition: border-color 0.2s var(--ease);
}

.socials--list a:hover {
  border-color: var(--accent);
}

.text {
  display: flex;
  flex-direction: column;
  min-width: 0;
  line-height: 1.35;
}

.text strong {
  color: var(--text);
  font-weight: 600;
  font-size: var(--fs-small);
}

.text small {
  color: var(--muted);
  font-size: var(--fs-xs);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
