import { reactive, ref } from "vue";
import { socials } from "@/data/profile";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const rules = {
  name: (v) => (!v.trim() ? "required" : ""),
  email: (v) =>
    !v.trim() ? "required" : !EMAIL_RE.test(v.trim()) ? "email" : "",
  message: (v) => (!v.trim() ? "required" : v.trim().length < 10 ? "min" : ""),
};

export function useContactForm() {
  const form = reactive({ name: "", email: "", message: "", website: "" }); // website = honeypot
  const errors = reactive({ name: "", email: "", message: "" });
  const status = ref("idle");

  function validateField(field) {
    errors[field] = rules[field](form[field]);
    return !errors[field];
  }

  function validate() {
    return Object.keys(rules).map(validateField).every(Boolean);
  }

  function reset() {
    form.name = form.email = form.message = form.website = "";
  }

  async function submit() {
    // Bot preencheu o campo invisível: finge sucesso e descarta
    if (form.website) {
      status.value = "success";
      return;
    }
    if (!validate()) return;

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    };
    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;

    status.value = "sending";
    try {
      if (!endpoint) {
        const mail = socials.find((s) => s.id === "email")?.href || "mailto:";
        const subject = encodeURIComponent(
          `Contato pelo portfólio — ${payload.name}`,
        );
        const body = encodeURIComponent(
          `${payload.message}\n\n${payload.name} · ${payload.email}`,
        );
        window.location.href = `${mail}?subject=${subject}&body=${body}`;
      } else {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
      }
      status.value = "success";
      reset();
    } catch (err) {
      console.error("[contact]", err);
      status.value = "error";
    }
  }

  return { form, errors, status, validateField, submit };
}
