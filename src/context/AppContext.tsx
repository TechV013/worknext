import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeMode, Language, FontSize, UserProfile, Job, NotificationItem } from '../types';
import { mockCurrentUser, mockJobs, mockNotifications } from '../data/mockData';
import { loginApi } from '../api/auth';

interface AppContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  
  language: Language;
  setLanguage: (lang: Language) => void;
  
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  
  highContrast: boolean;
  setHighContrast: (active: boolean) => void;
  toggleHighContrast: () => void;
  
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  authError: string | null;
  
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  
  jobs: Job[];
  savedJobIds: string[];
  appliedJobIds: string[];
  toggleSaveJob: (jobId: string) => void;
  applyForJob: (jobId: string) => void;
  
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;
  unreadCount: number;
  
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  globalSearchOpen: boolean;
  setGlobalSearchOpen: (open: boolean) => void;
  
  notificationsOpen: boolean;
  setNotificationsOpen: (open: boolean) => void;
  
  accessibilityOpen: boolean;
  setAccessibilityOpen: (open: boolean) => void;

  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Simple dictionary for multilingual translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.dashboard': 'Dashboard',
    'nav.jobs': 'Job Finder',
    'nav.resume': 'Resume Builder',
    'nav.insights': 'Market Insights',
    'nav.community': 'Community & Mentors',
    'nav.recruiter': 'Recruiter Portal',
    'nav.login': 'Log In',
    'nav.signup': 'Get Started',
    'nav.settings': 'Settings',
    'hero.title': 'Bridge the Workforce Gap with AI Guidance',
    'hero.subtitle': 'Empowering job seekers and workers to unlock higher wages, discover local careers, and build verified resumes in minutes.',
    'search.placeholder': 'Search jobs, skills, mentors, or insights...',
    'btn.applyNow': 'Apply Now',
    'btn.saveJob': 'Save Job',
    'btn.saved': 'Saved',
    'btn.applied': 'Applied',
    'btn.exploreJobs': 'Explore Jobs',
    'btn.buildResume': 'Build Resume',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.dashboard': 'Panel Principal',
    'nav.jobs': 'Buscador de Empleo',
    'nav.resume': 'Creador de CV',
    'nav.insights': 'Estadísticas del Mercado',
    'nav.community': 'Comunidad y Mentores',
    'nav.recruiter': 'Portal de Reclutadores',
    'nav.login': 'Iniciar Sesión',
    'nav.signup': 'Registrarse',
    'nav.settings': 'Configuración',
    'hero.title': 'Reduzca la Brecha Laboral con Guía de IA',
    'hero.subtitle': 'Empoderando a profesionales para obtener mejores salarios, empleos locales y currículums verificados en minutos.',
    'search.placeholder': 'Buscar empleos, habilidades o mentores...',
    'btn.applyNow': 'Postularme',
    'btn.saveJob': 'Guardar Empleo',
    'btn.saved': 'Guardado',
    'btn.applied': 'Postulado',
    'btn.exploreJobs': 'Explorar Empleos',
    'btn.buildResume': 'Crear CV',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.dashboard': 'Tableau de bord',
    'nav.jobs': 'Offres d\'Emploi',
    'nav.resume': 'Générateur de CV',
    'nav.insights': 'Aperçu du Marché',
    'nav.community': 'Communauté & Mentors',
    'nav.recruiter': 'Espace Recruteur',
    'nav.login': 'Connexion',
    'nav.signup': 'S\'inscrire',
    'nav.settings': 'Paramètres',
    'hero.title': 'Comblez l\'écart d\'emploi grâce à l\'IA',
    'hero.subtitle': 'Permettre aux chercheurs d\'emploi d\'accéder à de meilleurs salaires et de créer des CV optimisés.',
    'search.placeholder': 'Rechercher un emploi, une compétence...',
    'btn.applyNow': 'Postuler',
    'btn.saveJob': 'Enregistrer',
    'btn.saved': 'Enregistré',
    'btn.applied': 'Candidaté',
    'btn.exploreJobs': 'Explorer',
    'btn.buildResume': 'Créer mon CV',
  },
  de: {
    'nav.home': 'Startseite',
    'nav.dashboard': 'Dashboard',
    'nav.jobs': 'Jobsuche',
    'nav.resume': 'Lebenslauf-Builder',
    'nav.insights': 'Arbeitsmarkteinblicke',
    'nav.community': 'Community & Mentoren',
    'nav.recruiter': 'Recruiter Portal',
    'nav.login': 'Anmelden',
    'nav.signup': 'Registrieren',
    'nav.settings': 'Einstellungen',
    'hero.title': 'Schließen Sie die Arbeitsmarktlücke mit KI',
    'hero.subtitle': 'Bessere Löhne, lokale Karrierechancen und optimierte Lebensläufe in wenigen Minuten.',
    'search.placeholder': 'Jobs, Fähigkeiten oder Mentoren suchen...',
    'btn.applyNow': 'Jetzt Bewerben',
    'btn.saveJob': 'Job Speichern',
    'btn.saved': 'Gespeichert',
    'btn.applied': 'Beworben',
    'btn.exploreJobs': 'Jobs Erkunden',
    'btn.buildResume': 'Lebenslauf Erstellen',
  },
  hi: {
    'nav.home': 'होम',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.jobs': 'जॉब खोजें',
    'nav.resume': 'रिज्यूमे बिल्डर',
    'nav.insights': 'रोजगार डेटा',
    'nav.community': 'समुदाय और मेंटर्स',
    'nav.recruiter': 'रिक्रूटर पोर्टल',
    'nav.login': 'लॉग इन',
    'nav.signup': 'शुरू करें',
    'nav.settings': 'सेटिंग्स',
    'hero.title': 'एआई मार्गदर्शन के साथ रोजगार अंतराल को भरें',
    'hero.subtitle': 'बेहतर वेतन, स्थानीय नौकरियों और एआई-सत्यापित रिज्यूमे के साथ अपने करियर को सशक्त बनाएं।',
    'search.placeholder': 'नौकरी, कौशल या मेंटर्स खोजें...',
    'btn.applyNow': 'आवेदन करें',
    'btn.saveJob': 'सेव करें',
    'btn.saved': 'सेव किया गया',
    'btn.applied': 'आवेदन किया',
    'btn.exploreJobs': 'नौकरियां देखें',
    'btn.buildResume': 'रिज्यूमे बनाएं',
  }
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [language, setLanguage] = useState<Language>('en');
  const [fontSize, setFontSize] = useState<FontSize>('normal');
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('worknext_is_logged_in') === 'true';
  });
  const [authError, setAuthError] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile>(mockCurrentUser);

  const login = async (email: string, password: string) => {
    setAuthError(null);
    const data = await loginApi(email, password);
    localStorage.setItem('worknext_token', data.token);
    localStorage.setItem('worknext_is_logged_in', 'true');
    setIsLoggedIn(true);
    setUser(prev => ({
      ...prev,
      name: data.user.name,
      email: data.user.email,
    }));
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('worknext_is_logged_in', 'false');
    localStorage.removeItem('worknext_token');
  };
  const [jobs] = useState<Job[]>(mockJobs);
  const [savedJobIds, setSavedJobIds] = useState<string[]>(mockCurrentUser.savedJobIds);
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>(mockCurrentUser.appliedJobIds);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [globalSearchOpen, setGlobalSearchOpen] = useState<boolean>(false);
  const [notificationsOpen, setNotificationsOpen] = useState<boolean>(false);
  const [accessibilityOpen, setAccessibilityOpen] = useState<boolean>(false);

  // Sync theme class on document element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Sync high contrast mode on document element
  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
  }, [highContrast]);

  // Sync font size attribute on root
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-font-size', fontSize);
  }, [fontSize]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleHighContrast = () => {
    setHighContrast(prev => !prev);
  };

  const toggleSaveJob = (jobId: string) => {
    setSavedJobIds(prev => {
      const exists = prev.includes(jobId);
      const next = exists ? prev.filter(id => id !== jobId) : [...prev, jobId];
      setUser(u => ({ ...u, savedJobIds: next }));
      return next;
    });
  };

  const applyForJob = (jobId: string) => {
    if (!appliedJobIds.includes(jobId)) {
      const next = [...appliedJobIds, jobId];
      setAppliedJobIds(next);
      setUser(u => ({ ...u, appliedJobIds: next }));

      // Add notification for applying
      const job = jobs.find(j => j.id === jobId);
      if (job) {
        const newNotif: NotificationItem = {
          id: 'not_' + Date.now(),
          title: 'Application Submitted!',
          message: `Your application for ${job.title} at ${job.company} was submitted.`,
          timestamp: 'Just now',
          type: 'application',
          read: false,
          link: '/dashboard'
        };
        setNotifications(prev => [newNotif, ...prev]);
      }
    }
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
        language,
        setLanguage,
        fontSize,
        setFontSize,
        highContrast,
        setHighContrast,
        toggleHighContrast,
        isLoggedIn,
        login,
        logout,
        authError,
        user,
        setUser,
        jobs,
        savedJobIds,
        appliedJobIds,
        toggleSaveJob,
        applyForJob,
        notifications,
        markNotificationRead,
        clearAllNotifications,
        unreadCount,
        searchQuery,
        setSearchQuery,
        globalSearchOpen,
        setGlobalSearchOpen,
        notificationsOpen,
        setNotificationsOpen,
        accessibilityOpen,
        setAccessibilityOpen,
        t
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
