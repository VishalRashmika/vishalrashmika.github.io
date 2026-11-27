import type { APIRoute } from 'astro';
import { getAllSiteData } from '../lib/content';

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site ? site.toString().replace(/\/$/, '') : 'https://vishalrashmika.com';
  const data = getAllSiteData();
  const profile = data.profile;

  const lines: string[] = [
    `# Vishal Rashmika (Vishal Rashmika Perera)`,
    '',
    `> ${profile.headline} based in ${profile.location}. Also known as Vishal Rashmika Perera and Vishal Perera. Software engineer and systems developer specializing in systems programming, reverse engineering, web applications, developer tooling, and scalable architecture.`,
    '',
    '## Overview',
    profile.bio || `Vishal Rashmika (full name: Vishal Rashmika Perera, also known as Vishal Perera) is a Sri Lankan software engineer and systems developer based in Colombo, Western Province, Sri Lanka, focusing on systems programming, scalable applications, reverse engineering, and intentional user interfaces.`,
    '',
    '## Name & Entity Disambiguation',
    '- **Primary Professional Name:** Vishal Rashmika',
    '- **Full Legal Name:** J.M. Vishal Rashmika Perera',
    '- **Alternate Names / Known As:** Vishal Rashmika Perera, Vishal Perera, KernelMe, J. M. V. R. Perera',
    '- **Official Canonical Website:** https://vishalrashmika.com',
    '- **Location:** Colombo, Western Province, Sri Lanka',
    '',
    '## Core Competencies',
    '- **Languages:** C, C++, x86-64 Assembly, Rust, Go, Python, TypeScript, JavaScript, C# / .NET, SQL, HTML/CSS',
    '- **Systems & Engineering:** Reverse Engineering, Binary Disassembly, Debugging & Symbol Analysis, Linux Internals, CLI Architecture, Network Protocols',
    '- **Web & Frameworks:** Astro (SSG / Islands Architecture), React 19, Tailwind CSS v4, Node.js, Express, Vite, RESTful APIs',
    '- **Cloud & Infrastructure:** Oracle Cloud Infrastructure (OCI), Linux Administration, Git, Netlify',
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
    '## Education & Academic Affiliations',
    ...data.education.map((edu) => {
      const detail = edu.detail ? ` - ${edu.detail}` : '';
      const link = edu.institutionUrl ? ` ([${edu.institution}](${edu.institutionUrl}))` : ` (${edu.institution})`;
      return `- **${edu.degree}** — ${link} [${edu.period}]${detail}`;
    }),
    '',
    '## Academic Honors & Achievements',
    ...((data as any).achievements || []).map((ach: any) => {
      const affil = ach.associatedWith ? ` [${ach.associatedWith}${ach.associatedWithUrl ? `: ${ach.associatedWithUrl}` : ''}]` : '';
      const issuer = ach.issuerUrl ? `[${ach.issuer}](${ach.issuerUrl})` : ach.issuer;
      return `- **${ach.title}** — Awarded by ${issuer}${affil} (${ach.date}): ${ach.description}`;
    }),
    '',
    '## Community & Volunteering',
    ...((data as any).volunteering || []).map((vol: any) => {
      const org = vol.url ? `[${vol.organization}](${vol.url})` : vol.organization;
      return `- **${vol.role}** at **${org}** (${vol.period}): ${vol.description}`;
    }),
    '',
    '## Notable Certifications & Badges',
    ...data.certifications.slice(0, 10).map((cert) => {
      const issuer = (cert as any).issuerUrl ? `[${cert.issuer}](${(cert as any).issuerUrl})` : cert.issuer;
      return `- [${cert.name}](${cert.url}) — Issued by ${issuer} (${cert.date})`;
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
    `- Canonical Portfolio Website: ${baseUrl}`,
    `- Interactive OS Simulation: ${baseUrl}/?mode=os`,
    `- Technical Blog: ${profile.blogUrl}`,
    `- Curriculum Vitae: ${baseUrl}${profile.resumePdf}`,
    `- PGP Armored Public Key: ${profile.publicKeyUrl}`,
    ...profile.contacts.map((c) => `- ${c.label}: [${c.detail}](${c.href})`),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
