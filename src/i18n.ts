import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import messagesEnGB from '@/translations/messages-en-GB.json';

i18n.use(initReactI18next).init({
  fallbackLng: 'en_GB',
  supportedLngs: ['en_GB'],
  resources: {
    en_GB: {
      translation: messagesEnGB
    }
  },
  interpolation: { escapeValue: false } // React already does escaping
});

export default i18n;
