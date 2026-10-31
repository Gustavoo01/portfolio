<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: "" },
  id: { type: String, default: "" },
});
</script>

<template>
  <header class="section-title">
    <h2 :id="id || null">{{ title }}</h2>
    <p v-if="subtitle">{{ subtitle }}</p>
  </header>
</template>

<style scoped>
.section-title {
  margin-bottom: 20px;
  max-width: 60ch;
}

h2 {
  font-size: var(--fs-h2);
  font-weight: 700;
}

h2::after {
  content: "";
  display: block;
  width: 48px;
  height: 3px;
  margin-top: 0.75rem;
  border-radius: 2px;
  background: var(--accent);
}

p {
  margin-top: 1rem;
  color: var(--muted);
}
</style>
