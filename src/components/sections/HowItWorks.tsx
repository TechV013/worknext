import React from 'react';
import { motion } from 'motion/react';
import { UserPlus, FileSearch, Sparkles, Rocket } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Create Profile',
      desc: 'Input your skills, employment history, and target location in under 2 minutes.',
      icon: <UserPlus className="w-5 h-5 text-[#0F766E] dark:text-teal-400" />
    },
    {
      step: '02',
      title: 'AI Gap Audit',
      desc: 'Our engine scans regional job data and highlights high-impact skills to unlock high salaries.',
      icon: <FileSearch className="w-5 h-5 text-[#0F766E] dark:text-teal-400" />
    },
    {
      step: '03',
      title: 'Optimize & Match',
      desc: 'Generate an ATS-friendly resume and discover local job matches aligned with your target skills.',
      icon: <Sparkles className="w-5 h-5 text-[#0F766E] dark:text-teal-400" />
    },
    {
      step: '04',
      title: 'Apply & Elevate',
      desc: 'Apply directly, schedule 1-on-1 mentor prep, and secure higher-wage employment.',
      icon: <Rocket className="w-5 h-5 text-[#0F766E] dark:text-teal-400" />
    }
  ];

  return (
    <section className="py-24 bg-[#F7F6F3] dark:bg-[#111111] border-y border-stone-200/80 dark:border-stone-800/80 relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200/80 dark:border-teal-800/50 text-xs font-semibold text-[#0F766E] dark:text-teal-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E] dark:bg-teal-400" />
            Seamless Journey
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight font-display">
            How WorkNext Transforms Your Career
          </h2>
          <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl mx-auto font-sans">
            From skill diagnosis to landing your ideal offer letter—streamlined for maximum efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {steps.map((st, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="p-8 rounded-[20px] bg-white dark:bg-[#1A1A1A] border border-stone-200/90 dark:border-stone-800 shadow-xs relative group flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-[#0F766E] dark:text-teal-400 border border-teal-200/60 dark:border-teal-800/40 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {st.icon}
                  </div>
                  <span className="text-2xl font-black text-stone-300 dark:text-stone-700 font-display">
                    {st.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-3 font-display">
                  {st.title}
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-sans">
                  {st.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800/80 text-[11px] font-mono text-stone-400 uppercase tracking-wider">
                Phase {st.step}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
