export type Language = 'en' | 'es' | 'fr' | 'de' | 'hi';
export type ThemeMode = 'light' | 'dark';
export type FontSize = 'normal' | 'large' | 'extralarge';
export type UserRole = 'jobseeker' | 'recruiter';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  title: string;
  location: string;
  avatar: string;
  bio: string;
  phone?: string;
  website?: string;
  skills: string[];
  experienceYears: number;
  readinessScore: number; // 0-100
  savedJobIds: string[];
  appliedJobIds: string[];
  preferredLocation: string;
  desiredSalary: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  isRemote: boolean;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Hybrid' | 'Internship';
  category: string;
  salaryMin: number;
  salaryMax: number;
  salaryPeriod: 'year' | 'month' | 'hour';
  postedDate: string;
  description: string;
  requirements: string[];
  matchScore: number; // AI match score %
  skillGaps: string[];
  urgent?: boolean;
  featured?: boolean;
  applicantsCount: number;
  experienceLevel: 'Entry-Level' | 'Mid-Level' | 'Senior' | 'Executive';
}

export interface ResumeSectionExperience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  highlights: string[];
}

export interface ResumeSectionEducation {
  id: string;
  institution: string;
  degree: string;
  field: string;
  year: string;
}

export interface Resume {
  id: string;
  title: string;
  targetRole: string;
  updatedAt: string;
  score: number;
  summary: string;
  skills: string[];
  experiences: ResumeSectionExperience[];
  education: ResumeSectionEducation[];
  aiSuggestions: string[];
  template: 'modern' | 'minimal' | 'executive' | 'tech';
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  hourlyRate: string;
  availability: string;
  bio: string;
  sessionsCompleted: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'application' | 'match' | 'mentor' | 'system' | 'interview';
  read: boolean;
  link?: string;
}

export interface EmploymentStat {
  region: string;
  unemploymentRate: number; // e.g. 3.8
  underemploymentRate: number; // e.g. 6.2
  activeJobOpenings: number;
  avgSalaryGrowth: number;
  topSkillsInDemand: { name: string; count: number; growth: string }[];
  hiringTrends: { month: string; openings: number; placements: number }[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  badge: string;
  salaryBoost: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
