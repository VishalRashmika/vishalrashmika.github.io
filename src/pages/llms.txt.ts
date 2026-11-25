import type { APIRoute } from 'astro';
import { getAllSiteData } from '../lib/content';

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site ? site.toString().replace(/\/$/, '') : 'https://vishalrashmika.com';
  const data = getAllSiteData();
  const profile = data.profile;

  const lines: string[] = [
    `# ${profile.name}`,
    '',
    `> ${profile.headline} based in ${profile.location}. Software engineer, systems developer, and cybersecurity researcher specializing in systems programming, reverse engineering, web applications, and scalable architecture.`,
    '',
    '## Overview',
    profile.bio || `${profile.name} is a software developer and cybersecurity enthusiast based in Sri Lanka, focusing on systems programming, scalable applications, reverse engineering, and intentional user interfaces.`,
    '',
    '## Core Competencies',
    '- **Languages:** C, C++, x86-64 Assembly, Rust, Python, TypeScript, JavaScript, C# / .NET, SQL, HTML/CSS',
    '- **Systems & Security:** Reverse Engineering, Penetration Testing, Linux System Internals, Binary Disassembly, Debugging & Symbol Analysis, Network Protocols, OCI Security',
    '- **Web & Frameworks:** Astro (SSG / Islands), React 19, Tailwind CSS v4, Node.js, Express, Vite, RESTful APIs',
    '- **Cloud & Infrastructure:** Oracle Cloud Infrastructure (OCI), Linux Administration, Git, Netlify, Agile / Scrum Leadership',
    '',
    '## Key Projects',
    ...data.projects.map((p) => {
      const links: string[] = [];
      if (p.demo) links.push(`[Live Demo](${p.demo})`);
      if (p.github) links.push(`[Source Code](${p.github})`);
      const linksStr = links.length > 0 ? ` (${links.join(' | ')})` : '';
      const tagsStr = p.tags && p.tags.length > 0 ? ` [${p.tags.join(', ')}]` : '';
      const downloadsStr = p.downloads && p.downloads !== '—' ? ` - ${p.downloads} downloads` : '';
      return `- [${p.name}](${p.demo || p.github || baseUrl})${tagsStr}${downloadsStr}${linksStr}: ${p.description}`;
    }),
    '',
    '## Professional Experience',
    ...data.experiences.map((exp) => {
      const role = exp.role || exp.title || 'Developer';
      const desc = exp.desc || exp.description || '';
      const skills = exp.skills && exp.skills.length > 0 ? ` Skills: ${exp.skills.join(', ')}.` : '';
      return `- **${role}** at **${exp.company}** (${exp.period}): ${desc}${skills}`;
    }),
    '',
    '## Education',
    ...data.education.map((edu) => {
      const detail = edu.detail ? ` - ${edu.detail}` : '';
      return `- **${edu.degree}** — ${edu.institution} (${edu.period})${detail}`;
    }),
    '',
    '## Notable Certifications & Badges',
    ...data.certifications.slice(0, 10).map((cert) => {
      return `- [${cert.name}](${cert.url}) — Issued by ${cert.issuer} (${cert.date})`;
    }),
    ...data.badges.map((b) => {
      return `- **${b.title}**: [Verify Credential](${b.url})`;
    }),
    '',
    '## Technical Articles & Blog Posts',
    ...data.blogPosts.map((post) => {
      const excerpt = post.excerpt ? `: ${post.excerpt}` : '';
      return `- [${post.title}](${post.href}) (${post.date || 'Article'})${excerpt}`;
    }),
    '',
    '## Verified Online Profiles & Contact',
    `- Portfolio Website: ${baseUrl}`,
    `- Interactive OS Simulation: ${baseUrl}/?mode=os`,
    `- Technical Blog: ${profile.blogUrl}`,
    `- Curriculum Vitae: ${baseUrl}${profile.resumePdf}`,
    `- PGP Armored Public Key: ${profile.publicKeyUrl}`,
    ...profile.contacts.map((c) => `- ${c.label}: [${c.detail}](${c.href})`),
    '',
    '## Extended Context & Full Specifications',
    `- [Full Portfolio Deep Dive](${baseUrl}/llms-full.txt): Complete technical specification with all 21 certifications, in-depth project descriptions, architecture details, and AI FAQ.`,
    `- [XML Sitemap Index](${baseUrl}/sitemap-index.xml): Full sitemap for search crawlers.`,
    `- [Robots Policy](${baseUrl}/robots.txt): Crawler and agent permission directives.`,
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
