export const languages = ['ja', 'en'] as const;

export type Language = (typeof languages)[number];

export const defaultLanguage: Language = 'ja';

export const languageNames: Record<Language, string> = {
  ja: 'JP',
  en: 'EN',
};

export const navigation = [
  { slug: '', label: { ja: 'Home', en: 'Home' } },
  { slug: 'about', label: { ja: 'About', en: 'About' } },
  { slug: 'manifesto', label: { ja: 'Manifesto', en: 'Manifesto' } },
  { slug: 'credo', label: { ja: 'Credo', en: 'Credo' } },
  { slug: 'music', label: { ja: 'Music', en: 'Music' } },
] as const;

export function isLanguage(value: string | undefined): value is Language {
  return languages.includes(value as Language);
}

export function getLocalizedPath(language: Language, slug = ''): string {
  return slug ? `/${language}/${slug}/` : `/${language}/`;
}

export function switchLanguage(pathname: string, language: Language): string {
  const localizedPath = pathname.replace(/^\/(ja|en)(?=\/|$)/, `/${language}`);
  return localizedPath === pathname ? getLocalizedPath(language) : localizedPath;
}
