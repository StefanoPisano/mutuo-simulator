import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";


import enTranslation from "./locales/en/translation.json"
import enDisclaimer from "./locales/en/disclaimer.json"

import itTranslation from "./locales/it/translation.json"
import itDisclaimer from "./locales/it/disclaimer.json"

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        debug: import.meta.env.DEV,
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                translation: enTranslation,
                disclaimer: enDisclaimer,
            },
            it: {
                translation: itTranslation,
                disclaimer: itDisclaimer,
            },
        },
        detection: {
            lookupQuerystring: 'lang',
            order: ["querystring", "localStorage", "htmlTag", "cookie"],
            caches: ["localStorage"],
        },
    });

