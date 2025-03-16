import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

import resources from '@/assets/translation.json'

const localesUrl = new URL('locales/', import.meta.env.VITE_API_URL).href + '{{ns}}.{{lng}}.json'
console.log('localesUrl:', localesUrl)

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: resources,
    ns: ['translation', 'rebates', 'options'],
    fallbackLng: {
      hk: ['zh'],
      tw: ['zh'],
      cn: ['zh'],
      hant: ['zh'],
      hans: ['zh'],
      default: ['en'],
    },
    load: 'languageOnly', // Normalize values like "en-US" to "en"
    detection: {
      lookupQuerystring: 'lang',
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      caches: ['cookie', 'localStorage'],
    },
    interpolation: {
      escapeValue: false, // React already protects against XSS
    },
    backend: {
      loadPath: localesUrl,
      crossDomain: true,
      withCredentials: false,
    },
    partialBundledLanguages: true, // Use both bundled and loaded resources from backend
    debug: true,
  })

export default i18n
