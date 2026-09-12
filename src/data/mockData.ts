import { Job, Resume, Mentor, NotificationItem, EmploymentStat, Testimonial, FAQItem, UserProfile } from '../types';

export const mockCurrentUser: UserProfile = {
  id: 'usr_001',
  name: 'Sarah Vance',
  email: 'sarah.vance@worknext.ai',
  role: 'jobseeker',
  title: 'Senior Software Engineer',
  location: 'Chicago, IL',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  bio: 'Passionate engineer specializing in modern web applications, AI integrations, and cloud architecture.',
  phone: '+1 (555) 234-5678',
  website: 'https://sarahvance.dev',
  skills: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Python', 'Next.js', 'PostgreSQL', 'REST APIs', 'Git'],
  experienceYears: 3,
  readinessScore: 88,
  savedJobIds: ['job_1', 'job_3', 'job_6'],
  appliedJobIds: ['job_2', 'job_5'],
  preferredLocation: 'Chicago, IL or Remote',
  desiredSalary: '$95,000 - $125,000 / yr'
};

export const mockJobs: Job[] = [
  {
    id: 'job_1',
    title: 'Senior Frontend Developer',
    company: 'Apex Solutions Tech',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=120',
    location: 'Chicago, IL',
    isRemote: true,
    type: 'Full-time',
    category: 'Software Engineering',
    salaryMin: 110000,
    salaryMax: 140000,
    salaryPeriod: 'year',
    postedDate: '2 hours ago',
    description: 'We are seeking a high-performing Senior Frontend Engineer to build intuitive, accessible web interfaces powered by Gemini AI API endpoints.',
    requirements: [
      '3+ years React / Next.js experience',
      'Strong TypeScript skills',
      'Tailwind CSS mastery',
      'Experience with state management and API integration'
    ],
    matchScore: 94,
    skillGaps: ['GraphQL'],
    urgent: true,
    featured: true,
    applicantsCount: 18,
    experienceLevel: 'Senior'
  },
  {
    id: 'job_2',
    title: 'AI Product Specialist',
    company: 'Cognitive Dynamics',
    companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=120',
    location: 'Austin, TX',
    isRemote: true,
    type: 'Full-time',
    category: 'AI & Data Science',
    salaryMin: 95000,
    salaryMax: 125000,
    salaryPeriod: 'year',
    postedDate: '1 day ago',
    description: 'Help enterprise clients adopt AI tools to upskill teams and streamline workforce operations.',
    requirements: [
      '2+ years product or technical client-facing role',
      'Understanding of LLM capabilities and prompt engineering',
      'Excellent communication and project management skills'
    ],
    matchScore: 89,
    skillGaps: ['Prompt Engineering Certification'],
    featured: true,
    applicantsCount: 42,
    experienceLevel: 'Mid-Level'
  },
  {
    id: 'job_3',
    title: 'Junior Web Developer (Upskill Program)',
    company: 'Metropolis Career Hub',
    companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&q=80&w=120',
    location: 'Chicago, IL',
    isRemote: false,
    type: 'Full-time',
    category: 'Software Engineering',
    salaryMin: 65000,
    salaryMax: 80000,
    salaryPeriod: 'year',
    postedDate: '3 days ago',
    description: 'Includes 3 months of paid AI-driven mentorship alongside real production project work.',
    requirements: [
      'HTML, CSS, JavaScript basics',
      'Eagerness to learn React and modern workflows',
      'High adaptability and problem solving mindset'
    ],
    matchScore: 96,
    skillGaps: [],
    urgent: false,
    featured: false,
    applicantsCount: 89,
    experienceLevel: 'Entry-Level'
  },
  {
    id: 'job_4',
    title: 'UX/UI Designer & Accessibility Champion',
    company: 'InclusiTech',
    companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=120',
    location: 'Remote',
    isRemote: true,
    type: 'Contract',
    category: 'Design & UX',
    salaryMin: 55,
    salaryMax: 85,
    salaryPeriod: 'hour',
    postedDate: '4 days ago',
    description: 'Redesigning public sector employment portals for WCAG 2.1 AA accessibility and seamless user navigation.',
    requirements: [
      'Figma expertise',
      'Design systems experience',
      'Accessibility audit experience (screen readers, contrast, keyboard nav)'
    ],
    matchScore: 82,
    skillGaps: ['Figma Design Tokens', 'WCAG Audit certification'],
    urgent: true,
    featured: true,
    applicantsCount: 31,
    experienceLevel: 'Mid-Level'
  },
  {
    id: 'job_5',
    title: 'Data Analyst & Employment Market Researcher',
    company: 'Workforce Insights Lab',
    companyLogo: 'https://images.unsplash.com/photo-1542744094-3a3172720177?auto=format&fit=crop&q=80&w=120',
    location: 'Chicago, IL',
    isRemote: true,
    type: 'Full-time',
    category: 'Data Science',
    salaryMin: 80000,
    salaryMax: 105000,
    salaryPeriod: 'year',
    postedDate: '5 days ago',
    description: 'Analyze real-time regional labor dynamics to predict skill shortages and help cities deploy workforce grants.',
    requirements: [
      'SQL, Python (Pandas/NumPy), Tableau or PowerBI',
      'Background in economics or labor analytics preferred'
    ],
    matchScore: 78,
    skillGaps: ['PowerBI Advanced', 'Econometrics'],
    urgent: false,
    featured: false,
    applicantsCount: 24,
    experienceLevel: 'Mid-Level'
  },
  {
    id: 'job_6',
    title: 'Talent Acquisition Partner (Tech & AI)',
    company: 'FutureWork Recruitment',
    companyLogo: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=120',
    location: 'Chicago, IL',
    isRemote: true,
    type: 'Full-time',
    category: 'Human Resources',
    salaryMin: 85000,
    salaryMax: 110000,
    salaryPeriod: 'year',
    postedDate: '1 week ago',
    description: 'Connect non-traditional talent and bootcamp graduates with high-growth tech firms using WorkNext match scoring.',
    requirements: [
      '3+ years full-cycle tech recruiting',
      'Focus on diversity, equity, and skill-based hiring'
    ],
    matchScore: 71,
    skillGaps: ['Recruitment Analytics', 'ATS Integrations'],
    urgent: false,
    featured: false,
    applicantsCount: 15,
    experienceLevel: 'Senior'
  }
];

export const mockResumes: Resume[] = [
  {
    id: 'res_01',
    title: 'Full Stack Engineering Resume',
    targetRole: 'Senior Frontend / Full Stack Developer',
    updatedAt: 'Yesterday, 4:20 PM',
    score: 88,
    summary: 'Results-driven developer with 3+ years in web development, specializing in modern React ecosystems, responsive UI performance, and AI-assisted application workflows.',
    skills: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Next.js', 'REST APIs', 'Git', 'Agile'],
    experiences: [
      {
        id: 'exp_1',
        company: 'Innovate Tech Labs',
        role: 'Frontend Developer',
        startDate: 'Jan 2023',
        endDate: 'Present',
        current: true,
        highlights: [
          'Engineered 12+ responsive web components reducing page load time by 35%.',
          'Collaborated with UX teams to implement accessibility standards across 4 core user flows.',
          'Integrated RESTful endpoints for real-time dashboard state updates.'
        ]
      },
      {
        id: 'exp_2',
        company: 'Digital Wave Media',
        role: 'Junior Web Developer',
        startDate: 'Jun 2021',
        endDate: 'Dec 2022',
        current: false,
        highlights: [
          'Built client landing pages and e-commerce UI features with React and Tailwind CSS.',
          'Automated deployment workflows using GitHub Actions and Vercel.'
        ]
      }
    ],
    education: [
      {
        id: 'edu_1',
        institution: 'University of Illinois Chicago',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        year: '2021'
      }
    ],
    aiSuggestions: [
      'Add quantified metric for API integration project impact.',
      'Highlight GraphQL or state management experience in header bullet.',
      'Include 2 extra keywords matching Senior Frontend listings: "Component Architecture", "Unit Testing".'
    ],
    template: 'modern'
  }
];

export const mockMentors: Mentor[] = [
  {
    id: 'men_1',
    name: 'Dr. Marcus Vance',
    role: 'Principal AI Scientist & Career Coach',
    company: 'Open AI Mobility',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    rating: 4.95,
    reviewCount: 124,
    specialties: ['AI Career Transition', 'Resume Optimization', 'Technical Interviews'],
    hourlyRate: '$45',
    availability: 'Tomorrow at 3:00 PM',
    bio: 'Helping self-taught engineers and career switchers break into tech with strategic portfolio planning and confidence building.',
    sessionsCompleted: 340
  },
  {
    id: 'men_2',
    name: 'Elena Rostova',
    role: 'VP of People & Talent Acquisition',
    company: 'Nexus Scale Ventures',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
    rating: 4.98,
    reviewCount: 98,
    specialties: ['Salary Negotiation', 'Executive Mentorship', 'Recruiter Perspective'],
    hourlyRate: '$50',
    availability: 'Friday at 10:00 AM',
    bio: '12+ years recruiting top tech talent. I give candid feedback on why your resume gets passed over and how to land tier-1 interviews.',
    sessionsCompleted: 215
  },
  {
    id: 'men_3',
    name: 'David Chen',
    role: 'Lead UX Architect',
    company: 'Design Systems Collective',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    rating: 4.88,
    reviewCount: 76,
    specialties: ['Portfolio Reviews', 'Accessibility UX', 'Product Strategy'],
    hourlyRate: 'Free (Community Sponsored)',
    availability: 'Saturday at 1:00 PM',
    bio: 'Passionate about equal access to tech education. Offering free weekly portfolio feedback sessions to underrepresented designers.',
    sessionsCompleted: 180
  }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'not_1',
    title: 'New 94% Match Job Posted!',
    message: 'Apex Solutions Tech posted "Senior Frontend Developer" in Chicago, IL (Remote). Matches your top React skills.',
    timestamp: '15 mins ago',
    type: 'match',
    read: false,
    link: '/jobs'
  },
  {
    id: 'not_2',
    title: 'Resume Score Upgraded to 88/100',
    message: 'WorkNext AI Optimizer analyzed your newly added projects and boosted your readability index by +12 pts.',
    timestamp: '2 hours ago',
    type: 'system',
    read: false,
    link: '/resume'
  },
  {
    id: 'not_3',
    title: 'Interview Request Confirmed',
    message: 'Cognitive Dynamics scheduled a screening call for Thursday, Aug 8 at 2:00 PM.',
    timestamp: 'Yesterday',
    type: 'interview',
    read: true,
    link: '/dashboard'
  },
  {
    id: 'not_4',
    title: 'Mentor Session Confirmed',
    message: 'Dr. Marcus Vance confirmed your 1-on-1 resume review session.',
    timestamp: '2 days ago',
    type: 'mentor',
    read: true,
    link: '/community'
  }
];

export const mockEmploymentStats: EmploymentStat = {
  region: 'Chicago Metropolitan & Midwest Tech Corridor',
  unemploymentRate: 3.6,
  underemploymentRate: 5.9,
  activeJobOpenings: 14250,
  avgSalaryGrowth: 4.8,
  topSkillsInDemand: [
    { name: 'React & TypeScript', count: 3200, growth: '+24%' },
    { name: 'AI & Prompt Engineering', count: 2100, growth: '+142%' },
    { name: 'Cloud & DevOps (AWS/Azure)', count: 2800, growth: '+18%' },
    { name: 'Data Engineering & SQL', count: 2400, growth: '+15%' },
    { name: 'Cybersecurity & Compliance', count: 1900, growth: '+21%' }
  ],
  hiringTrends: [
    { month: 'Jan', openings: 11200, placements: 8400 },
    { month: 'Feb', openings: 11800, placements: 8900 },
    { month: 'Mar', openings: 12500, placements: 9300 },
    { month: 'Apr', openings: 13100, placements: 9800 },
    { month: 'May', openings: 13600, placements: 10400 },
    { month: 'Jun', openings: 14250, placements: 11100 }
  ]
};

export const mockTestimonials: Testimonial[] = [
  {
    id: 'test_1',
    name: 'Sarah Jenkins',
    role: 'Front-End Engineer',
    company: 'CloudScale Inc.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=250',
    quote: 'WorkNext identified my exact skill gap in TypeScript, guided me through targeted learning modules, and generated an ATS-proof resume. I went from underemployed retail staff to a $95k tech job in 4 months.',
    badge: 'Underemployed to Tech Pro',
    salaryBoost: '+$48,000 / yr'
  },
  {
    id: 'test_2',
    name: 'Carlos Mendez',
    role: 'Cybersecurity Associate',
    company: 'SecureNet Gov',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=250',
    quote: 'The local job finder showed me certified apprenticeship programs in my ZIP code that I never knew existed. The AI match score gave me confidence to apply!',
    badge: 'Local Apprentice Graduate',
    salaryBoost: '+$32,000 / yr'
  },
  {
    id: 'test_3',
    name: 'Priya Sharma',
    role: 'AI Data Analyst',
    company: 'DataSphere Solutions',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    quote: 'As an international student struggling with job filters, WorkNext highlighted companies with sponsorship history and verified fair hiring metrics. Game changer!',
    badge: 'Career Transition Success',
    salaryBoost: '+$42,000 / yr'
  }
];

export const mockFAQs: FAQItem[] = [
  {
    id: 'faq_1',
    category: 'General',
    question: 'How does WorkNext address both unemployment and underemployment?',
    answer: 'WorkNext goes beyond traditional job boards by analyzing individual skill profiles against local labor market demands. For underemployed individuals, WorkNext identifies transferable skills and bridges wage gaps by recommending targeted micro-credentials and high-value career pathways.'
  },
  {
    id: 'faq_2',
    category: 'Job Seekers',
    question: 'How does the AI Resume Builder optimize my resume for ATS filters?',
    answer: 'Our AI engine scans job postings to extract industry-specific keywords, action verbs, and structural requirements. It scores your resume live and suggests edits to ensure ATS-friendly formatting through automated Applicant Tracking Systems.'
  },
  {
    id: 'faq_3',
    category: 'Job Seekers',
    question: 'Is WorkNext free for job seekers?',
    answer: 'Yes! WorkNext provides core career guidance, local job search, resume builder tools, and market insight dashboards completely free to job seekers as part of our mission to reduce employment disparities.'
  },
  {
    id: 'faq_4',
    category: 'Recruiters',
    question: 'How do recruiters benefit from WorkNext?',
    answer: 'Recruiters gain access to candidates matched by skill competency rather than arbitrary filters. You can post openings, evaluate candidate profiles, and streamline hiring workflows.'
  },
  {
    id: 'faq_5',
    category: 'Accessibility',
    question: 'What accessibility features are supported on WorkNext?',
    answer: 'WorkNext supports full WCAG 2.1 AA guidelines, including screen-reader friendly DOM structure, keyboard-first navigation, customizable font sizes, high-contrast toggle, and dark/light modes.'
  }
];
