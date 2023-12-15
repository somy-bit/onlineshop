import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import tEn from "./locales/en/translation.json"
import tDe from "./locales/de/translation.json"



i18n
  .use(initReactI18next)
  
  .init({
    resources:{
        en:{
            translation : tEn
        },
        de:{
            translation:tDe
        }
    },
    fallbackLng: 'en',
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });


export default i18n;