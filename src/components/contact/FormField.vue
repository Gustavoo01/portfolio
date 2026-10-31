<script setup>
const model = defineModel({ type: String, default: "" });

defineProps({
  id: { type: String, required: true },
  label: { type: String, required: true },
  type: { type: String, default: "text" },
  placeholder: { type: String, default: "" },
  autocomplete: { type: String, default: "off" },
  error: { type: String, default: "" },
  multiline: Boolean,
});

defineEmits(["blur"]);
</script>

<template>
  <div class="field" :class="{ invalid: error }">
    <label :for="id">{{ label }}</label>
    <textarea
      v-if="multiline"
      :id="id"
      v-model="model"
      :name="id"
      rows="5"
      :placeholder="placeholder"
      :aria-invalid="!!error"
      :aria-describedby="error ? `${id}-error` : null"
      @blur="$emit('blur')"
    />
    <input
      v-else
      :id="id"
      v-model="model"
      :name="id"
      :type="type"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :aria-invalid="!!error"
      :aria-describedby="error ? `${id}-error` : null"
      @blur="$emit('blur')"
    />
    <p v-if="error" :id="`${id}-error`" class="error" role="alert">
      {{ error }}
    </p>
  </div>
</template>

<style scoped>
.field {
  display: grid;
  gap: 0.4rem;
}

label {
  font-size: var(--fs-small);
  font-weight: 500;
}

input,
textarea {
  width: 100%;
  padding: 0.8rem 1rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-strong);
  background: var(--surface);
  color: var(--text);
  transition:
    border-color 0.2s var(--ease),
    box-shadow 0.2s var(--ease);
}

textarea {
  resize: vertical;
  min-height: 140px;
}

input::placeholder,
textarea::placeholder {
  color: var(--subtle);
}

input:focus,
textarea:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-soft);
}

.invalid input,
.invalid textarea {
  border-color: var(--danger);
}

.error {
  color: var(--danger);
  font-size: var(--fs-xs);
}
</style>
