import en from './en.ts';
import de from './de.ts';

export type TranslationKey = keyof typeof en;
export type Translations = Record<TranslationKey, string>;

const FALLBACK_LANG = 'en';

const dictionaries: Record<string, Partial<Translations>> = {
  en,
  de,
};

/**
 * Detect the system language via the standard Intl API.
 * Returns the base language tag (e.g. "en" from "en-US").
 */
function detectLanguage(): string {
  return new Intl.Locale(
    Intl.DateTimeFormat().resolvedOptions().locale,
  ).language;
}

const currentLang = detectLanguage();

/**
 * Look up a translated string. Falls back to the default language,
 * and finally to the key itself so missing strings stay visible.
 * @param {TranslationKey} key Translation key defined in the fallback dictionary
 */
export function t(key: TranslationKey): string {
  return dictionaries[currentLang]?.[key] ?? dictionaries[FALLBACK_LANG][key] ?? key;
}
