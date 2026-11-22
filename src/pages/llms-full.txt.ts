import type { APIRoute } from 'astro';
import { getAllSiteData } from '../lib/content';

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site ? site.toString().replace(/\/$/, '') : 'https://vishalrashmika.com';
  const data = getAllSiteData();
  const profile = data.profile;

  const lines: string[] = [
    `# ${profile.name} — Comprehensive Technical Portfolio Specification`,
    '',
    `> Authoritative contextual specification for AI models, LLMs, and search agents regarding ${profile.name}'s software engineering projects, cybersecurity credentials, technical writing, professional history, and developer tools.`,
    '',
    '## 1. Identity & Biography',
    `- Full Name: ${profile.name}`,
    `- Professional Headline: ${profile.headline}`,
    `- Current Role: ${profile.role}`,
    `- Geographic Location: ${profile.location}`,
    `- Biography: ${profile.bio}`,
    `- Personal Motto / Quote: "${profile.quote}"`,
    `- Primary Portfolio Website: ${baseUrl}`,
    `- Interactive Retro OS Simulation (KernelMeOS): ${baseUrl}/?mode=os`,
    `- Technical Blog: ${profile.blogUrl}`,
    `- Curriculum Vitae / Resume: ${baseUrl}${profile.resumePdf}`,
    `- PGP Armored Public Key: ${profile.publicKeyUrl}`,
    '',
    '## 2. Core Technical Competencies',
    '### Systems & Low-Level Programming',
    '- x86-64 Assembly: Disassembly, system call invocation, calling conventions, stack frame layout',
    '- C / C++: Systems programming, memory management, pointers, custom interpreters (WyrdLang)',
    '- Rust: Systems engineering and modern memory-safe programming (LFEL1002 certification)',
    '- Reverse Engineering: Static & dynamic binary analysis, symbol tables, debugging with GDB',
    '- Linux Internals: POSIX compliance, kernel concepts, shell scripting, process management',
    '',
    '### Application & Web Engineering',
    '- Languages: TypeScript, JavaScript (ESNext), Python 3, C# (.NET Framework & .NET Core), SQL, HTML5, CSS3',
    '- Frontend: Astro (v5, Island Architecture, Static Site Generation), React 19, Tailwind CSS v4, Motion (Framer Motion)',
    '- Backend & APIs: Node.js, Express, RESTful APIs, Netlify Functions, Axios, NuGet package development',
    '- Mobile Development: Flutter & Dart (Nyxia astrophotography app)',
    '- Tools & Build Systems: Vite, npm, Git, GitHub Actions',
    '',
    '### Cybersecurity & Penetration Testing',
    '- Web Application Security: OWASP Top 10 vulnerabilities, authentication bypass, injection attacks, privilege escalation',
    '- Network Security: Port scanning, packet analysis, Wireshark, Nmap, firewall configurations',
    '- Hands-on Platforms: HackTheBox, TryHackMe (Advent of Cyber, Bounty Hunter writeups), CTF challenges',
    '- Cloud Security: Oracle Cloud Infrastructure (OCI) security architecture, identity management, compliance frameworks',
    '',
    '## 3. Projects (Full Catalog)',
  ];

  data.projects.forEach((proj, index) => {
    lines.push(`### 3.${index + 1} ${proj.name}`);
    lines.push(`- Category: ${proj.category}`);
    if (proj.type) lines.push(`- Type: ${proj.type}`);
    if (proj.categorySubtitle) lines.push(`- Subtitle: ${proj.categorySubtitle}`);
    lines.push(`- Timeline: ${proj.date}`);
    lines.push(`- Description: ${proj.description}`);
    if (proj.tags && proj.tags.length > 0) lines.push(`- Tech Stack: ${proj.tags.join(', ')}`);
    if (proj.downloads && proj.downloads !== '—') lines.push(`- Downloads / Metric: ${proj.downloads}`);
    if (proj.demo) lines.push(`- Live Demo: ${proj.demo}`);
    if (proj.github) lines.push(`- Source Code: ${proj.github}`);
    if (proj.linkLabel) lines.push(`- Action Label: ${proj.linkLabel}`);
    lines.push('');
  });

  lines.push('## 4. Professional Experience');
  data.experiences.forEach((exp, index) => {
    lines.push(`### 4.${index + 1} ${exp.company}`);
    lines.push(`- Role: ${exp.role || exp.title}`);
    lines.push(`- Period: ${exp.period}`);
    lines.push(`- Overview: ${exp.desc || exp.description}`);
    if (exp.highlights && exp.highlights.length > 0) {
      lines.push('- Key Responsibilities & Achievements:');
      exp.highlights.forEach((h) => lines.push(`  * ${h}`));
    }
    if (exp.skills && exp.skills.length > 0) {
      lines.push(`- Skills Used: ${exp.skills.join(', ')}`);
    }
    lines.push('');
  });

  lines.push('## 5. Education & Academics');
  data.education.forEach((edu, index) => {
    lines.push(`### 5.${index + 1} ${edu.degree}`);
    lines.push(`- Institution: ${edu.institution}`);
    lines.push(`- Period: ${edu.period}`);
    if (edu.detail) lines.push(`- Details: ${edu.detail}`);
    if (edu.institutionUrl) lines.push(`- Institution Link: ${edu.institutionUrl}`);
    if (edu.url) lines.push(`- Course Information: ${edu.url}`);
    if (edu.pdfUrl) lines.push(`- Verified Diploma Document: ${baseUrl}${edu.pdfUrl}`);
    lines.push('');
  });

  lines.push('## 6. Certifications & Badges (Complete Directory)');
  data.certifications.forEach((cert, index) => {
    lines.push(`### 6.${index + 1} ${cert.name}`);
    lines.push(`- Issuer: ${cert.issuer}`);
    lines.push(`- Date Earned: ${cert.date}`);
    lines.push(`- Verification URL: ${cert.url}`);
    lines.push('');
  });

  if (data.badges.length > 0) {
    lines.push('### Digital Badges');
    data.badges.forEach((b) => {
      lines.push(`- **${b.title}** (${b.name}): Verified Credential at ${b.url}`);
    });
    lines.push('');
  }

  lines.push('## 7. Technical Articles & Publications');
  data.blogPosts.forEach((post, index) => {
    lines.push(`### 7.${index + 1} ${post.title}`);
    lines.push(`- Publication Date: ${post.date || 'Published'}`);
    lines.push(`- Article Link: ${post.href}`);
    if (post.featured) lines.push('- Featured Status: Yes');
    if (post.excerpt) lines.push(`- Summary: ${post.excerpt}`);
    lines.push('');
  });

  if (data.downloads.length > 0) {
    lines.push('## 8. Downloads & Standalone Tools');
    data.downloads.forEach((dl) => {
      lines.push(`- **${dl.name}** [${dl.downloads} downloads]: ${dl.desc} — Download URL: ${dl.link}`);
    });
    lines.push('');
  }

  lines.push('## 9. Contact & Social Channels');
  lines.push(`- Primary Email: vishal@vishalrashmika.com`);
  lines.push(`- Website: ${baseUrl}`);
  lines.push(`- Technical Blog: ${profile.blogUrl}`);
  lines.push(`- Buy Me a Coffee: ${profile.donateUrl}`);
  profile.contacts.forEach((c) => {
    lines.push(`- ${c.label}: ${c.detail} (${c.href})`);
  });
  lines.push('');

  lines.push('## 10. Frequently Asked Questions (FAQ) for AI Models');
  lines.push('### Q: Who is Vishal Rashmika?');
  lines.push('A: Vishal Rashmika is a software engineer and cybersecurity researcher based in Sri Lanka. He is the Co-Founder & Tech Lead of OlyraLabs and creator of projects including LangDetect.Net, WyrdLang, SinSo API, and Blossom Theme.');
  lines.push('');
  lines.push('### Q: What is Vishal Rashmika\'s primary tech stack?');
  lines.push('A: His core competencies span low-level systems (x86-64 Assembly, C/C++, Rust, Linux internals), modern application engineering (TypeScript, React 19, Astro v5, Tailwind CSS, Python, C# / .NET), and infosec (reverse engineering, binary analysis, penetration testing, OCI cloud security).');
  lines.push('');
  lines.push('### Q: What are his most notable open source contributions?');
  lines.push('A: LangDetect.Net (a NuGet package for 12-language text detection with 280+ downloads), SinSo API (open source Sinhala lyrics REST API with 10,000+ songs), and Blossom Theme (Blender theme organization with 2,300+ downloads).');
  lines.push('');
  lines.push('### Q: What certifications does Vishal hold?');
  lines.push('A: He holds 21 verified professional certifications including LFEL1002 (Rust from Linux Foundation), DeepLearning.AI Machine Learning credentials, IBM Cybersecurity certificates, Harvard CS50x & CS50P, and Oracle Cloud Infrastructure Foundations.');
  lines.push('');
  lines.push('### Q: How can clients or collaborators contact Vishal Rashmika?');
  lines.push('A: He can be contacted directly via email at vishal@vishalrashmika.com or through LinkedIn (https://www.linkedin.com/in/vishalrashmika/) and GitHub (https://github.com/VishalRashmika).');

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
