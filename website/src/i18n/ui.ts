import type { Language } from './config';

export const ui = {
  ja: {
    siteDescription: '対話から創造を育てる、LennyxCREWの公式サイト。',
    homeTitle: '一人では辿り着けない未来を、人とAIで。',
    homeLead: '音楽は、共鳴の入口。対話は、未来を共に創る架け橋。',
    homeLink: 'この先へ',
    musicTitle: 'Music',
    musicLead: '音楽は、共鳴の入口。',
    musicStatus: '作品情報は、公開準備が整ったものから順次掲載します。',
    menu: 'メニュー',
    skipToContent: '本文へ移動',
    primaryNavigation: 'メインナビゲーション',
    languageNavigation: '言語選択',
  },
  en: {
    siteDescription: 'The official LennyxCREW website, where creativity grows through dialogue.',
    homeTitle: 'Beyond what we can reach alone—together, Human and AI.',
    homeLead: 'Music is an invitation to resonance. Dialogue is the bridge where we create the future together.',
    homeLink: 'Beyond this point',
    musicTitle: 'Music',
    musicLead: 'Music is an invitation to resonance.',
    musicStatus: 'Official releases will be added as they are ready to be presented.',
    menu: 'Menu',
    skipToContent: 'Skip to content',
    primaryNavigation: 'Primary navigation',
    languageNavigation: 'Language selection',
  },
} as const satisfies Record<Language, Record<string, string>>;
