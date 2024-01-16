import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import EN_TRANSLATION from "./locales/en/translation";
import EN_MESSAGE from "./locales/en/message";
import VI_MESSAGE from "./locales/vi/message";
import VI_TRANSLATION from "./locales/vi/translation";
import LngDetector, { DetectorOptions } from "i18next-browser-languagedetector";

const resources = {
  en: { translation: EN_TRANSLATION, message: EN_MESSAGE },
  vi: { translation: VI_TRANSLATION, message: VI_MESSAGE },
};

const options: DetectorOptions = {
  order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag"],

  lookupQuerystring: "lng",
  lookupCookie: "i18next",
  lookupLocalStorage: "i18nextLng",

  caches: ["localStorage", "cookie"],
  excludeCacheFor: ["cimode"],

  htmlTag: document.documentElement,
};
const lngDetector = new LngDetector(null, options);

i18n
  .use(lngDetector)
  .use(initReactI18next)
  .init({
    resources,
    debug: true,

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
