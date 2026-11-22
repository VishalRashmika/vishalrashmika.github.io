import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site ? site.toString().replace(/\/$/, '') : 'https://vishalrashmika.com';
  const sitemapIndex = `${baseUrl}/sitemap-index.xml`;
  const sitemapXml = `${baseUrl}/sitemap.xml`;
  const llmUrl = `${baseUrl}/llms.txt`;
  const llmFullUrl = `${baseUrl}/llms-full.txt`;

  const robots = `# Robots.txt for Vishal Rashmika Portfolio
# Website: ${baseUrl}
# Full crawling and indexing permitted for all search engines and AI / LLM agents

User-agent: *
Allow: /

# Search Engine Crawlers
User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Baiduspider
Allow: /

User-agent: YandexBot
Allow: /

User-agent: Sogou
Allow: /

User-agent: Exabot
Allow: /

# Leading AI & LLM Search Crawlers / Model Training Agents
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: Anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Applebot
Allow: /

User-agent: CCBot
Allow: /

User-agent: Bytespider
Allow: /

User-agent: Diffbot
Allow: /

User-agent: Cohere-ai
Allow: /

User-agent: Meta-ExternalAgent
Allow: /

User-agent: Meta-ExternalFetcher
Allow: /

User-agent: FacebookBot
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: Scrapy
Allow: /

# XML Sitemaps
Sitemap: ${sitemapIndex}
Sitemap: ${sitemapXml}

# Machine-Readable LLM Knowledge Endpoints
# LLM Summary: ${llmUrl}
# LLM Full Context: ${llmFullUrl}
`;

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
