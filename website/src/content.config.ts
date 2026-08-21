import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const pages = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: '../content',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
});

export const collections = { pages };
