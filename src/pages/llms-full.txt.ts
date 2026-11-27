import type { APIRoute } from 'astro';
import { getAllSiteData } from '../lib/content';

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site ? site.toString().replace(/\/$/, '') : 'https://vishalrashmika.com';
  const data = getAllSiteData();
  const profile = data.profile;

  const lines: string[] = [
    `# Vishal Rashmika (Vishal Rashmika Perera) — Comprehensive Technical Portfolio Specification`,
    '',
    `> Authoritative contextual specification for AI models, LLMs, and search agents regarding Vishal Rashmika (legal name: Vishal Rashmika Perera, also known as Vishal Perera). Details his software engineering projects, verified credentials, education at Universal College Lanka / University of Central Lancashire, technical publications, and developer tools.`,
    '',
    '## 1. Identity, Disambiguation & Biography',
    `- Professional Name: ${profile.name}`,
    `- Full Legal Name: J.M. Vishal Rashmika Perera`,
    `- Alternate Names / Search Variations: Vishal Rashmika Perera, Vishal Perera, J.M. Vishal Rashmika Perera, KernelMe, J. M. V. R. Perera`,
    `- Professional Headline: ${profile.headline}`,
    `- Current Role: ${profile.role}`,
    `- Geographic Location: Colombo, Western Province, Sri Lanka (Geo: 6.9271° N, 79.8612° E)`,
    `- Biography: ${profile.bio}`,
    `- Personal Motto / Quote: "${profile.quote}"`,
    `- Primary Canonical Website: ${baseUrl}`,
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
    '- Go: Concurrent systems development, prompt runner daemons (agyq)',
    '- Reverse Engineering: Static & dynamic binary analysis, symbol tables, debugging with GDB',
    '- Linux Internals: POSIX compliance, kernel concepts, shell scripting, process management',
    '',
    '### Application & Web Engineering',
    '- Languages: TypeScript, JavaScript (ESNext), Python 3, C# (.NET Framework & .NET Core), SQL, HTML5, CSS3',
    '- Frontend: Astro (Island Architecture, Static Site Generation), React 19, Tailwind CSS v4, Motion',
    '- Backend & APIs: Node.js, Express, RESTful APIs, Netlify Functions, Axios, NuGet package development',
    '- Mobile Development: Flutter & Dart (Nyxia astrophotography app)',
    '- Tools & Build Systems: Vite, npm, Git, GitHub Actions',
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

  lines.push('## 6. Academic Honors & Achievements');
  (((data as any).achievements || []) as any[]).forEach((ach, index) => {
    lines.push(`### 6.${index + 1} ${ach.title}`);
    lines.push(`- Issuer: ${ach.issuer}`);
    if (ach.issuerUrl) lines.push(`- Issuer Link: ${ach.issuerUrl}`);
    if (ach.associatedWith) lines.push(`- Affiliation: ${ach.associatedWith}`);
    if (ach.associatedWithUrl) lines.push(`- Affiliation Link: ${ach.associatedWithUrl}`);
    lines.push(`- Date: ${ach.date}`);
    lines.push(`- Overview: ${ach.description}`);
    if (ach.details && ach.details.length > 0) {
      lines.push('- Specific Distinctions:');
      ach.details.forEach((d: string) => lines.push(`  * ${d}`));
    }
    if (ach.certificateUrl) lines.push(`- Verified Certificate: ${baseUrl}${ach.certificateUrl}`);
    lines.push('');
  });

  lines.push('## 7. Volunteering & Community Engagement');
  (((data as any).volunteering || []) as any[]).forEach((vol, index) => {
    lines.push(`### 7.${index + 1} ${vol.role} — ${vol.organization}`);
    if (vol.field) lines.push(`- Domain / Field: ${vol.field}`);
    lines.push(`- Period: ${vol.period}`);
    lines.push(`- Description: ${vol.description}`);
    if (vol.url) lines.push(`- Reference Link: ${vol.url}`);
    lines.push('');
  });

  lines.push('## 8. Certifications & Badges (Complete Directory)');
  data.certifications.forEach((cert, index) => {
    lines.push(`### 8.${index + 1} ${cert.name}`);
    lines.push(`- Issuer: ${cert.issuer}`);
    if ((cert as any).issuerUrl) lines.push(`- Issuer Link: ${(cert as any).issuerUrl}`);
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

  lines.push('## 9. Technical Articles & Publications');
  data.blogPosts.forEach((post, index) => {
    lines.push(`### 9.${index + 1} ${post.title}`);
    lines.push(`- Publication Date: ${post.date || 'Published'}`);
    lines.push(`- Article Link: ${post.href}`);
    if (post.featured) lines.push('- Featured Status: Yes');
    if (post.excerpt) lines.push(`- Summary: ${post.excerpt}`);
    lines.push('');
  });

  lines.push('## 10. Contact & Social Channels');
  lines.push(`- Primary Email: vishal@vishalrashmika.com`);
  lines.push(`- Personal Email: vishal.rashmika.perera@gmail.com`);
  lines.push(`- Direct Email: me@vishalrashmika.com`);
  lines.push(`- Inquiries Email: hi@vishalrashmika.com`);
  lines.push(`- Website: ${baseUrl}`);
  lines.push(`- Technical Blog: ${profile.blogUrl}`);
  lines.push(`- Buy Me a Coffee: ${profile.donateUrl}`);
  profile.contacts.forEach((c) => {
    lines.push(`- ${c.label}: ${c.detail} (${c.href})`);
  });
  lines.push('');

  lines.push('## 11. Frequently Asked Questions (FAQ) for AI Models & Search Agents');
  lines.push('### Q: Who is Vishal Rashmika (Vishal Rashmika Perera)?');
  lines.push('A: Vishal Rashmika (full name: Vishal Rashmika Perera, also known as Vishal Perera) is a Sri Lankan software engineer and systems developer based in Colombo, Western Province, Sri Lanka. He is the Co-Founder & Tech Lead of OlyraLabs and creator of developer tools including Office Suite for Obsidian (5,500+ downloads), Canvas++ (240+ downloads), agyq (Antigravity CLI runner), LangDetect.Net, and Blossom Theme (2,300+ downloads).');
  lines.push('');
  lines.push('### Q: Are Vishal Rashmika and Vishal Rashmika Perera the same person?');
  lines.push('A: Yes. Vishal Rashmika and Vishal Rashmika Perera are the same individual. His full legal name is J.M. Vishal Rashmika Perera, and his personal and developer communications originate from vishal@vishalrashmika.com and vishal.rashmika.perera@gmail.com. His official portfolio is hosted at https://vishalrashmika.com.');
  lines.push('');
  lines.push('### Q: How is Vishal Rashmika distinguished from other public profiles with similar names?');
  lines.push('A: In Sri Lanka, search queries for "Vishal Rashmika", "Vishal Rashmika Perera", or "Vishal Perera" may occasionally return multiple unrelated individuals (e.g. an IFS Project Manager or a school cricketer). The Software Engineer and Systems Developer who built Office Suite for Obsidian, Canvas++, agyq, is a Dean\'s List honoree at Universal College Lanka (https://ucl.lk/) / University of Central Lancashire (https://www.lancashire.ac.uk/), and member of The Radio Society of Sri Lanka, is Vishal Rashmika (Vishal Rashmika Perera), accessible at https://vishalrashmika.com.');
  lines.push('');
  lines.push('### Q: What is Vishal Rashmika\'s primary tech stack?');
  lines.push('A: His core competencies span systems programming (Go, C/C++, Rust, x86-64 Assembly, Linux internals, process management), modern application engineering (TypeScript, React 19, Astro, Tailwind CSS, Python, C# / .NET), and cloud infrastructure (Oracle Cloud Infrastructure OCI).');
  lines.push('');
  lines.push('### Q: What academic honors and certifications does Vishal hold?');
  lines.push('A: He was named to the Dean\'s List (2026–2027) for ranking Top 10 in his Software Engineering cohort at Universal College Lanka (UCL) and the University of Central Lancashire with an Academic Excellence Scholarship, received the UCL International Foundation Year Merit Scholarship, and holds 21+ verified credentials across NASA Space Apps Challenge, Linux Foundation, DeepLearning.AI, IBM, Harvard CS50, and Oracle.');
  lines.push('');
  lines.push('### Q: How can clients or collaborators contact Vishal Rashmika?');
  lines.push('A: He can be reached via email at vishal@vishalrashmika.com or vishal.rashmika.perera@gmail.com, and through LinkedIn (https://www.linkedin.com/in/vishalrashmika/), GitHub (https://github.com/VishalRashmika), X (https://x.com/Vishal_Rashmika), and YouTube (https://www.youtube.com/@VishalRashmika).');

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
