import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projectItemSchema = z.object({
  order: z.number().optional(),
  name: z.string(),
  category: z.string(),
  type: z.string().optional(),
  categorySubtitle: z.string().optional(),
  date: z.string(),
  description: z.string(),
  demo: z.string().nullable().optional(),
  github: z.string().nullable().optional(),
  tags: z.array(z.string()).optional(),
  downloads: z.string().optional(),
  linkLabel: z.string().optional(),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.union([
    projectItemSchema,
    z.object({
      projects: z.array(projectItemSchema).optional(),
      items: z.array(projectItemSchema).optional(),
    }),
  ]),
});

const experienceItemSchema = z.object({
  order: z.number().optional(),
  company: z.string(),
  role: z.string().optional(),
  title: z.string().optional(),
  period: z.string(),
  desc: z.string().optional(),
  description: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  skills: z.array(z.string()).optional(),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: z.union([
    experienceItemSchema,
    z.object({
      experiences: z.array(experienceItemSchema).optional(),
      experience: z.array(experienceItemSchema).optional(),
      items: z.array(experienceItemSchema).optional(),
    }),
  ]),
});

const educationItemSchema = z.object({
  order: z.number().optional(),
  period: z.string(),
  institution: z.string(),
  institutionUrl: z.string().nullable().optional(),
  degree: z.string(),
  url: z.string().nullable().optional(),
  detail: z.string().optional(),
  pdfUrl: z.string().optional(),
  pdfText: z.string().optional(),
});

const education = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/education' }),
  schema: z.union([
    educationItemSchema,
    z.object({
      education: z.array(educationItemSchema).optional(),
      items: z.array(educationItemSchema).optional(),
    }),
  ]),
});

const certificationItemSchema = z.object({
  order: z.number().optional(),
  name: z.string(),
  issuer: z.string(),
  issuerUrl: z.string().optional(),
  date: z.string(),
  url: z.string(),
});

const certifications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/certifications' }),
  schema: z.union([
    certificationItemSchema,
    z.object({
      certifications: z.array(certificationItemSchema).optional(),
      items: z.array(certificationItemSchema).optional(),
    }),
  ]),
});

const badgeItemSchema = z.object({
  order: z.number().optional(),
  name: z.string(),
  title: z.string(),
  url: z.string(),
  img: z.string(),
  row: z.number().optional(),
});

const badges = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/badges' }),
  schema: z.union([
    badgeItemSchema,
    z.object({
      badges: z.array(badgeItemSchema).optional(),
      items: z.array(badgeItemSchema).optional(),
    }),
  ]),
});


const achievementItemSchema = z.object({
  order: z.number().optional(),
  title: z.string(),
  issuer: z.string(),
  issuerUrl: z.string().optional(),
  associatedWith: z.string().optional(),
  associatedWithUrl: z.string().optional(),
  date: z.string(),
  description: z.string(),
  details: z.array(z.string()).optional(),
  certificateUrl: z.string().optional(),
  linkText: z.string().optional(),
});

const achievements = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/achievements' }),
  schema: z.union([
    achievementItemSchema,
    z.object({
      achievements: z.array(achievementItemSchema).optional(),
      items: z.array(achievementItemSchema).optional(),
    }),
  ]),
});

const volunteeringItemSchema = z.object({
  order: z.number().optional(),
  role: z.string(),
  organization: z.string(),
  field: z.string().optional(),
  period: z.string(),
  description: z.string(),
  url: z.string().nullable().optional(),
  linkText: z.string().optional(),
});

const volunteering = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/volunteering' }),
  schema: z.union([
    volunteeringItemSchema,
    z.object({
      volunteering: z.array(volunteeringItemSchema).optional(),
      items: z.array(volunteeringItemSchema).optional(),
    }),
  ]),
});

const blogPostItemSchema = z.object({
  order: z.number().optional(),
  title: z.string(),
  href: z.string(),
  featured: z.boolean().optional(),
  date: z.string().optional(),
  excerpt: z.string().optional(),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.union([
    blogPostItemSchema,
    z.object({
      blogPosts: z.array(blogPostItemSchema).optional(),
      blog: z.array(blogPostItemSchema).optional(),
      posts: z.array(blogPostItemSchema).optional(),
      items: z.array(blogPostItemSchema).optional(),
    }),
  ]),
});

const profile = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/profile' }),
  schema: z.object({
    name: z.string(),
    legalName: z.string().optional(),
    alternateNames: z.array(z.string()).optional(),
    headline: z.string(),
    role: z.string(),
    location: z.string(),
    bio: z.string(),
    quote: z.string(),
    resumePdf: z.string(),
    resumeName: z.string(),
    blogUrl: z.string(),
    donateUrl: z.string(),
    publicKeyUrl: z.string(),
    contacts: z.array(
      z.object({
        label: z.string(),
        detail: z.string(),
        href: z.string(),
        actionLabel: z.string(),
      })
    ),
    donations: z.array(
      z.object({
        platform: z.string(),
        detail: z.string().optional(),
        href: z.string(),
        actionLabel: z.string().optional(),
      })
    ).optional(),
  }),
});

const explorerFileItemSchema = z.object({
  order: z.number().optional(),
  id: z.string(),
  folderId: z.string(),
  folderName: z.string(),
  name: z.string(),
  type: z.string(),
  date: z.string(),
  size: z.string(),
  details: z.string(),
  tech: z.array(z.string()).optional(),
  img: z.string().optional(),
});

const explorer = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/explorer' }),
  schema: z.union([
    explorerFileItemSchema,
    z.object({
      explorerFiles: z.array(explorerFileItemSchema).optional(),
      files: z.array(explorerFileItemSchema).optional(),
      items: z.array(explorerFileItemSchema).optional(),
    }),
  ]),
});

const trackItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  duration: z.union([z.string(), z.number()]),
  url: z.string().optional(),
  uri: z.string().optional(),
  img: z.string().optional(),
});

const albumItemSchema = z.object({
  order: z.number().optional(),
  id: z.string(),
  type: z.enum(['album', 'single']),
  title: z.string(),
  author: z.string(),
  year: z.string(),
  genre: z.string(),
  img: z.string(),
  tracks: z.array(trackItemSchema),
  details: z.string().optional(),
  uri: z.string().optional(),
});

const mixtapes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/mixtapes' }),
  schema: z.union([
    albumItemSchema,
    z.object({
      mixtapes: z.array(albumItemSchema).optional(),
      albums: z.array(albumItemSchema).optional(),
      items: z.array(albumItemSchema).optional(),
    }),
  ]),
});

const wallpaperItemSchema = z.object({
  order: z.number().optional(),
  id: z.string(),
  label: z.string(),
  description: z.string(),
  backgroundColor: z.string(),
  colors: z.array(z.string()),
  sourceUrl: z.string(),
  path: z.string().optional(),
  backgroundImage: z.string().optional(),
});

const wallpapers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/wallpapers' }),
  schema: z.union([
    wallpaperItemSchema,
    z.object({
      wallpapers: z.array(wallpaperItemSchema).optional(),
      items: z.array(wallpaperItemSchema).optional(),
    }),
  ]),
});

export const collections = {
  projects,
  experience,
  education,
  certifications,
  badges,
  achievements,
  volunteering,
  blog,
  profile,
  explorer,
  mixtapes,
  wallpapers,
};
