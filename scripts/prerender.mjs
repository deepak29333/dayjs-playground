import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const templatePath = resolve(root, 'dist/index.html');
const template = readFileSync(templatePath, 'utf8');

const serverEntry = pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href;
const { render, indexablePages, renderSitemap, renderLlmsTxt } = await import(serverEntry);

function applyHead(html, head) {
  const withoutDefaults = html.replace(/<!--seo-defaults-->[\s\S]*?<!--\/seo-defaults-->/, '');
  return withoutDefaults.replace('<!--app-head-->', head);
}

for (const page of indexablePages) {
  const { html, helmet } = render(page.path);
  if (!helmet) {
    throw new Error(`Missing document head for ${page.path}`);
  }

  const head = [
    helmet.title.toString(),
    helmet.meta.toString(),
    helmet.link.toString(),
    helmet.script.toString(),
  ].join('\n');

  const pageHtml = applyHead(template, head).replace('<!--app-html-->', html);
  const filePath =
    page.path === '/'
      ? resolve(root, 'dist/index.html')
      : resolve(root, 'dist', page.path.slice(1), 'index.html');

  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, pageHtml);
  console.log(`prerendered ${page.path}`);
}

const lastmod = new Date().toISOString().slice(0, 10);
const sitemap = renderSitemap(lastmod);
const llms = renderLlmsTxt();

writeFileSync(resolve(root, 'dist/sitemap.xml'), sitemap);
writeFileSync(resolve(root, 'dist/llms.txt'), llms);
writeFileSync(resolve(root, 'public/sitemap.xml'), sitemap);
writeFileSync(resolve(root, 'public/llms.txt'), llms);
console.log('wrote sitemap.xml and llms.txt');
