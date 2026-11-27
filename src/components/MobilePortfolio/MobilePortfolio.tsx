import React, { useEffect, useMemo } from 'react';
import { Monitor } from 'lucide-react';
import '../../styles/MobilePortfolio.css';
import type { SiteData, ExperienceItem, BlogPostItem, ProfileContact, DonationItem } from '../../lib/content';

interface MobilePortfolioProps {
  data?: SiteData;
  onSwitchToOS?: () => void;
}

const formatDate = (date?: string | null): string => {
  if (!date || date === '-' || date === '—') return '—';
  return date.replace(/^\[|\]$/g, '').trim();
};

const DEFAULT_PROJECTS = [
  {
    order: 1,
    name: 'Office Suite',
    type: 'Personal',
    category: 'Personal Projects',
    tags: ['TypeScript', 'Obsidian', 'Productivity', 'WYSIWYG', 'Open Source'],
    date: '2026',
    description: 'All-in-one productivity plugin for Obsidian enabling native WYSIWYG viewing and editing of Word (.docx), Excel (.xlsx), PowerPoint (.pptx), CSV/TSV spreadsheets, and PDF annotations directly inside notes with zero external dependencies.',
    downloads: '5,500+',
    demo: 'https://github.com/VishalRashmika/office-suite',
    linkLabel: 'GitHub Repo >>'
  },
  {
    order: 2,
    name: 'Canvas++',
    type: 'Personal',
    category: 'Personal Projects',
    tags: ['TypeScript', 'Obsidian', 'JSON Canvas', 'UML', 'Whiteboard'],
    date: '2026',
    description: 'Extensible, high-performance visual diagramming canvas for Obsidian. Features instant shape auto-detection, natural whiteboard drawing, structured tables, collapsible groups, and full UML 2.x software architecture modeling with JSON Canvas compatibility.',
    downloads: '240+',
    demo: 'https://github.com/VishalRashmika/canvas-plus-plus',
    linkLabel: 'GitHub Repo >>'
  },
  {
    order: 3,
    name: 'agyq',
    type: 'Personal',
    category: 'Personal Projects',
    tags: ['Go', 'CLI', 'Systems', 'Autonomous Agents', 'Automation'],
    date: '2026',
    description: 'Sequential, crash-safe prompt queue runner and headless daemon for the Antigravity CLI (agy), engineered with Git checkpoint recovery, quota rate-limit auto-pausing, deferred failure retries, and zero external dependencies.',
    downloads: '—',
    demo: 'https://github.com/VishalRashmika/agyq',
    linkLabel: 'GitHub Repo >>'
  },
  {
    order: 4,
    name: 'LangDetect.Net',
    type: 'Personal',
    category: 'Personal Projects',
    tags: ['.NET', 'C#', 'NLP', 'Algorithms'],
    date: '2026',
    description: 'A lightweight, self-contained .NET package for text-based language detection supporting 12 languages. Uses three algorithmic strategies to improve accuracy and has 280+ NuGet downloads.',
    downloads: '280+',
    demo: 'https://www.nuget.org/packages/LangDetect.Net',
    linkLabel: 'NuGet Package >>'
  },
  {
    order: 5,
    name: 'WyrdLang',
    type: 'Personal',
    category: 'Personal Projects',
    tags: ['Compilers', 'C++', 'Java', 'Systems'],
    date: '2026',
    description: 'A custom programming language with fantasy-inspired keywords. Built with a custom-made interpreter in C++ and paired with WyrdPad, a lightweight IDE written in Java.',
    downloads: '—',
    demo: null
  },
  {
    order: 6,
    name: 'SinSo API',
    type: 'Personal',
    category: 'Personal Projects',
    tags: ['REST API', 'Backend', 'Node.js', 'Open Source'],
    date: '2025',
    description: 'The largest open source Sinhala lyrics API, offering access to 10,000+ song lyrics through a RESTful API with a community submission portal.',
    downloads: '—',
    demo: 'https://sinso-portal.vishalrashmika.com',
    linkLabel: 'SinSo Portal >>'
  },
  {
    order: 7,
    name: 'Blossom Theme',
    type: 'Personal',
    category: 'Personal Projects',
    tags: ['UI/UX Design', 'Themes', 'Blender', 'Styling'],
    date: '2023',
    description: 'A software color theme inspired by Japan’s vibrant urban aesthetics. Co-founded the organization and contributed to multiple variants.',
    downloads: '2,300+',
    demo: 'https://blossomtheme.github.io/',
    linkLabel: 'Blossom Theme >>'
  },
  {
    order: 8,
    name: 'PopQuest',
    type: 'Personal',
    category: 'Personal Projects',
    tags: ['Web App', 'JavaScript', 'Frontend', 'Interactive'],
    date: '—',
    description: 'An interactive web application built as a polished, playful public experience.',
    downloads: '—',
    demo: 'https://popquest.github.io/',
    linkLabel: 'PopQuest >>'
  },
  {
    order: 9,
    name: 'Life Via Lens',
    type: 'Personal',
    category: 'Personal Projects',
    tags: ['Photography', 'Media', 'Visual Storytelling', 'Arts'],
    date: '—',
    description: 'A photography and visual storytelling project focused on framing everyday moments with a cinematic eye.',
    downloads: '—',
    demo: null
  },
  {
    order: 10,
    name: 'Nyxia',
    type: 'University',
    category: 'University Projects',
    tags: ['Mobile App', 'Flutter', 'Dart', 'Astrophotography'],
    date: '2026',
    description: 'An astrophotography planning app for better nights under the stars. Built in Flutter with weather insights, celestial tracking, calculators, and event management.',
    downloads: '—',
    demo: null
  },
  {
    order: 11,
    name: 'Rejuvenation Clinic',
    type: 'Client',
    category: 'Client Projects',
    tags: ['Web', 'Healthcare', 'Client Solution', 'UI Design'],
    date: '—',
    description: 'Medical clinic website for Rejuvenation Clinic, built as a clean public-facing brand and service presence.',
    downloads: '—',
    demo: 'https://rejuvenationclinic.lk',
    linkLabel: 'Rejuvenation Clinic >>'
  }
];

const DEFAULT_EDUCATION = [
  {
    order: 1,
    period: 'October, 2024 – 2028',
    institution: 'University of Central Lancashire',
    institutionUrl: 'https://www.lancashire.ac.uk/',
    degree: 'BSc (Hons) Software Engineering',
    url: 'https://www.lancashire.ac.uk/',
    detail: 'BSc (Hons) Software Engineering'
  },
  {
    order: 2,
    period: 'July, 2023 – July, 2024',
    institution: 'Universal College Lanka',
    institutionUrl: 'https://ucl.lk/',
    degree: 'UCL International Foundation Year (UIFY)',
    url: 'https://ucl.lk/programs/ucl-international-foundation-year/',
    detail: 'UCL International Foundation Year'
  },
  {
    order: 3,
    period: 'April, 2014 – July, 2023',
    institution: 'St. John Paul II College, Wennappuwa, Sri Lanka',
    institutionUrl: null,
    degree: 'Secondary Education (GCSE ordinary level)',
    url: null,
    detail: 'Secondary Education'
  },
  {
    order: 4,
    period: 'December, 2019 – September, 2020',
    institution: 'ESOFT',
    institutionUrl: 'https://esoft.lk/',
    degree: 'Level 3 diploma in technology (DITEC)',
    url: 'https://esoft.lk/esoft-courses/level-3-diploma-in-information-technology-2025/',
    detail: 'Level 3 diploma in technology (DITEC)',
    pdfUrl: '/DiTec.pdf',
    pdfText: 'View Diploma PDF'
  },
  {
    order: 5,
    period: 'January, 2011 – May, 2014',
    institution: 'St. James International School, Wennappuwa, Sri Lanka',
    institutionUrl: null,
    degree: 'Primary Education',
    url: null,
    detail: 'Primary Education'
  }
];

const DEFAULT_ACHIEVEMENTS = [
  {
    order: 1,
    title: "Dean's List 2026–2027 & 10% Academic Excellence Scholarship",
    issuer: 'Universal College Lanka (UCL)',
    issuerUrl: 'https://ucl.lk/',
    associatedWith: 'University of Central Lancashire',
    associatedWithUrl: 'https://www.lancashire.ac.uk/',
    date: 'Oct 2026',
    description: 'Recognised for outstanding academic performance during Year 2 of the BSc (Hons) Software Engineering degree programme, awarded by the University of Central Lancashire and delivered at Universal College Lanka (UCL). Named to Dean\'s List (Top 10 in class) and awarded a 10% tuition scholarship.',
    certificateUrl: '/DeansList.jpg',
    linkText: 'View Certificate >>'
  },
  {
    order: 2,
    title: 'UCL International Foundation Year Merit Scholarship',
    issuer: 'Universal College Lanka (UCL)',
    issuerUrl: 'https://ucl.lk/',
    associatedWith: 'University of Central Lancashire',
    associatedWithUrl: 'https://www.lancashire.ac.uk/',
    date: 'Jan 2025',
    description: 'Awarded a 10% merit scholarship on tuition fees in recognition of excellent academic achievement during the UCL International Foundation Year examinations in April 2024 to support progression into BSc (Hons) Software Engineering.',
    certificateUrl: '/MeritScholarship.jpg',
    linkText: 'View Certificate >>'
  }
];

const DEFAULT_VOLUNTEERING = [
  {
    order: 1,
    role: 'Associate Member',
    organization: 'The Radio Society of Sri Lanka',
    field: 'Science and Technology',
    period: 'Oct 2026 – Present',
    description: 'Associate Member of the Radio Society of Sri Lanka (RSSL), dedicated to promoting amateur radio, radio communications, and technical knowledge across RF technologies, HF communications, Morse code (CW), operating techniques, antenna systems, and wireless communications.',
    url: 'https://rssl.lk',
    linkText: 'RSSL Website >>'
  },
  {
    order: 2,
    role: 'Digital Transcription Volunteer',
    organization: 'Smithsonian Institution',
    field: 'Arts and Culture',
    period: 'Feb 2023 – Present',
    description: 'Contributing to digital transcription, historical archives preservation, and scientific records indexing to expand global public access across the Smithsonian Institution Archives.',
    url: 'https://transcription.si.edu',
    linkText: 'Smithsonian Transcription >>'
  }
];

const DEFAULT_DOWNLOADS = [
  {
    order: 1,
    name: 'Blossom Blender Theme',
    downloads: '2,300+',
    desc: 'Blender Theme Extension',
    link: 'https://extensions.blender.org/themes/blossom-theme/',
    linkText: 'Blender Extensions >>',
    icon: '🌸'
  },
  {
    order: 2,
    name: 'LangDetect.Net',
    downloads: '280+',
    desc: 'Language Detection Library (.NET)',
    link: 'https://www.nuget.org/packages/LangDetect.Net',
    linkText: 'NuGet Gallery >>',
    icon: '📦'
  }
];

const DEFAULT_BADGES = [
  {
    order: 1,
    name: 'OCI',
    title: 'Oracle Cloud Infrastructure badge',
    url: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=CD85047A266BFDD5355A385B4EDDA1055C0A2EBA284B808E831E4F66D4882AFC',
    img: '/oci.png'
  },
  {
    order: 2,
    name: 'Cybersec Compliance',
    title: 'Cybersecurity Compliance badge',
    url: 'https://www.credly.com/badges/6d1b5eb5-5424-449d-849e-73d93e499b21/public_url',
    img: '/cybersec-compliance.png'
  },
  {
    order: 3,
    name: 'Pentesting',
    title: 'Penetration Testing badge',
    url: 'https://www.credly.com/badges/42f87a4e-910e-45b8-9f4d-da3e934152ab/public_url',
    img: '/pentesting.png'
  },
  {
    order: 4,
    name: 'Intro to Cybersec',
    title: 'Intro to Cybersecurity badge',
    url: 'https://www.credly.com/badges/697440ab-581e-4b61-9af0-e6f70b7a0485/public_url',
    img: '/intro-to-cybersec.png'
  },
  {
    order: 5,
    name: 'LFEL1002',
    title: 'LFEL 1002 badge',
    url: 'https://www.credly.com/badges/586cb87e-504a-4ee0-a234-3d2f9ede582b/public_urlss',
    img: '/lfel-1002.png',
    row: 1
  },
  {
    order: 6,
    name: 'AWS GenAI',
    title: 'AWS Educate Introduction to Generative AI - Training Badge',
    url: 'https://www.credly.com/badges/468c4362-365f-43ce-8e56-503e3b123cb7/public_url',
    img: '/aws-educate-introduction-to-generative-ai.png',
    row: 2
  },
  {
    order: 7,
    name: 'AI Skills Fest',
    title: 'AI Skills Fest 2026',
    url: 'https://www.credly.com/badges/f642319f-c5ae-4008-85f1-d921395e5f05/public_url',
    img: '/ai-skills-fest-2026.png',
    row: 2
  }
];

const DEFAULT_CERTIFICATIONS = [
  {
    name: 'NASA International Space Apps Challenge 2026',
    issuer: 'NASA Space Apps Challenge',
    issuerUrl: 'https://www.spaceappschallenge.org/',
    date: '2026',
    url: '/NASASpaceApps-2026.jpg'
  },
  {
    name: "DevDash'26 Inaugural Hackathon - Certificate of Participation",
    issuer: 'DevDash',
    issuerUrl: 'https://ucl.lk/',
    date: '2026',
    url: '/devdash2026.jpg'
  },
  {
    name: 'LFEL1002: Getting Started with Rust',
    issuer: 'The Linux Foundation',
    issuerUrl: 'https://www.linuxfoundation.org/',
    date: '2024',
    url: 'https://trainingportal.linuxfoundation.org/learn/certificates/getting-started-with-rust-lfel1002?id=c0926af9-5118-44de-9375-2044853067aa'
  },
  {
    name: 'Advanced Learning Algorithms',
    issuer: 'DeepLearning.AI',
    issuerUrl: 'https://www.deeplearning.ai/',
    date: '2024',
    url: 'https://coursera.org/share/e38ff1e359cd20001a949f7e9baefde8'
  },
  {
    name: 'Linux For Developers',
    issuer: 'The Linux Foundation',
    issuerUrl: 'https://www.linuxfoundation.org/',
    date: '2024',
    url: 'https://coursera.org/verify/XQVFDJLAUZPQ'
  },
  {
    name: 'AI/ML Engineer - Stage 1',
    issuer: 'SLIIT',
    issuerUrl: 'https://www.sliit.lk/',
    date: '2024',
    url: 'https://code.sliit.org/certificates/fuyex8cgdu'
  },
  {
    name: 'Open Source Software Development Methods',
    issuer: 'The Linux Foundation',
    issuerUrl: 'https://www.linuxfoundation.org/',
    date: '2024',
    url: 'https://coursera.org/share/4a66565cf0325131533bb3d3f0d78437'
  },
  {
    name: 'Supervised Machine Learning: Regression and Classification',
    issuer: 'DeepLearning.AI',
    issuerUrl: 'https://www.deeplearning.ai/',
    date: '2024',
    url: 'https://coursera.org/verify/PA3Z2UNXPZ7W/'
  },
  {
    name: 'CS50P',
    issuer: 'CS50',
    issuerUrl: 'https://cs50.harvard.edu/',
    date: '2023',
    url: 'https://cs50.harvard.edu/certificates/4bbc4f6a-7e94-47cb-9acb-bae4689f60fa'
  },
  {
    name: 'CS50x',
    issuer: 'CS50',
    issuerUrl: 'https://cs50.harvard.edu/',
    date: '2023',
    url: 'https://certificates.cs50.io/f2ca3ee3-1b32-4e3f-8f43-0154c6043ea6.pdf?size=letter'
  },
  {
    name: 'Introduction to Cybersecurity Tools & Cyber Attacks',
    issuer: 'IBM',
    issuerUrl: 'https://www.ibm.com/',
    date: '2024',
    url: 'https://www.coursera.org/verify/5G6TXRN8PK6N'
  },
  {
    name: 'Penetration Testing, Incident Response and Forensics',
    issuer: 'IBM',
    issuerUrl: 'https://www.ibm.com/',
    date: '2024',
    url: 'https://coursera.org/share/8e92b515c8080bcb1a50f2f1907dd5c5'
  },
  {
    name: 'Cybersecurity Compliance Framework & System Administration',
    issuer: 'IBM',
    issuerUrl: 'https://www.ibm.com/',
    date: '2024',
    url: 'https://coursera.org/share/9daeecd4f6cc886b752866b77fb403c4'
  },
  {
    name: 'Advent of Cyber 2021',
    issuer: 'Try Hack Me',
    issuerUrl: 'https://tryhackme.com/',
    date: '2021',
    url: 'https://i.imgur.com/vBCNWR9.png'
  },
  {
    name: 'Advent of Cyber 2022',
    issuer: 'Try Hack Me',
    issuerUrl: 'https://tryhackme.com/',
    date: '2022',
    url: 'https://i.imgur.com/PhY0dBU.png'
  },
  {
    name: 'Python For Beginners',
    issuer: 'University Of Moratuwa',
    issuerUrl: 'https://uom.lk/',
    date: '2023',
    url: '/umo-python-for-beginners.pdf'
  },
  {
    name: 'Web Design For Beginners',
    issuer: 'University Of Moratuwa',
    issuerUrl: 'https://uom.lk/',
    date: '2023',
    url: '/umo-web-design-for-beginners.pdf'
  },
  {
    name: 'HTML',
    issuer: 'Sololearn',
    issuerUrl: 'https://www.sololearn.com/',
    date: '2023',
    url: 'https://www.sololearn.com/Certificate/1014-24690347/jpg/'
  },
  {
    name: 'Oracle Cloud Infrastructure Foundations 2021 Certified Associate',
    issuer: 'Oracle University',
    issuerUrl: 'https://education.oracle.com/',
    date: '2021',
    url: '/oracle-certificate.pdf'
  },
  {
    name: 'Ethical Hacking For Beginners',
    issuer: 'Udemy',
    issuerUrl: 'https://www.udemy.com/',
    date: '2023',
    url: 'https://udemy-certificate.s3.amazonaws.com/pdf/UC-ae1fc27f-77fb-4593-80aa-01682523fce2.pdf'
  },
  {
    name: 'Linux Fundamentals',
    issuer: 'Coursera',
    issuerUrl: 'https://www.coursera.org/',
    date: '2023',
    url: 'https://coursera.org/share/20551d9bdc2e40943396dce48dac026e'
  },
  {
    name: 'JavaScript',
    issuer: 'Sololearn',
    issuerUrl: 'https://www.sololearn.com/',
    date: '2023',
    url: 'https://www.sololearn.com/Certificate/CT-7UBLMJEN/pdf'
  },
  {
    name: 'Algorithmic Toolbox',
    issuer: 'University of California San Diego',
    issuerUrl: 'https://ucsd.edu/',
    date: '2023',
    url: 'https://coursera.org/share/27bc3ace6f3757c8ea618482bae5095e'
  }
];

const DEFAULT_EXPERIENCES: ExperienceItem[] = [
  {
    order: 1,
    company: 'OlyraLabs',
    role: 'Co-Founder & Tech Lead',
    title: 'Co-Founder & Tech Lead',
    period: 'FEB 2026 – PRESENT',
    description: 'Co-founded a four-person startup and serving as the Tech Lead, orchestrating development, technical architecture, and Agile lifecycle management for client projects.',
    desc: 'Co-founded a four-person startup and serving as the Tech Lead, orchestrating development, technical architecture, and Agile lifecycle management for client projects.',
    highlights: [
      'Serve as Tech Lead and Scrum Master for a 4-person startup team, leading Agile development practices including sprint planning, daily standups, and retrospectives.',
      'Work in systems design building scalable system solutions for digital products, defining core technical architecture and technology stack decisions.',
      'Lead full-stack development with emphasis on frontend engineering, designing and integrating web applications to deliver comprehensive digital solutions for clients.',
      'Oversee project lifecycle management from requirements gathering to deployment, ensuring timely delivery of client solutions while maintaining code quality standards.'
    ],
    skills: ['Agile', 'Scrum', 'Systems Design', 'Full-Stack']
  }
];

const DEFAULT_BLOG_POSTS: BlogPostItem[] = [
  {
    order: 1,
    title: 'Day 1: WyrdLang',
    href: 'https://blog.vishalrashmika.com/blog/day1-wyrdlang/',
    featured: true,
    date: '2024',
    excerpt: 'First steps in building WyrdLang: interpreter architecture and syntax decisions.'
  },
  {
    order: 2,
    title: 'Subroutines',
    href: 'https://blog.vishalrashmika.com/blog/subroutines/',
    featured: true,
    date: '2024',
    excerpt: 'Deep dive into subroutine handling, call frames, and memory layout.'
  },
  {
    order: 3,
    title: 'Debugging and Symbol Files',
    href: 'https://blog.vishalrashmika.com/blog/debugging-and-symbol-files/',
    featured: true,
    date: '2024',
    excerpt: 'Understanding how debuggers interact with symbol tables and binary metadata.'
  },
  {
    order: 4,
    title: 'Paper - HackTheBox Writeup',
    href: 'https://blog.vishalrashmika.com/posts/paper/',
    featured: false,
    date: '2023',
    excerpt: 'Walkthrough of solving the Paper box on HackTheBox.'
  },
  {
    order: 5,
    title: 'Dissecting a Simple x86-64 bit Assembly Hello World Program',
    href: 'https://blog.vishalrashmika.com/posts/breaking-down-asm-helloworld/',
    featured: false,
    date: '2023',
    excerpt: 'Line-by-line disassembly and explanation of system calls in x86-64 assembly.'
  },
  {
    order: 6,
    title: 'Bounty Hunter - TryHackMe Writeup',
    href: 'https://blog.vishalrashmika.com/posts/bounty-hunter/',
    featured: false,
    date: '2022',
    excerpt: 'Detailed walkthrough and exploitation breakdown of the Bounty Hunter room.'
  }
];

const DEFAULT_CONTACTS: ProfileContact[] = [
  {
    label: 'Email (Primary)',
    detail: 'vishal@vishalrashmika.com',
    href: 'mailto:vishal@vishalrashmika.com',
    actionLabel: 'Send mail'
  },
  {
    label: 'Email (Personal)',
    detail: 'vishal.rashmika.perera@gmail.com',
    href: 'mailto:vishal.rashmika.perera@gmail.com',
    actionLabel: 'Send mail'
  },
  {
    label: 'Email (Direct)',
    detail: 'me@vishalrashmika.com',
    href: 'mailto:me@vishalrashmika.com',
    actionLabel: 'Send mail'
  },
  {
    label: 'Email (Inquiries)',
    detail: 'hi@vishalrashmika.com',
    href: 'mailto:hi@vishalrashmika.com',
    actionLabel: 'Send mail'
  },
  {
    label: 'Public Key',
    detail: 'Open the armored PGP key or download the asc file.',
    href: '/public_key.asc',
    actionLabel: 'View key'
  },
  {
    label: 'LinkedIn',
    detail: 'Professional updates and work history.',
    href: 'https://www.linkedin.com/in/vishalrashmika/',
    actionLabel: 'Open profile'
  },
  {
    label: 'GitHub',
    detail: 'Code, experiments, and project work.',
    href: 'https://github.com/VishalRashmika',
    actionLabel: 'Open profile'
  },
  {
    label: 'Instagram',
    detail: 'Personal updates and visual posts.',
    href: 'https://www.instagram.com/j.m.v.r.p/',
    actionLabel: 'Open profile'
  },
  {
    label: 'X (Twitter)',
    detail: 'Short updates, tech insights, and thoughts.',
    href: 'https://x.com/Vishal_Rashmika',
    actionLabel: 'Open profile'
  },
  {
    label: 'YouTube',
    detail: 'Tech demonstrations, tutorials, and project showcases.',
    href: 'https://www.youtube.com/@VishalRashmika',
    actionLabel: 'Watch on YouTube'
  },
  {
    label: 'Behance',
    detail: 'Selected design work and visuals.',
    href: 'https://behance.net/vishalrashmika',
    actionLabel: 'Open profile'
  },
  {
    label: 'Medium',
    detail: 'Long-form writing and posts.',
    href: 'https://medium.com/@VishalRashmika',
    actionLabel: 'Open profile'
  }
];

const DEFAULT_DONATIONS: DonationItem[] = [
  {
    platform: 'Buy Me a Coffee',
    detail: 'Support ongoing open-source projects, reverse engineering writeups, and technical research.',
    href: 'https://www.buymeacoffee.com/vishalrashmika/',
    actionLabel: 'Donate'
  }
];

export const MobilePortfolio: React.FC<MobilePortfolioProps> = ({ 
  data, 
  onSwitchToOS = () => {
    if (typeof window !== 'undefined') {
      window.location.href = 'https://os.vishalrashmika.com';
    }
  } 
}) => {
  const profile = data?.profile;
  const experiences = data?.experiences;
  const projects = data?.projects;
  const education = data?.education;
  const downloads = data?.downloads;
  const achievements = (data as any)?.achievements;
  const volunteering = (data as any)?.volunteering;
  const certifications = data?.certifications;
  const badges = data?.badges;
  const blogPosts = data?.blogPosts;

  const activeExperiences =
    experiences && experiences.length > 0 ? experiences : DEFAULT_EXPERIENCES;
  const activeBlogPosts =
    blogPosts && blogPosts.length > 0 ? blogPosts : DEFAULT_BLOG_POSTS;
  const activeProjects =
    projects && projects.length > 0 ? projects : DEFAULT_PROJECTS;
  const activeEducation =
    education && education.length > 0 ? education : DEFAULT_EDUCATION;
  const activeDownloads =
    downloads && downloads.length > 0 ? downloads : DEFAULT_DOWNLOADS;
  const activeAchievements =
    achievements && achievements.length > 0 ? achievements : DEFAULT_ACHIEVEMENTS;
  const activeVolunteering =
    volunteering && volunteering.length > 0 ? volunteering : DEFAULT_VOLUNTEERING;
  const activeBadges =
    badges && badges.length > 0 ? badges : DEFAULT_BADGES;
  const activeCertifications =
    certifications && certifications.length > 0 ? certifications : DEFAULT_CERTIFICATIONS;
  const activeContacts =
    profile?.contacts && profile.contacts.length > 0
      ? profile.contacts.filter((contact) => contact.label.toLowerCase() !== 'donate')
      : DEFAULT_CONTACTS;
  const activeDonations: DonationItem[] = useMemo(() => {
    if (profile?.donations && profile.donations.length > 0) {
      return profile.donations;
    }

    const donateContacts = profile?.contacts?.filter(
      (contact) =>
        contact.label.toLowerCase().includes('donate') ||
        contact.label.toLowerCase().includes('coffee') ||
        contact.label.toLowerCase().includes('sponsor')
    );

    if (donateContacts && donateContacts.length > 0) {
      return donateContacts.map((c) => ({
        platform: c.label === 'Donate' ? 'Buy Me a Coffee' : c.label,
        detail: c.detail || 'Support ongoing open-source projects, reverse engineering writeups, and technical research.',
        href: c.href || profile?.donateUrl || 'https://www.buymeacoffee.com/vishalrashmika/',
        actionLabel: c.actionLabel || 'Donate'
      }));
    }

    return DEFAULT_DONATIONS;
  }, [profile?.donations, profile?.contacts, profile?.donateUrl]);

  useEffect(() => {
    // Add mobile-mode class to enable full scrolling and disable desktop OS styles
    document.documentElement.classList.add('mobile-mode');
    document.body.classList.add('mobile-mode');

    // IntersectionObserver scroll handler to highlight the active section in Table of Contents
    const scrollHandler: IntersectionObserverCallback = (entries) => {
      const intersectingEntries = entries.filter((e) => e.isIntersecting && e.target.id);
      if (intersectingEntries.length === 0) return;

      const entry = intersectingEntries.sort(
        (a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top)
      )[0];

      const targetId = entry.target.id;
      if (targetId) {
        document.querySelectorAll('.mobile-portfolio-container .toc a').forEach((item) => {
          item.classList.remove('active');
        });

        const link = document.querySelector(
          `.mobile-portfolio-container .toc a[href$="#${CSS.escape(targetId)}"]`
        );
        if (link) {
          link.classList.add('active');
          const tocSticky = document.querySelector<HTMLElement>('.mobile-portfolio-container .toc-sticky');
          if (tocSticky) {
            const linkElem = link as HTMLElement;
            const linkTop = linkElem.offsetTop;
            const linkBottom = linkTop + linkElem.offsetHeight;
            if (linkTop < tocSticky.scrollTop) {
              tocSticky.scrollTop = linkTop;
            } else if (linkBottom > tocSticky.scrollTop + tocSticky.clientHeight) {
              tocSticky.scrollTop = linkBottom - tocSticky.clientHeight;
            }
          }
        }
      }
    };

    const observer = new IntersectionObserver(scrollHandler, {
      rootMargin: '0px 0px -60% 0px',
      threshold: 0
    });
    const items = document.querySelectorAll(
      '.mobile-portfolio-container h1[id], .mobile-portfolio-container h2[id]'
    );
    items.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleExploreMore = () => {
    const target = document.getElementById('about') || document.getElementById('features');
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="mobile-portfolio-container">
      <div className="os-mode-switch-wrapper">
        <a
          href="https://os.vishalrashmika.com"
          onClick={(e) => {
            if (onSwitchToOS) {
              e.preventDefault();
              onSwitchToOS();
            }
          }}
          className="os-mode-btn"
          title="Switch to Interactive OS Mode"
          aria-label="Switch to Interactive OS Mode"
        >
          <Monitor size={16} className="btn-icon" />
          <span className="os-mode-text-long">Interactive Mode</span>
          <span className="os-mode-text-short">OS Mode</span>
        </a>
      </div>

      <header className="pos-absolute" style={{ backgroundColor: 'transparent' }}>
        <a href="#about" aria-label="Vishal Rashmika Portfolio Home">
          <div className="logo">
            <img src="/homepage-logo.png" alt="Vishal Rashmika - Software Engineer Logo" />
          </div>
        </a>
      </header>

      <div className="hero">
        <section className="text-center">
          <h1 className="heading-text" style={{ fontSize: '50px', borderLeft: 'none', paddingLeft: 0 }}>
            {profile?.name || 'Vishal Rashmika'}
          </h1>
          <p className="title-text" style={{ borderLeft: 'none', paddingLeft: 0, margin: '8px 0 0 0', fontSize: '20px' }}>
            {profile?.headline || 'Software Engineer & Systems Developer'}
          </p>
        </section>

        <img
          className="hero-image"
          style={{ width: '35%', height: '100%' }}
          src="/me.png"
          alt={`${profile?.name || 'Vishal Rashmika'} - Software Engineer and Systems Developer`}
        />

        <div className="explore-more text" onClick={handleExploreMore}>
          Explore More ⇩
        </div>
      </div>

      <main>
        <div className="toc">
          <div className="toc-sticky">
            <div className="toc-item">
              <a className="subtext" href="#about">About</a>
            </div>
            <div className="toc-item">
              <a className="subtext" href="#experience">Experience</a>
            </div>
            <div className="toc-item">
              <a className="subtext" href="#projects">Projects</a>
            </div>
            <div className="toc-item">
              <a className="subtext" href="#education">Education</a>
            </div>
            <div className="toc-item">
              <a className="subtext" href="#achievements">Achievements</a>
            </div>
            <div className="toc-item">
              <a className="subtext" href="#certifications">Certifications</a>
            </div>
            <div className="toc-item">
              <a className="subtext" href="#badges">Badges</a>
            </div>
            <div className="toc-item">
              <a className="subtext" href="#volunteering">Volunteering</a>
            </div>
            <div className="toc-item">
              <a className="subtext" href="#blog">Blog</a>
            </div>
            <div className="toc-item">
              <a className="subtext" href="#contact-me">Contact Me</a>
            </div>
            <div className="toc-item">
              <a className="subtext" href="#donate">Donate</a>
            </div>
          </div>
        </div>

        <div className="content text">
          <div id="features" className="heading-text"></div>

          <h2 id="about">About Vishal Rashmika</h2>
          <p>
            {profile?.bio || `Vishal Rashmika is a Software Engineer and Systems Developer based in Sri Lanka, specializing in systems programming, reverse engineering, cybersecurity, and scalable web architecture.`}
          </p>
          <blockquote>
            <p>
              <a href={profile?.resumePdf || "/VishalRashmika-CV.pdf"} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', fontWeight: 600 }}>
                Download Resume↓
              </a>
            </p>
          </blockquote>
          <hr />

          <h2 id="experience">Experience &amp; Leadership</h2>
          <p>
            Professional background, engineering leadership, and systems architecture roles delivering real-world products and scalable software solutions.
          </p>
          <div className="experience-list">
            {activeExperiences.map((exp, idx) => (
              <article key={idx} className="experience-card">
                <div className="experience-card-header">
                  <div className="experience-title-company">
                    <h3 className="experience-title">{exp.title || exp.role}</h3>
                    <div className="experience-company">{exp.company}</div>
                  </div>
                  <div className="experience-period">{exp.period}</div>
                </div>
                {(exp.description || exp.desc) && (
                  <p className="experience-desc">{exp.description || exp.desc}</p>
                )}
                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="experience-highlights">
                    {exp.highlights.map((h, hIdx) => (
                      <li key={hIdx}>{h}</li>
                    ))}
                  </ul>
                )}
                {exp.skills && exp.skills.length > 0 && (
                  <div className="experience-skills">
                    <span className="experience-skills-label">Skills:</span>
                    <div className="project-tags-container">
                      {exp.skills.map((s, sIdx) => (
                        <span key={sIdx} className="project-tag">{s}</span>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
          <hr />

          <h2 id="projects">Featured Software Projects</h2>
          <p>
            Innovative solutions crafted with passion. Explore selected projects across personal builds, university research, and client solutions.
          </p>

          <div className="portfolio-table-wrapper">
            <table className="portfolio-table">
              <thead>
                <tr>
                  <th scope="col" style={{ width: '18%' }}>Project</th>
                  <th scope="col" style={{ width: '10%' }}>Type</th>
                  <th scope="col" style={{ width: '22%' }}>Tags / Stream</th>
                  <th scope="col" style={{ width: '9%' }}>Date</th>
                  <th scope="col">Description</th>
                  <th scope="col" style={{ width: '11%' }}>Downloads</th>
                  <th scope="col" style={{ width: '14%' }}>Link</th>
                </tr>
              </thead>
              <tbody>
                {activeProjects.map((p, pIdx) => (
                  <tr key={pIdx}>
                    <td className="col-name">
                      {p.demo ? (
                        <a
                          href={p.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="table-item-link"
                        >
                          {p.name}
                        </a>
                      ) : (
                        <span>{p.name}</span>
                      )}
                    </td>
                    <td className="col-type">
                      <span className="project-type-badge">
                        {p.type || p.category?.replace(' Projects', '') || 'Personal'}
                      </span>
                    </td>
                    <td className="col-tags">
                      {p.tags && p.tags.length > 0 ? (
                        <div className="project-tags-container">
                          {p.tags.map((tag, tIdx) => (
                            <span key={tIdx} className="project-tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="table-empty">—</span>
                      )}
                    </td>
                    <td className="col-date">{formatDate(p.date)}</td>
                    <td className="col-desc">{p.description}</td>
                    <td className="col-downloads">
                      {p.downloads && p.downloads !== '-' ? p.downloads : '—'}
                    </td>
                    <td className="col-link">
                      {p.demo ? (
                        <a
                          href={p.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="table-link"
                        >
                          {p.linkLabel || 'Demo >>'}
                        </a>
                      ) : (
                        <span className="table-empty">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <hr />

          <h2 id="education">Education &amp; Qualifications</h2>
          <p>
            Academic background, formal qualifications, and professional technology training.
          </p>
          <div className="portfolio-table-wrapper">
            <table className="portfolio-table">
              <thead>
                <tr>
                  <th scope="col" style={{ width: '22%' }}>Period</th>
                  <th scope="col" style={{ width: '28%' }}>Institution</th>
                  <th scope="col" style={{ width: '35%' }}>Degree / Qualification</th>
                  <th scope="col" style={{ width: '15%' }}>Details</th>
                </tr>
              </thead>
              <tbody>
                {activeEducation.map((edu, eduIdx) => (
                  <tr key={eduIdx}>
                    <td className="col-date">
                      {formatDate(edu.period.replace(/\s*:\s*$/, ''))}
                    </td>
                    <td className="col-name">
                      {edu.institutionUrl ? (
                        <a
                          href={edu.institutionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="table-item-link"
                        >
                          {edu.institution}
                        </a>
                      ) : (
                        <span>{edu.institution}</span>
                      )}
                    </td>
                    <td className="col-desc">
                      {edu.url ? (
                        <a
                          href={edu.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="table-item-link"
                        >
                          {edu.degree}
                        </a>
                      ) : (
                        <span>{edu.degree}</span>
                      )}
                    </td>
                    <td className="col-link">
                      {edu.pdfUrl ? (
                        <a
                          href={edu.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="table-link"
                        >
                          {edu.pdfText || 'Diploma PDF >>'}
                        </a>
                      ) : edu.url ? (
                        <a
                          href={edu.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="table-link"
                        >
                          Course Info &gt;&gt;
                        </a>
                      ) : (
                        <span className="table-empty">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <hr />

          <h2 id="achievements">Academic Honors &amp; Achievements</h2>
          <p>
            Distinguished academic honors, dean's list recognitions, and merit scholarships awarded for outstanding excellence in software engineering and foundation studies.
          </p>
          <div className="portfolio-table-wrapper">
            <table className="portfolio-table">
              <thead>
                <tr>
                  <th scope="col" style={{ width: '38%' }}>Honor / Achievement</th>
                  <th scope="col" style={{ width: '28%' }}>Issuer &amp; Affiliation</th>
                  <th scope="col" style={{ width: '14%' }}>Date</th>
                  <th scope="col" style={{ width: '20%' }}>Certificate</th>
                </tr>
              </thead>
              <tbody>
                {activeAchievements.map((ach, achIdx) => (
                  <tr key={achIdx}>
                    <td className="col-name">
                      <span>{ach.title}</span>
                      {ach.description && (
                        <div style={{ fontSize: '12px', marginTop: '4px', opacity: 0.85, fontWeight: 'normal', lineHeight: 1.4 }}>
                          {ach.description}
                        </div>
                      )}
                    </td>
                    <td className="col-issuer">
                      <div>
                        {(ach as any).issuerUrl ? (
                          <a
                            href={(ach as any).issuerUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="table-item-link"
                          >
                            {ach.issuer}
                          </a>
                        ) : (
                          ach.issuer
                        )}
                      </div>
                      {ach.associatedWith && (
                        <div style={{ fontSize: '12px', opacity: 0.75 }}>
                          {(ach as any).associatedWithUrl ? (
                            <a
                              href={(ach as any).associatedWithUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="table-item-link"
                              style={{ opacity: 0.9 }}
                            >
                              {ach.associatedWith}
                            </a>
                          ) : (
                            ach.associatedWith
                          )}
                        </div>
                      )}
                    </td>
                    <td className="col-date">{ach.date}</td>
                    <td className="col-link">
                      {ach.certificateUrl ? (
                        <a
                          href={ach.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="table-link"
                        >
                          {ach.linkText || 'View Certificate >>'}
                        </a>
                      ) : (
                        <span className="table-empty">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <hr />

          <h2 id="certifications">Certifications &amp; Credentials</h2>
          <p>
            Verified technical credentials and professional certifications earned across software engineering, systems, cybersecurity, and machine learning.
          </p>
          <div className="portfolio-table-wrapper">
            <table className="portfolio-table">
              <thead>
                <tr>
                  <th scope="col" style={{ width: '38%' }}>Certification</th>
                  <th scope="col" style={{ width: '28%' }}>Issuer</th>
                  <th scope="col" style={{ width: '14%' }}>Date</th>
                  <th scope="col" style={{ width: '20%' }}>Credential</th>
                </tr>
              </thead>
              <tbody>
                {activeCertifications.map((cert, cIdx) => (
                  <tr key={cIdx}>
                    <td className="col-name">
                      {cert.url ? (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="table-item-link"
                        >
                          {cert.name}
                        </a>
                      ) : (
                        <span>{cert.name}</span>
                      )}
                    </td>
                    <td className="col-issuer">
                      {(cert as any).issuerUrl ? (
                        <a
                          href={(cert as any).issuerUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="table-item-link"
                        >
                          {cert.issuer}
                        </a>
                      ) : (
                        cert.issuer
                      )}
                    </td>
                    <td className="col-date">{formatDate(cert.date)}</td>
                    <td className="col-action">
                      {cert.url ? (
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="table-link"
                        >
                          Verify &gt;&gt;
                        </a>
                      ) : (
                        <span className="table-empty">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <hr />

          <h2 id="badges">Verified Technical Badges</h2>
          <p>
            Digital verifiable credentials earned across cybersecurity, cloud infrastructure, and systems administration.
          </p>
          <div className="portfolio-badge-grid-wrapper">
            <div className="portfolio-badge-grid">
              {activeBadges
                .filter((b) => (b as any).row === 1 || !((b as any).row) && (b.order || 0) <= 5)
                .map((b, bIdx) => (
                  <a
                    key={bIdx}
                    href={b.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portfolio-badge-cell"
                    title={b.title || b.name}
                  >
                    <div className="portfolio-badge-img-wrapper">
                      <img src={b.img} alt={b.title || b.name} className="portfolio-badge-img" />
                    </div>
                    <div className="portfolio-badge-info">
                      <span className="portfolio-badge-name">{b.name}</span>
                      <span className="table-link" style={{ fontSize: '12px', marginTop: '4px' }}>
                        Verify &gt;&gt;
                      </span>
                    </div>
                  </a>
                ))}
            </div>

            {activeBadges.some((b) => (b as any).row === 2 || (b.order || 0) > 5) && (
              <div className="portfolio-badge-grid portfolio-badge-grid-row2">
                {activeBadges
                  .filter((b) => (b as any).row === 2 || (b.order || 0) > 5)
                  .map((b, bIdx) => (
                    <a
                      key={bIdx}
                      href={b.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="portfolio-badge-cell"
                      title={b.title || b.name}
                    >
                      <div className="portfolio-badge-img-wrapper">
                        <img src={b.img} alt={b.title || b.name} className="portfolio-badge-img" />
                      </div>
                      <div className="portfolio-badge-info">
                        <span className="portfolio-badge-name">{b.name}</span>
                        <span className="table-link" style={{ fontSize: '12px', marginTop: '4px' }}>
                          Verify &gt;&gt;
                        </span>
                      </div>
                    </a>
                  ))}
              </div>
            )}
          </div>
          <hr />

          <h2 id="volunteering">Volunteering &amp; Community</h2>
          <p>
            Contributions to technical societies, amateur radio exploration, and public historical archives transcription.
          </p>
          <div className="portfolio-table-wrapper">
            <table className="portfolio-table">
              <thead>
                <tr>
                  <th scope="col" style={{ width: '22%' }}>Role / Position</th>
                  <th scope="col" style={{ width: '28%' }}>Organization &amp; Field</th>
                  <th scope="col" style={{ width: '16%' }}>Period</th>
                  <th scope="col" style={{ width: '34%' }}>Involvement &amp; Impact</th>
                </tr>
              </thead>
              <tbody>
                {activeVolunteering.map((v, vIdx) => (
                  <tr key={vIdx}>
                    <td className="col-name">{v.role}</td>
                    <td className="col-desc">
                      <div>
                        {v.url ? (
                          <a href={v.url} target="_blank" rel="noopener noreferrer" className="table-item-link">
                            {v.organization}
                          </a>
                        ) : (
                          <span>{v.organization}</span>
                        )}
                      </div>
                      {v.field && (
                        <div style={{ fontSize: '12px', opacity: 0.75 }}>
                          {v.field}
                        </div>
                      )}
                    </td>
                    <td className="col-date">{v.period}</td>
                    <td className="col-desc">
                      <div>{v.description}</div>
                      {v.url && (
                        <div style={{ marginTop: '4px' }}>
                          <a href={v.url} target="_blank" rel="noopener noreferrer" className="table-link" style={{ fontSize: '12px' }}>
                            {v.linkText || 'Learn More >>'}
                          </a>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <hr />

          <h2 id="blog">Technical Blog &amp; Writeups</h2>
          <p>
            Technical articles, reverse engineering notes, low-level architecture breakdowns, and security writeups.
          </p>
          <div className="portfolio-table-wrapper">
            <table className="portfolio-table">
              <thead>
                <tr>
                  <th scope="col" style={{ width: '32%' }}>Post / Article</th>
                  <th scope="col" style={{ width: '10%' }}>Date</th>
                  <th scope="col">Summary / Excerpt</th>
                  <th scope="col" style={{ width: '14%' }}>Link</th>
                </tr>
              </thead>
              <tbody>
                {activeBlogPosts.map((post, pIdx) => (
                  <tr key={pIdx}>
                    <td className="col-name">
                      <a
                        href={post.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="table-item-link"
                      >
                        {post.title}
                      </a>
                      {post.featured && (
                        <span className="project-type-badge" style={{ marginLeft: '8px' }}>
                          Featured
                        </span>
                      )}
                    </td>
                    <td className="col-date">{post.date || '—'}</td>
                    <td className="col-desc">{post.excerpt || '—'}</td>
                    <td className="col-link">
                      <a
                        href={post.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="table-link"
                      >
                        Read Post &gt;&gt;
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            <a href={profile?.blogUrl || "https://blog.vishalrashmika.com"} target="_blank" rel="noopener noreferrer">
              <code>Visit my Blog &gt;&gt;</code>
            </a>
          </p>
          <hr />

          <h2 id="contact-me">Contact Vishal Rashmika</h2>
          <p>
            Get in touch for collaborations, inquiries, or security disclosures across verified communication channels.
          </p>
          <div className="portfolio-table-wrapper">
            <table className="portfolio-table">
              <thead>
                <tr>
                  <th scope="col" style={{ width: '22%' }}>Channel</th>
                  <th scope="col">Details</th>
                  <th scope="col" style={{ width: '20%' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {activeContacts.map((contact, cIdx) => {
                  const isMail = contact.href.startsWith('mailto:');
                  const actionText = contact.actionLabel
                    ? (contact.actionLabel.includes('>>') ? contact.actionLabel : `${contact.actionLabel} >>`)
                    : (isMail ? 'Send mail >>' : 'Open link >>');
                  return (
                    <tr key={cIdx}>
                      <td className="col-name">
                        <a
                          href={contact.href}
                          {...(isMail ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                          className="table-item-link"
                        >
                          {contact.label}
                        </a>
                      </td>
                      <td className="col-desc">{contact.detail || '—'}</td>
                      <td className="col-link">
                        <a
                          href={contact.href}
                          {...(isMail ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                          className="table-link"
                        >
                          {actionText}
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <hr />

          <h2 id="donate">Support &amp; Open Source Sponsorship</h2>
          <p>
            Support ongoing engineering research, open-source utilities, and technical writeups.
          </p>
          <div className="portfolio-table-wrapper">
            <table className="portfolio-table">
              <thead>
                <tr>
                  <th scope="col" style={{ width: '22%' }}>Platform</th>
                  <th scope="col">Details</th>
                  <th scope="col" style={{ width: '20%' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {activeDonations.map((item, dIdx) => {
                  const actionText = item.actionLabel
                    ? (item.actionLabel.includes('>>') ? item.actionLabel : `${item.actionLabel} >>`)
                    : 'Donate >>';
                  return (
                    <tr key={dIdx}>
                      <td className="col-name">
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="table-item-link"
                        >
                          {item.platform}
                        </a>
                      </td>
                      <td className="col-desc">{item.detail || '—'}</td>
                      <td className="col-link">
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="table-link"
                        >
                          {actionText}
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p>
            <a href={profile?.donateUrl || "https://www.buymeacoffee.com/vishalrashmika/"} target="_blank" rel="noopener noreferrer">
              <img
                src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png"
                alt="Buy Me A Coffee"
                style={{ width: 'auto', maxWidth: '210px' }}
              />
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default MobilePortfolio;
