import i18next from 'i18next';
import moment from 'moment';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import { APP_EN } from './en/app';
import { APP_RU } from './ru/app';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    interpolation: {
      format: (value, format) => {
        if (value instanceof Date) {
          return moment(value).format(format);
        }
        return value;
      },
    },
    resources: {
      en: {
        translation: APP_EN,
      },
      ru: {
        translation: APP_RU,
      },
    },
  });
