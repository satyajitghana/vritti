import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import rehypePrettyCode from 'rehype-pretty-code';

import { transformers } from '@/lib/highlight-code';

export const { docs, meta } = defineDocs({
  dir: 'content/docs',
});

export default defineConfig({
  mdxOptions: {
    rehypePlugins: (plugins) => {
      // Remove default code highlighter if present
      plugins.shift();
      plugins.push([
        rehypePrettyCode,
        {
          theme: {
            dark: 'github-dark',
            light: 'github-light-default',
          },
          transformers,
        },
      ]);
      return plugins;
    },
  },
});
