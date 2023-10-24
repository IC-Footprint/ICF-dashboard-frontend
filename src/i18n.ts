import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import messagesEnGB from '@/translations/messages-en-GB.json';
import messagesEsES from '@/translations/messages-es-ES.json';
import messagesDeDe from '@/translations/messages-de-DE.json';
import messagesJaJp from '@/translations/messages-ja-JP.json';
import messagesFrFr from '@/translations/messages-fr-FR.json';
import messagesPtPt from '@/translations/messages-pt-PT.json';
import messagesRuRu from '@/translations/messages-ru-RU.json';
import messagesTrTr from '@/translations/messages-tr-TR.json';
import messagesViVN from '@/translations/messages-vi-VN.json';
import messagesZhCN from '@/translations/messages-zh-CN.json';

i18n.use(initReactI18next).init({
  fallbackLng: 'en_GB',
  supportedLngs: [
    'en_GB',
    'es_ES',
    'de_DE',
    'ja_JP',
    'fr_FR',
    'pt_PT',
    'ru_RU',
    'tr_TR',
    'vi_VN',
    'zh_CN'
  ],
  resources: {
    en_GB: {
      translation: messagesEnGB
    },
    es_ES: {
      translation: messagesEsES
    },
    de_DE: {
      translation: messagesDeDe
    },
    ja_JP: {
      translation: messagesJaJp
    },
    fr_FR: {
      translation: messagesFrFr
    },
    pt_PT: {
      translation: messagesPtPt
    },
    ru_RU: {
      translation: messagesRuRu
    },
    tr_TR: {
      translation: messagesTrTr
    },
    vi_VN: {
      translation: messagesViVN
    },
    zh_CN: {
      messagesZhCN
    }
  },
  interpolation: { escapeValue: false } // React already does escaping
});

export default i18n;
