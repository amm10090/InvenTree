import { i18n } from '@lingui/core';
import { t } from '@lingui/core/macro';
import { I18nProvider } from '@lingui/react';
import { LoadingOverlay, Text } from '@mantine/core';
import { type JSX, useEffect, useRef, useState } from 'react';

import { useShallow } from 'zustand/react/shallow';
import { api } from '../App';
import { useLocalState } from '../states/LocalState';
import { useServerApiState } from '../states/ServerApiState';
import { useStoredTableState } from '../states/StoredTableState';
import { fetchGlobalStates } from '../states/states';

export const defaultLocale = 'en';
const chineseLocale = 'zh_Hans';

const localeLoaders = {
  en: () => import('../locales/en/messages'),
  zh_Hans: () => import('../locales/zh_Hans/messages')
};

const localeAliases: Record<string, keyof typeof localeLoaders> = {
  en: 'en',
  en_us: 'en',
  zh: 'zh_Hans',
  zh_cn: 'zh_Hans',
  zh_hans: 'zh_Hans'
};

function normalizeLocale(
  locale: string | null | undefined
): keyof typeof localeLoaders {
  const normalizedLocale = locale?.replaceAll('-', '_').toLowerCase();

  if (!normalizedLocale) {
    return defaultLocale;
  }

  if (normalizedLocale in localeAliases) {
    return localeAliases[normalizedLocale];
  }

  const baseLocale = normalizedLocale.split('_')[0];

  if (baseLocale in localeAliases) {
    return localeAliases[baseLocale];
  }

  return defaultLocale;
}

function resolveLocale(
  userLocale: string | null | undefined,
  serverLocale: string | null | undefined
): keyof typeof localeLoaders {
  if (userLocale) {
    return normalizeLocale(userLocale);
  }

  if (serverLocale) {
    return normalizeLocale(serverLocale);
  }

  return defaultLocale;
}

/*
 * Function which returns a record of supported languages.
 * Note that this is not a constant, as it is used in the LanguageSelect component
 */
export const getSupportedLanguages = (): Record<string, string> => {
  return {
    en: 'English',
    [chineseLocale]: '中文（简体）'
  };
};

export function LanguageContext({
  children
}: Readonly<{ children: JSX.Element }>) {
  const [language] = useLocalState(useShallow((state) => [state.language]));
  const [server] = useServerApiState(useShallow((state) => [state.server]));

  const [activeLocale, setActiveLocale] = useState<string | null>(null);

  useEffect(() => {
    const locale = resolveLocale(language, server.default_locale);

    if (locale != activeLocale) {
      setActiveLocale(locale);
      void activateLocale(locale);
    }
  }, [activeLocale, language, server.default_locale, defaultLocale]);

  const [loadedState, setLoadedState] = useState<
    'loading' | 'loaded' | 'error'
  >('loading');
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;

    const lang = resolveLocale(language, server.default_locale);

    activateLocale(lang)
      .then(() => {
        if (isMounted.current) setLoadedState('loaded');

        /*
         * Configure the default Accept-Language header for all requests.
         * - Locally selected locale
         * - Server default locale
         * - en-us (backup)
         */
        const locales = [lang, server.default_locale]
          .filter((locale): locale is string => !!locale)
          .map((locale) =>
            normalizeLocale(locale).replaceAll('_', '-').toLowerCase()
          );

        if (!locales.includes('en-us')) {
          locales.push('en-us');
        }

        // Ensure that the locales are properly formatted
        const new_locales = [...new Set(locales)].join(', ');

        if (new_locales == api.defaults.headers.common['Accept-Language']) {
          return;
        }

        // Update default Accept-Language headers
        api.defaults.headers.common['Accept-Language'] = new_locales;

        // Reload server state (and refresh status codes)
        fetchGlobalStates();

        // Clear out cached table column names
        useStoredTableState.getState().clearTableColumnNames();
      })
      /* istanbul ignore next */
      .catch((err) => {
        console.error('ERR: Failed loading translations', err);
        if (isMounted.current) setLoadedState('error');
      });

    return () => {
      isMounted.current = false;
    };
  }, [language, server.default_locale]);

  if (loadedState === 'loading') {
    return <LoadingOverlay visible={true} />;
  }

  /* istanbul ignore next */
  if (loadedState === 'error') {
    return (
      <Text>
        {t`An error occurred while loading translations, see browser console for details.`}
      </Text>
    );
  }

  // only render the i18n Provider if the locales are fully activated, otherwise we end
  // up with an error in the browser console
  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
}

// This function is used to determine the locale to activate based on the prioritization rules.
export function getPriorityLocale(): string {
  const serverDefault = useServerApiState.getState().server.default_locale;
  const userDefault = useLocalState.getState().language;

  return resolveLocale(userDefault, serverDefault);
}

export async function activateLocale(locale: string | null) {
  if (!locale) {
    locale = getPriorityLocale();
  }
  const normalizedLocale = normalizeLocale(locale);

  try {
    const { messages } = await localeLoaders[normalizedLocale]();
    i18n.load(normalizedLocale, messages);
    i18n.activate(normalizedLocale);
  } catch (err) {
    console.error(`Failed to load locale ${normalizedLocale}:`, err);
  }
}
