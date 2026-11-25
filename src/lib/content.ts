// Data Loader for Markdown Content Collections in Astro SSG
// Loads consolidated single markdown files for each content subsection

export interface ProjectItem {
  order: number;
  name: string;
  category: 'Personal Projects' | 'University Projects' | 'Client Projects' | string;
  type?: string;
  categorySubtitle?: string;
  date: string;
  description: string;
  demo?: string | null;
  github?: string | null;
  tags?: string[];
  downloads?: string;
  linkLabel?: string;
  content?: string;
}

export interface ProjectSection {
  title: string;
  subtitle: string;
  rows: Array<{
    name: string;
    type?: string;
    tags?: string[];
    downloads?: string;
    date: string;
    description: string;
    demo: string | null;
    linkLabel?: string;
  }>;
}

export interface ExperienceItem {
  order: number;
  company: string;
  role: string;
  title?: string;
  period: string;
  desc?: string;
  description?: string;
  highlights?: string[];
  skills?: string[];
}

export interface EducationItem {
  order: number;
  period: string;
  institution: string;
  institutionUrl?: string | null;
  degree: string;
  url?: string | null;
  detail?: string;
  pdfUrl?: string;
  pdfText?: string;
}

export interface CertificationItem {
  order: number;
  name: string;
  issuer: string;
  date: string;
  url: string;
}

export interface BadgeItem {
  order: number;
  name: string;
  title: string;
  url: string;
  img: string;
  row?: number;
}

export interface DownloadItem {
  order: number;
  name: string;
  downloads: string;
  desc: string;
  link: string;
  linkText?: string;
  icon?: string;
  badge?: string;
}

export interface AchievementItem {
  order: number;
  title: string;
  issuer: string;
  associatedWith?: string;
  date: string;
  description: string;
  details?: string[];
  certificateUrl?: string;
  linkText?: string;
}

export interface VolunteeringItem {
  order: number;
  role: string;
  organization: string;
  field?: string;
  period: string;
  description: string;
  url?: string | null;
  linkText?: string;
}

export interface BlogPostItem {
  order: number;
  title: string;
  href: string;
  featured: boolean;
  date?: string;
  excerpt?: string;
}

export interface TrackItem {
  id: string;
  title: string;
  duration: string | number;
  url?: string;
  uri?: string;
  img?: string;
}

export interface AlbumItem {
  order: number;
  id: string;
  type: 'album' | 'single';
  title: string;
  author: string;
  year: string;
  genre: string;
  img: string;
  tracks: TrackItem[];
  details?: string;
  uri?: string;
}

export interface ProfileContact {
  label: string;
  detail: string;
  href: string;
  actionLabel: string;
}

export interface DonationItem {
  platform: string;
  detail?: string;
  href: string;
  actionLabel?: string;
}

export interface ProfileData {
  name: string;
  headline: string;
  role: string;
  location: string;
  bio: string;
  quote: string;
  resumePdf: string;
  resumeName: string;
  blogUrl: string;
  donateUrl: string;
  publicKeyUrl: string;
  contacts: ProfileContact[];
  donations?: DonationItem[];
}

export interface ExplorerFileItem {
  order: number;
  id: string;
  folderId: string;
  folderName: string;
  name: string;
  type: string;
  date: string;
  size: string;
  details: string;
  tech?: string[];
  img?: string;
}

export interface WallpaperItem {
  order: number;
  id: string;
  label: string;
  description: string;
  backgroundColor: string;
  colors: string[];
  sourceUrl: string;
  path?: string;
  backgroundImage?: string;
}

// -----------------------------------------------------------------------------
// Markdown Imports via Vite glob
// Loads the single consolidated markdown file from each subsection folder
// -----------------------------------------------------------------------------

const profileModules = import.meta.glob<{ frontmatter: ProfileData }>('/src/content/profile/*.md', { eager: true });
const projectModules = import.meta.glob<{ frontmatter: any }>('/src/content/projects/*.md', { eager: true });
const experienceModules = import.meta.glob<{ frontmatter: any }>('/src/content/experience/*.md', { eager: true });
const educationModules = import.meta.glob<{ frontmatter: any }>('/src/content/education/*.md', { eager: true });
const certModules = import.meta.glob<{ frontmatter: any }>('/src/content/certifications/*.md', { eager: true });
const badgeModules = import.meta.glob<{ frontmatter: any }>('/src/content/badges/*.md', { eager: true });
const achievementModules = import.meta.glob<{ frontmatter: any }>('/src/content/achievements/*.md', { eager: true });
const volunteeringModules = import.meta.glob<{ frontmatter: any }>('/src/content/volunteering/*.md', { eager: true });
const blogModules = import.meta.glob<{ frontmatter: any }>('/src/content/blog/*.md', { eager: true });
const explorerModules = import.meta.glob<{ frontmatter: any }>('/src/content/explorer/*.md', { eager: true });
const mixtapeModules = import.meta.glob<{ frontmatter: any }>('/src/content/mixtapes/*.md', { eager: true });
const wallpaperModules = import.meta.glob<{ frontmatter: any }>('/src/content/wallpapers/*.md', { eager: true });

function extractItems<T>(modules: Record<string, { frontmatter: any }>, keys: string[]): T[] {
  const items: T[] = [];
  for (const mod of Object.values(modules)) {
    const fm = mod?.frontmatter;
    if (!fm) continue;

    let foundArray = false;
    for (const key of keys) {
      if (Array.isArray(fm[key])) {
        items.push(...fm[key]);
        foundArray = true;
        break;
      }
    }

    if (!foundArray) {
      if (Array.isArray(fm)) {
        items.push(...fm);
      } else if (typeof fm === 'object' && Object.keys(fm).length > 0) {
        items.push(fm as T);
      }
    }
  }
  return items;
}

export function getProfile(): ProfileData {
  const list = Object.values(profileModules).map((m) => m.frontmatter);
  if (list.length > 0 && list[0]?.name) {
    const p = list[0];
    return {
      name: p.name,
      headline: p.headline || '',
      role: p.role || 'Student',
      location: p.location || 'Sri Lanka',
      bio: p.bio || '',
      quote: p.quote || '',
      resumePdf: p.resumePdf || '/VishalRashmika-CV.pdf',
      resumeName: p.resumeName || 'VishalRashmika-CV.pdf',
      blogUrl: p.blogUrl || 'https://blog.vishalrashmika.com',
      donateUrl: p.donateUrl || 'https://www.buymeacoffee.com/vishalrashmika/',
      publicKeyUrl: p.publicKeyUrl || '',
      contacts: p.contacts || [],
      donations: p.donations || [
        {
          platform: 'Buy Me a Coffee',
          detail: 'Support ongoing open-source projects, reverse engineering writeups, and technical research.',
          href: p.donateUrl || 'https://www.buymeacoffee.com/vishalrashmika/',
          actionLabel: 'Donate'
        }
      ]
    };
  }

  return {
    name: 'Vishal Rashmika',
    headline: 'Student | Programming | Infosec',
    role: 'Student',
    location: 'Sri Lanka',
    bio: '',
    quote: '',
    resumePdf: '/VishalRashmika-CV.pdf',
    resumeName: 'VishalRashmika-CV.pdf',
    blogUrl: 'https://blog.vishalrashmika.com',
    donateUrl: 'https://www.buymeacoffee.com/vishalrashmika/',
    publicKeyUrl: '',
    contacts: [],
    donations: [
      {
        platform: 'Buy Me a Coffee',
        detail: 'Support ongoing open-source projects, reverse engineering writeups, and technical research.',
        href: 'https://www.buymeacoffee.com/vishalrashmika/',
        actionLabel: 'Donate'
      }
    ]
  };
}

export function getProjects(): ProjectItem[] {
  const items = extractItems<ProjectItem>(projectModules, ['projects', 'items']);
  return items.sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function getProjectSections(): ProjectSection[] {
  const projects = getProjects();
  const categoryMap = new Map<string, { subtitle: string; rows: ProjectSection['rows'] }>();

  projects.forEach((p) => {
    const cat = p.category || 'Other Projects';
    if (!categoryMap.has(cat)) {
      categoryMap.set(cat, {
        subtitle: p.categorySubtitle || '',
        rows: []
      });
    }
    categoryMap.get(cat)!.rows.push({
      name: p.name,
      type: p.type || cat.replace(' Projects', ''),
      tags: p.tags || [],
      downloads: p.downloads || '—',
      date: p.date,
      description: p.description,
      demo: p.demo || null,
      linkLabel: p.linkLabel
    });
  });

  return Array.from(categoryMap.entries()).map(([title, data]) => ({
    title,
    subtitle: data.subtitle,
    rows: data.rows
  }));
}

export function getExperiences(): ExperienceItem[] {
  const items = extractItems<ExperienceItem>(experienceModules, ['experiences', 'experience', 'items']);
  return items.sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function getEducation(): EducationItem[] {
  const items = extractItems<EducationItem>(educationModules, ['education', 'items']);
  return items.sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function getCertifications(): CertificationItem[] {
  const items = extractItems<CertificationItem>(certModules, ['certifications', 'items']);
  return items.sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function getBadges(): BadgeItem[] {
  const items = extractItems<BadgeItem>(badgeModules, ['badges', 'items']);
  return items.sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function getDownloads(): DownloadItem[] {
  return [];
}

export function getAchievements(): AchievementItem[] {
  const items = extractItems<AchievementItem>(achievementModules, ['achievements', 'items']);
  return items.sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function getVolunteering(): VolunteeringItem[] {
  const items = extractItems<VolunteeringItem>(volunteeringModules, ['volunteering', 'items']);
  return items.sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function getBlogPosts(): BlogPostItem[] {
  const items = extractItems<BlogPostItem>(blogModules, ['blogPosts', 'blog', 'posts', 'items']);
  return items.sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function getMixtapes(): AlbumItem[] {
  const items = extractItems<AlbumItem>(mixtapeModules, ['mixtapes', 'albums', 'items']);
  return items.sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function getWallpapers(): WallpaperItem[] {
  const items = extractItems<WallpaperItem>(wallpaperModules, ['wallpapers', 'items']);
  return items.sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function getExplorerFiles(): ExplorerFileItem[] {
  const items = extractItems<ExplorerFileItem>(explorerModules, ['explorerFiles', 'files', 'items']);
  return items.sort((a, b) => (a.order || 0) - (b.order || 0));
}

export function getAllSiteData() {
  return {
    profile: getProfile(),
    projectSections: getProjectSections(),
    projects: getProjects(),
    experiences: getExperiences(),
    education: getEducation(),
    certifications: getCertifications(),
    badges: getBadges(),
    downloads: getDownloads(),
    achievements: getAchievements(),
    volunteering: getVolunteering(),
    blogPosts: getBlogPosts(),
    mixtapes: getMixtapes(),
    explorerFiles: getExplorerFiles(),
    wallpapers: getWallpapers()
  };
}

export type SiteData = ReturnType<typeof getAllSiteData>;
