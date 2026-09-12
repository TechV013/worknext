import React from 'react';
import { motion } from 'motion/react';
import { mockTestimonials } from '../../data/mockData';
import { Quote, TrendingUp } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#F7F6F3] dark:bg-[#111111] text-[#1F2937] dark:text-stone-100 relative overflow-hidden transition-colors border-t border-stone-200/80 dark:border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200/80 dark:border-teal-800/50 text-xs font-semibold text-[#0F766E] dark:text-teal-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E] dark:bg-teal-400" />
            Verified Economic Mobility
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight font-display">
            Transformed Lives & Elevating Wages
          </h2>
          <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl mx-auto font-sans">
            See how job seekers bridged skill gaps and transitioned into rewarding, sustainable careers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {mockTestimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="p-8 rounded-[20px] bg-white dark:bg-[#1A1A1A] border border-stone-200/90 dark:border-stone-800 shadow-xs flex flex-col justify-between relative group transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[11px] font-sans font-semibold px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
                    {t.badge}
                  </span>
                  <div className="flex items-center gap-1.5 text-[#0F766E] dark:text-teal-400 font-bold text-xs bg-teal-50 dark:bg-teal-950/60 border border-teal-200/60 dark:border-teal-800/40 px-3 py-1 rounded-full font-sans">
                    <TrendingUp className="w-3.5 h-3.5" />
                    {t.salaryBoost}
                  </div>
                </div>

                <Quote className="w-7 h-7 text-stone-300 dark:text-stone-700 mb-3" />
                <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed italic mb-8 font-sans">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t border-stone-100 dark:border-stone-800">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border border-stone-200 dark:border-stone-700"
                />
                <div>
                  <h4 className="text-sm font-bold text-stone-900 dark:text-white font-display">{t.name}</h4>
                  <p className="text-xs text-stone-500 dark:text-stone-400 font-sans">{t.role} • <span className="text-stone-700 dark:text-stone-300">{t.company}</span></p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
