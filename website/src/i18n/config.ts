export const languages = ['ja', 'en'] as const;

export type Language = (typeof languages)[number];

export const defaultLanguage: Language = 'ja';

export const languageNames: Record<Language, string> = {
  ja: 'JP',
  en: 'EN',
};

export const navigation = [
  { slug: '', label: { ja: 'Home', en: 'Home' }, languages: ['ja', 'en'] },
  { slug: 'about', label: { ja: 'About', en: 'About' }, languages: ['ja', 'en'] },
  { slug: 'manifesto', label: { ja: 'Manifesto', en: 'Manifesto' }, languages: ['ja', 'en'] },
  { slug: 'credo', label: { ja: 'Credo', en: 'Credo' }, languages: ['ja', 'en'] },
  { slug: 'music', label: { ja: 'Music', en: 'Music' }, languages: ['ja', 'en'] },
  { slug: 'crew', label: { ja: 'CREW', en: 'CREW' }, languages: ['ja'] },
  { slug: 'contact', label: { ja: 'Contact', en: 'Contact' }, languages: ['ja'] },
] as const;

export function isLanguage(value: string | undefined): value is Language {
  return languages.includes(value as Language);
}

export function getLocalizedPath(language: Language, slug = ''): string {
  return slug ? `/${language}/${slug}/` : `/${language}/`;
}

export function switchLanguage(pathname: string, language: Language): string {
  if (/^\/ja\/(?:crew|rooms|contact)(?:\/|$)/.test(pathname) && language === 'en') {
    return getLocalizedPath('en');
  }

  const localizedPath = pathname.replace(/^\/(ja|en)(?=\/|$)/, `/${language}`);
  return localizedPath === pathname ? getLocalizedPath(language) : localizedPath;
}
