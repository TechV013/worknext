import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  User,
  FileText,
  Briefcase,
  BarChart3,
  Users,
  Building2,
  Settings,
  Bell,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { user, isLoggedIn } = useApp();
  const location = useLocation();

  const menuItems = [
    { label: 'Overview Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'User Profile', path: '/profile', icon: <User className="w-4 h-4" /> },
    { label: 'AI Resume Builder', path: '/resume', icon: <FileText className="w-4 h-4" /> },
    { label: 'Local Job Finder', path: '/jobs', icon: <Briefcase className="w-4 h-4" /> },
    { label: 'Employment Insights', path: '/insights', icon: <BarChart3 className="w-4 h-4" /> },
    { label: 'Mentors & Community', path: '/community', icon: <Users className="w-4 h-4" /> },
    { label: 'Recruiter Hub', path: '/recruiter', icon: <Building2 className="w-4 h-4" /> },
    { label: 'Notifications', path: '/notifications', icon: <Bell className="w-4 h-4" /> },
    { label: 'Settings', path: '/settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-64 shrink-0 hidden md:block">
      <div className="sticky top-24 space-y-6">
        {/* User Compact Card / Sign In Prompt */}
        {isLoggedIn ? (
          <div className="p-4 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-11 h-11 rounded-2xl object-cover border-2 border-blue-500/30"
              />
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-xs text-white truncate">{user.name}</h4>
                <p className="text-[11px] text-slate-400 truncate font-mono">{user.title}</p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-between text-xs font-mono">
              <span className="text-blue-300 font-semibold">Readiness Index</span>
              <span className="font-black text-blue-400 text-sm">{user.readinessScore}%</span>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-xl space-y-3">
            <div className="space-y-1">
              <h4 className="font-bold text-xs text-white">Guest Explorer</h4>
              <p className="text-[11px] text-slate-400 leading-snug">Log in to unlock AI resume feedback, job matches, & saved roles.</p>
            </div>
            <Link
              to="/login"
              className="block w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs text-center shadow-lg shadow-blue-500/20 hover:from-blue-500 hover:to-indigo-500 transition-all"
            >
              Sign In to Account
            </Link>
          </div>
        )}

        {/* Navigation Section */}
        <div className="p-3 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-xl space-y-1">
          <p className="px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500">
            Navigation
          </p>

          {menuItems.map(item => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="block relative group"
              >
                <motion.div
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-medium transition-colors ${
                    active
                      ? 'text-white font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="sidebarActiveBackground"
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/25"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <div className="relative z-10 flex items-center gap-3">
                    <span className={active ? 'text-white' : 'text-slate-400 group-hover:text-blue-400 transition-colors'}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  {active && <ChevronRight className="w-3.5 h-3.5 relative z-10 text-white" />}
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* Quick Upskill CTA */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-5 rounded-3xl bg-gradient-to-br from-indigo-900/90 via-blue-900/80 to-purple-950/90 border border-indigo-500/30 text-white shadow-2xl relative overflow-hidden backdrop-blur-xl group"
        >
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-blue-500/20 rounded-full blur-xl group-hover:bg-blue-500/30 transition-colors" />
          <div className="flex items-center gap-2 mb-2 text-indigo-300 text-xs font-mono font-bold">
            <Sparkles className="w-4 h-4 fill-current text-amber-400 animate-pulse" /> AI Skill Booster
          </div>
          <p className="text-xs font-normal mb-3 text-slate-300 leading-relaxed">
            3 high-value skill gaps detected for your target role.
          </p>
          <Link
            to="/insights"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold px-3.5 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-400 transition-colors shadow-lg shadow-blue-500/20"
          >
            Bridge Skill Gaps →
          </Link>
        </motion.div>
      </div>
    </aside>
  );
};
