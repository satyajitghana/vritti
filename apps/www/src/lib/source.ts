import { docs, meta } from '../../.source/server';

export function getPage(slugs?: string[]) {
  // Handle root case - if no slugs or empty array, look for index
  if (!slugs || slugs.length === 0) {
    // @ts-ignore - url property exists at runtime
    return docs.find((page) => page.url === '/docs' || page.url === '/docs/index');
  }

  const targetUrl = `/docs/${slugs.join('/')}`;
  // @ts-ignore - url property exists at runtime
  return docs.find((page) => page.url === targetUrl);
}

export function getPages() {
  return docs;
}

export function generateParams() {
  return docs.map((page) => {
    // @ts-ignore - url property exists at runtime
    const url = page.url || '';
    // Remove /docs prefix and split by /
    const slugs = url.replace('/docs/', '').replace('/docs', '').split('/').filter(Boolean);
    return {
      slug: slugs.length > 0 ? slugs : undefined,
    };
  });
}
