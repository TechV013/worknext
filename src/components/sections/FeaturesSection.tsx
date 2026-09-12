import React from 'react';
import { motion } from 'motion/react';
import { FeatureCard } from '../cards/FeatureCard';
import { Sparkles, FileText, MapPin, BarChart3, Users, Building2 } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Sparkles className="w-5 h-5 text-[#0F766E] dark:text-teal-400" />,
      title: 'AI Career Guidance',
      description: 'Get personalized career roadmaps and real-time skill recommendations based on live regional market demand.',
      badge: 'Core Engine'
    },
    {
      icon: <FileText className="w-5 h-5 text-[#0F766E] dark:text-teal-400" />,
      title: 'ATS-Proof Resume Builder',
      description: 'Format, quantify, and score your resume live. Generates clean ATS-parsable PDFs tailored to target job descriptions.',
      badge: 'ATS-Friendly'
    },
    {
      icon: <MapPin className="w-5 h-5 text-[#0F766E] dark:text-teal-400" />,
      title: 'Local Job & Skill Finder',
      description: 'Discover nearby job openings, apprenticeships, and vocational training centers filtered by ZIP code and wage floor.',
      badge: 'Hyper-Local'
    },
    {
      icon: <BarChart3 className="w-5 h-5 text-[#0F766E] dark:text-teal-400" />,
      title: 'Employment & Wage Insights',
      description: 'View regional salary benchmarks, emerging skill shortages, and economic growth indices across metropolitan corridors.',
      badge: 'Live Analytics'
    },
    {
      icon: <Users className="w-5 h-5 text-[#0F766E] dark:text-teal-400" />,
      title: 'Community & Mentorship',
      description: 'Connect with verified industry mentors for 1-on-1 resume reviews, mock interviews, and salary negotiation strategies.',
      badge: '1-on-1 Mentors'
    },
    {
      icon: <Building2 className="w-5 h-5 text-[#0F766E] dark:text-teal-400" />,
      title: 'Recruiter Match Portal',
      description: 'Help employers hire pre-vetted non-traditional candidates based on verified competency tests rather than credentials alone.',
      badge: 'Recruiter Hub'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  return (
    <section className="py-24 bg-[#F7F6F3] dark:bg-[#111111] text-[#1F2937] dark:text-stone-100 relative overflow-hidden transition-colors border-t border-stone-200/80 dark:border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200/80 dark:border-teal-800/50 text-xs font-semibold text-[#0F766E] dark:text-teal-400"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E] dark:bg-teal-400" />
            Capabilities Architecture
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight font-display"
          >
            Engineered to Solve Unemployment at Scale
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl mx-auto font-sans"
          >
            A cohesive suite of career intelligence modules designed to eliminate hiring friction, raise starting compensation, and unlock human potential.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {features.map((feat, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <FeatureCard
                icon={feat.icon}
                title={feat.title}
                description={feat.description}
                badge={feat.badge}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
