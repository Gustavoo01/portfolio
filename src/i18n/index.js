import { ref } from "vue";
import pt from "./locales/pt";
import en from "./locales/en";
import es from "./locales/es";

const messages = { pt, en, es };
const htmlLang = { pt: "pt-BR", en: "en", es: "es" };
const STORAGE_KEY = "gds-locale";

function detectLocale() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && messages[saved]) return saved;
  } catch {}
  const nav = (navigator.language || "pt").slice(0, 2);
  return messages[nav] ? nav : "pt";
}

const locale = ref(detectLocale());

function applyDocument(l) {
  document.documentElement.lang = htmlLang[l];
  document.title = messages[l].meta.title;
}
applyDocument(locale.value);

function resolve(obj, path) {
  return path
    .split(".")
    .reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
}

export function useI18n() {
  const t = (key, params) => {
    const value =
      resolve(messages[locale.value], key) ?? resolve(messages.pt, key) ?? key;
    if (!params || typeof value !== "string") return value;
    return value.replace(/\{(\w+)\}/g, (_, k) => params[k] ?? `{${k}}`);
  };

  const l = (value) => {
    if (value == null || typeof value === "string") return value;
    return value[locale.value] ?? value.pt;
  };

  function setLocale(next) {
    if (!messages[next]) return;
    locale.value = next;
    applyDocument(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }

  return { locale, locales: Object.keys(messages), t, l, setLocale };
}
