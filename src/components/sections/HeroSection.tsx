import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Zap,
  Target,
  FileCheck,
  BarChart3,
  Play,
  X,
  Star,
  ChevronRight,
  Check,
  Cpu,
  Compass,
  Award
} from 'lucide-react';
import { Button } from '../ui/Button';

export const HeroSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'resume' | 'match' | 'skills' | 'insights'>('resume');
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden py-16 lg:py-24 bg-[#F7F6F3] dark:bg-[#111111] text-[#1F2937] dark:text-stone-100 transition-colors">
      
      {/* Soft Ambient Background: Warm Emerald & Warm Gold Organic Glows (No Neon / No Grids) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-70 dark:opacity-40">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [-20, 20, -20],
            y: [-15, 15, -15],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 left-1/4 w-[600px] h-[600px] bg-teal-800/10 dark:bg-teal-500/15 rounded-full blur-[140px]"
        />

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.25, 0.45, 0.25],
            x: [30, -30, 30],
            y: [20, -20, 20],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute top-1/3 -right-20 w-[550px] h-[550px] bg-amber-600/10 dark:bg-amber-500/10 rounded-full blur-[150px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 space-y-8 text-left">
            
            {/* Small Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white dark:bg-[#1A1A1A] border border-stone-200 dark:border-stone-800 shadow-sm text-xs font-sans font-medium text-stone-700 dark:text-stone-300"
            >
              <span className="w-2 h-2 rounded-full bg-[#0F766E] animate-pulse" />
              <span className="font-semibold text-[#0F766E] dark:text-teal-400">WorkNext Intelligence</span>
              <span className="text-stone-300 dark:text-stone-700">•</span>
              <span className="text-stone-500 dark:text-stone-400">AI Career Platform</span>
            </motion.div>

            {/* Large Elegant Headline */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-1.5"
            >
              <h1 className="text-5xl sm:text-6xl lg:text-[70px] font-extrabold tracking-tight leading-[1.08] font-display text-stone-900 dark:text-white">
                Your Career.
              </h1>
              <h1 className="text-5xl sm:text-6xl lg:text-[70px] font-extrabold tracking-tight leading-[1.08] font-display text-[#0F766E] dark:text-teal-400">
                Smarter. Faster. Better.
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed max-w-xl font-sans font-normal"
            >
              Discover opportunities, build an ATS-ready resume, master in-demand skills, and achieve your career goals with AI-powered guidance—all in one platform.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <Link to="/jobs">
                <Button
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                  className="w-full sm:w-auto text-base py-3.5 px-7 bg-[#0F766E] hover:bg-[#0D655E] text-white font-semibold rounded-[18px] shadow-md shadow-teal-900/15"
                >
                  Get Started →
                </Button>
              </Link>

              <button
                onClick={() => setIsVideoOpen(true)}
                className="inline-flex items-center justify-center gap-2.5 text-base py-3.5 px-7 rounded-[18px] bg-white dark:bg-[#1A1A1A] hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-800 shadow-sm transition-all cursor-pointer font-medium"
              >
                <div className="w-6 h-6 rounded-full bg-teal-50 dark:bg-teal-950/60 text-[#0F766E] dark:text-teal-400 flex items-center justify-center">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Watch Demo</span>
              </button>
            </motion.div>

            {/* Editorial Feature Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-6 border-t border-stone-200/80 dark:border-stone-800/80 flex flex-wrap items-center gap-6 text-xs text-stone-500 dark:text-stone-400 font-sans"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0F766E] dark:text-teal-400 shrink-0" />
                <span>100% Free for Job Seekers</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>ATS-Friendly Resume Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-stone-400 dark:text-stone-500 shrink-0 fill-current" />
                <span>Designed to help students, fresh graduates, and job seekers.</span>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Floating Product Preview & Overlapping Glass Cards */}
          <div className="lg:col-span-6 relative">
            
            {/* Floating Main Glass Console */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative rounded-[22px] bg-white dark:bg-[#1A1A1A] border border-stone-200/90 dark:border-stone-800 shadow-xl p-6 sm:p-8 space-y-6 overflow-hidden"
            >
              {/* Product Card Top Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800/80">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-stone-300 dark:bg-stone-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-stone-300 dark:bg-stone-700" />
                  <span className="w-2.5 h-2.5 rounded-full bg-stone-300 dark:bg-stone-700" />
                  <span className="text-xs font-mono text-stone-400 dark:text-stone-500 pl-2">
                    worknext.ai/dashboard
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-sans font-medium text-[#0F766E] dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-2.5 py-1 rounded-full border border-teal-200/60 dark:border-teal-800/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E] dark:bg-teal-400" />
                  SAMPLE PREVIEW
                </div>
              </div>

              {/* Minimal Tab Switcher */}
              <div className="grid grid-cols-4 gap-1.5 p-1 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800 text-xs font-sans">
                {[
                  { id: 'resume', label: 'Resume', icon: FileCheck },
                  { id: 'match', label: 'Job Match', icon: Target },
                  { id: 'skills', label: 'Skills', icon: Zap },
                  { id: 'insights', label: 'Insights', icon: BarChart3 },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg transition-all cursor-pointer font-medium ${
                        isActive
                          ? 'bg-white dark:bg-[#1A1A1A] text-stone-900 dark:text-white shadow-sm font-semibold'
                          : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Dashboard Tab View */}
              <div className="min-h-[240px] relative flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  {activeTab === 'resume' && (
                    <motion.div
                      key="resume"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4"
                    >
                      <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-xs font-mono text-[#0F766E] dark:text-teal-400 font-semibold">AI RESUME ANALYSIS</p>
                            <span className="text-[10px] bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400 px-2 py-0.5 rounded font-sans">Sample Preview</span>
                          </div>
                          <h4 className="text-lg font-bold text-stone-900 dark:text-white font-display mt-0.5">ATS-Friendly Formatting</h4>
                          <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-1 flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> Structured for standard Applicant Tracking Systems
                          </p>
                        </div>
                        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-sm text-center">
                          <div>
                            <span className="text-xl font-black text-[#0F766E] dark:text-teal-400 font-display">--</span>
                            <span className="text-[10px] text-stone-400 block font-mono">Score</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs font-sans">
                        <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800">
                          <span className="text-stone-500 dark:text-stone-400 text-[11px]">Keywords Analysis</span>
                          <p className="text-sm font-bold text-stone-900 dark:text-white mt-0.5">Job Description Match</p>
                        </div>
                        <div className="p-3.5 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800">
                          <span className="text-stone-500 dark:text-stone-400 text-[11px]">Formatting Check</span>
                          <p className="text-sm font-bold text-stone-900 dark:text-white mt-0.5">Clean & Parsable</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'match' && (
                    <motion.div
                      key="match"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4"
                    >
                      <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-semibold text-[#0F766E] dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 px-2.5 py-0.5 rounded-full">
                            SAMPLE JOB MATCH
                          </span>
                          <span className="text-xs font-mono text-stone-500 dark:text-stone-400">Sample Range</span>
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-stone-900 dark:text-white font-display">Frontend Software Developer</h4>
                          <p className="text-xs text-stone-500 dark:text-stone-400">Tech Hiring Partner • Sample Location</p>
                        </div>
                        <div className="pt-2 border-t border-stone-200/80 dark:border-stone-800 flex flex-wrap gap-2 text-[11px]">
                          <span className="px-2.5 py-0.5 rounded-lg bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700">React</span>
                          <span className="px-2.5 py-0.5 rounded-lg bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700">TypeScript</span>
                          <span className="px-2.5 py-0.5 rounded-lg bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700">Node.js</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'skills' && (
                    <motion.div
                      key="skills"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-stone-900 dark:text-white font-display">Target Skill Progress</h4>
                        <span className="text-xs text-[#0F766E] dark:text-teal-400 font-semibold">Not Started</span>
                      </div>

                      {[
                        { name: 'Modern Web Frameworks', level: 'Not Started' },
                        { name: 'API Integration & Cloud Basics', level: 'Not Started' },
                        { name: 'Database Fundamentals', level: 'Not Started' },
                      ].map((skill, idx) => (
                        <div key={idx} className="space-y-1 text-xs">
                          <div className="flex justify-between text-stone-700 dark:text-stone-300">
                            <span>{skill.name}</span>
                            <span className="font-bold text-stone-500">{skill.level}</span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
                            <div className="h-full rounded-full bg-stone-300 dark:bg-stone-700 w-0" />
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === 'insights' && (
                    <motion.div
                      key="insights"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                      className="grid grid-cols-2 gap-3 text-xs"
                    >
                      <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 space-y-1">
                        <span className="text-stone-500 dark:text-stone-400 text-[11px]">Job Openings</span>
                        <p className="text-2xl font-black text-stone-900 dark:text-white font-display">--</p>
                        <p className="text-[10px] text-stone-500 flex items-center gap-1 font-sans">
                          Sample Preview
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 space-y-1">
                        <span className="text-stone-500 dark:text-stone-400 text-[11px]">Skill Progress</span>
                        <p className="text-2xl font-black text-[#0F766E] dark:text-teal-400 font-display">Not Started</p>
                        <p className="text-[10px] text-stone-400">Sample Preview</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom Quick Callout */}
              <div className="p-3.5 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 flex items-center justify-between text-xs font-sans">
                <div className="flex items-center gap-2.5">
                  <Cpu className="w-4 h-4 text-[#0F766E] dark:text-teal-400 shrink-0" />
                  <span className="text-stone-700 dark:text-stone-300">Explore tailored job recommendations and skill tools</span>
                </div>
                <Link to="/jobs" className="text-[#0F766E] dark:text-teal-400 font-semibold hover:underline flex items-center gap-0.5">
                  Explore <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>

            {/* Overlapping Floating Glass Badge 1 (Top Right) */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="hidden sm:flex absolute -top-5 -right-5 z-20 p-4 rounded-2xl bg-white/95 dark:bg-[#1A1A1A]/95 border border-stone-200 dark:border-stone-800 shadow-lg backdrop-blur-xl items-center gap-3 max-w-xs"
            >
              <div className="w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-[#0F766E] dark:text-teal-400 flex items-center justify-center shrink-0 border border-teal-200/60 dark:border-teal-800/40">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-stone-900 dark:text-white font-sans">ATS-Friendly Analysis</p>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 font-sans">Designed for Job Seekers</p>
              </div>
            </motion.div>

            {/* Overlapping Floating Glass Badge 2 (Bottom Left) */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="hidden sm:flex absolute -bottom-5 -left-5 z-20 p-4 rounded-2xl bg-white/95 dark:bg-[#1A1A1A]/95 border border-stone-200 dark:border-stone-800 shadow-lg backdrop-blur-xl items-center gap-3 max-w-xs"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-200/60 dark:border-amber-800/40">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-stone-900 dark:text-white font-sans">Skill Gap Guidance</p>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 font-sans">For Students & Fresh Grads</p>
              </div>
            </motion.div>

          </div>

        </div>
      </div>

      {/* Demo Video / Feature Preview Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 16 }}
              className="relative w-full max-w-2xl rounded-[22px] bg-white dark:bg-[#1A1A1A] border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-2xl space-y-6 overflow-hidden text-stone-900 dark:text-white"
            >
              <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-[#0F766E] dark:text-teal-400 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-display">WorkNext Walkthrough</h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400">See how AI guidance accelerates your job search</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsVideoOpen(false)}
                  className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 hover:text-stone-900 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="aspect-video rounded-2xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 relative flex flex-col items-center justify-center p-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#0F766E] text-white flex items-center justify-center shadow-lg shadow-teal-900/20">
                  <Play className="w-6 h-6 fill-current ml-0.5" />
                </div>
                <div className="space-y-1 max-w-md">
                  <h4 className="text-lg font-bold font-display">Platform Feature Demonstration</h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Explore real-time ATS resume scoring, automated skill gap bridging, and direct job recommendations.
                  </p>
                </div>
                <div className="pt-2 flex gap-3">
                  <Link to="/jobs" onClick={() => setIsVideoOpen(false)}>
                    <Button variant="primary" size="sm">Get Started Free →</Button>
                  </Link>
                  <Button variant="ghost" size="sm" onClick={() => setIsVideoOpen(false)}>Close</Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
