<script setup>
defineProps({
  role: { type: String, required: true },
  org: { type: String, required: true },
  period: { type: String, default: "" },
  description: { type: String, default: "" },
  level: { type: String, default: "" }, // texto já traduzido, ex.: "Pós-graduação"
  status: { type: String, default: "" }, // texto já traduzido, ex.: "Em andamento"
  ongoing: Boolean,
});
</script>

<template>
  <li class="item" :class="{ ongoing }">
    <span class="marker" aria-hidden="true" />
    <div class="meta">
      <span v-if="level" class="level">{{ level }}</span>
      <span class="period">{{ period }}</span>
      <span v-if="status" class="status">{{ status }}</span>
    </div>
    <h4>{{ role }}</h4>
    <p class="org">{{ org }}</p>
    <p v-if="description" class="desc">{{ description }}</p>
  </li>
</template>

<style scoped>
.item {
  position: relative;
  padding-left: 1.75rem;
  padding-bottom: 1.75rem;
}

.item:last-child {
  padding-bottom: 0;
}

/* linha vertical ligando os itens */
.item::before {
  content: "";
  position: absolute;
  left: 5px;
  top: 14px;
  bottom: -4px;
  width: 1px;
  background: var(--border-strong);
}

.item:last-child::before {
  display: none;
}

.marker {
  position: absolute;
  left: 0;
  top: 5px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  border: 2px solid var(--border-strong);
  background: var(--bg);
}

.ongoing .marker {
  border-color: var(--accent);
  background: var(--accent);
  box-shadow: 0 0 0 4px var(--accent-soft);
}

.meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem 0.6rem;
  font-size: var(--fs-xs);
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--subtle);
}

.level {
  color: var(--muted);
}

.level + .period::before {
  content: "·";
  margin-right: 0.6rem;
}

.status {
  padding: 0.1rem 0.55rem;
  border-radius: var(--radius-pill);
  border: 1px solid var(--border-strong);
  letter-spacing: 0.03em;
  text-transform: none;
  font-weight: 500;
}

.ongoing .status {
  border-color: rgba(52, 211, 153, 0.4);
  background: var(--accent-soft);
  color: var(--accent);
}

h4 {
  margin-top: 0.35rem;
  font-size: 1.1rem;
}

.org {
  color: var(--accent);
  font-weight: 500;
  font-size: var(--fs-small);
}

.desc {
  margin-top: 0.5rem;
  color: var(--muted);
  font-size: 0.95rem;
}
</style>
