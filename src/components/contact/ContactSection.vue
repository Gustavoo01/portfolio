<script setup>
import { useI18n } from "@/i18n";
import { useContactForm } from "@/composables/useContactForm";
import SectionTitle from "@/components/ui/SectionTitle.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import SocialLinks from "@/components/ui/SocialLinks.vue";
import FormField from "./FormField.vue";

const { t } = useI18n();
const { form, errors, status, validateField, submit } = useContactForm();

const err = (field) =>
  errors[field] ? t(`contact.errors.${errors[field]}`) : "";
</script>

<template>
  <section id="contact" class="section" aria-labelledby="contact-title">
    <div class="container">
      <SectionTitle
        id="contact-title"
        :title="t('contact.title')"
        :subtitle="t('contact.subtitle')"
      />

      <div class="layout">
        <form class="form" novalidate @submit.prevent="submit">
          <div class="row">
            <FormField
              id="name"
              v-model="form.name"
              :label="t('contact.name')"
              :placeholder="t('contact.namePh')"
              autocomplete="name"
              :error="err('name')"
              @blur="errors.name && validateField('name')"
            />
            <FormField
              id="email"
              v-model="form.email"
              type="email"
              :label="t('contact.email')"
              :placeholder="t('contact.emailPh')"
              autocomplete="email"
              :error="err('email')"
              @blur="errors.email && validateField('email')"
            />
          </div>
          <FormField
            id="message"
            v-model="form.message"
            multiline
            :label="t('contact.message')"
            :placeholder="t('contact.messagePh')"
            :error="err('message')"
            @blur="errors.message && validateField('message')"
          />

          <!-- Honeypot -->
          <div class="hp" aria-hidden="true">
            <label for="website">Website</label>
            <input
              id="website"
              v-model="form.website"
              type="text"
              tabindex="-1"
              autocomplete="off"
            />
          </div>

          <div class="submit">
            <BaseButton type="submit" :disabled="status === 'sending'">
              {{
                status === "sending" ? t("contact.sending") : t("contact.send")
              }}
            </BaseButton>
            <p v-if="status === 'success'" class="feedback ok" role="status">
              {{ t("contact.success") }}
            </p>
            <p v-if="status === 'error'" class="feedback fail" role="alert">
              {{ t("contact.error") }}
            </p>
          </div>
        </form>

        <aside class="direct">
          <h3>{{ t("contact.direct") }}</h3>
          <SocialLinks variant="list" :size="20" />
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: clamp(2rem, 5vw, 4rem);
  align-items: start;
}

.form {
  display: grid;
  gap: 1.25rem;
}

.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

.hp {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.submit {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.feedback {
  font-size: var(--fs-small);
}

.ok {
  color: var(--accent);
}

.fail {
  color: var(--danger);
}

.direct h3 {
  margin-bottom: 1rem;
  font-size: var(--fs-h3);
}

@media (max-width: 860px) {
  .layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 520px) {
  .row {
    grid-template-columns: 1fr;
  }
}
</style>
