import React from 'react';
import { motion } from 'motion/react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { mockEmploymentStats } from '../data/mockData';
import { BarChart3, TrendingUp, Zap, Globe2 } from 'lucide-react';

export const EmploymentDashboardPage: React.FC = () => {
  const stats = mockEmploymentStats;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Title */}
        <div>
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200/80 dark:border-teal-800/50 text-xs font-semibold text-[#0F766E] dark:text-teal-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E] dark:bg-teal-400" />
            Labor & Skill Analytics
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 dark:text-white mt-2 font-display">
            Employment & Market Insights
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1 font-sans">
            Real-time economic indicators, top demanded skill matrices, and regional wage forecasts.
          </p>
        </div>

        {/* Region Banner */}
        <div className="p-4 sm:p-5 rounded-[20px] bg-white dark:bg-[#1A1A1A] border border-stone-200/90 dark:border-stone-800 shadow-xs flex items-center justify-between text-xs text-stone-900 dark:text-white font-sans">
          <div className="flex items-center gap-2.5">
            <Globe2 className="w-4 h-4 text-[#0F766E] dark:text-teal-400" />
            <span className="text-stone-500 font-medium">Active Region:</span>
            <span className="font-bold text-stone-900 dark:text-white font-display">{stats.region}</span>
            <span className="text-[10px] bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 font-semibold px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800 ml-2">
              Market Sample Data
            </span>
          </div>
          <span className="text-stone-400 text-xs font-sans">Updated Aug 2026</span>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-6 rounded-[20px] bg-white dark:bg-[#1A1A1A] border border-stone-200/90 dark:border-stone-800 shadow-xs space-y-2">
            <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider font-sans">Unemployment Rate</p>
            <p className="text-3xl font-extrabold text-stone-900 dark:text-white font-display">{stats.unemploymentRate}%</p>
            <p className="text-[11px] font-sans text-[#0F766E] dark:text-teal-400 font-bold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> -0.3% vs last quarter
            </p>
          </div>

          <div className="p-6 rounded-[20px] bg-white dark:bg-[#1A1A1A] border border-stone-200/90 dark:border-stone-800 shadow-xs space-y-2">
            <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider font-sans">Underemployment Index</p>
            <p className="text-3xl font-extrabold text-[#0F766E] dark:text-teal-400 font-display">{stats.underemploymentRate}%</p>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 font-sans font-normal">Workers seeking full wage potential</p>
          </div>

          <div className="p-6 rounded-[20px] bg-white dark:bg-[#1A1A1A] border border-stone-200/90 dark:border-stone-800 shadow-xs space-y-2">
            <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider font-sans">Active Regional Listings</p>
            <p className="text-3xl font-extrabold text-stone-900 dark:text-white font-display">{stats.activeJobOpenings.toLocaleString()}</p>
            <p className="text-[11px] font-sans text-[#0F766E] dark:text-teal-400 font-bold">Verified non-ghost postings</p>
          </div>

          <div className="p-6 rounded-[20px] bg-white dark:bg-[#1A1A1A] border border-stone-200/90 dark:border-stone-800 shadow-xs space-y-2">
            <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider font-sans">Avg Wage Growth</p>
            <p className="text-3xl font-extrabold text-[#0F766E] dark:text-teal-400 font-display">+{stats.avgSalaryGrowth}%</p>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 font-sans font-normal">Driven by tech & AI skills</p>
          </div>
        </div>

        {/* Demand Skills Table */}
        <div className="p-8 rounded-[20px] bg-white dark:bg-[#1A1A1A] border border-stone-200/90 dark:border-stone-800 shadow-xs space-y-5">
          <h2 className="text-base font-bold text-stone-900 dark:text-white flex items-center gap-2.5 font-display">
            <Zap className="w-5 h-5 text-amber-500" /> Top In-Demand Regional Competencies
          </h2>

          <div className="space-y-3 font-sans">
            {stats.topSkillsInDemand.map((skill, i) => (
              <div key={i} className="p-4 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3.5">
                  <span className="w-7 h-7 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-[#0F766E] dark:text-teal-400 font-bold text-xs flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-bold text-stone-900 dark:text-white text-sm font-display">{skill.name}</p>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 font-sans">{skill.count.toLocaleString()} active employer postings</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-bold text-[#0F766E] dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 px-3 py-1 rounded-full text-xs font-sans">
                    {skill.growth} Growth
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hiring Trends Visual Bar Matrix */}
        <div className="p-8 rounded-[20px] bg-white dark:bg-[#1A1A1A] border border-stone-200/90 dark:border-stone-800 shadow-xs space-y-6">
          <h2 className="text-base font-bold text-stone-900 dark:text-white flex items-center gap-2.5 font-display">
            <BarChart3 className="w-5 h-5 text-[#0F766E] dark:text-teal-400" /> Monthly Job Openings vs Placements (2026)
          </h2>

          <div className="grid grid-cols-6 gap-3 sm:gap-6 pt-6 pb-2 items-end h-56 border-b border-stone-200 dark:border-stone-800">
            {stats.hiringTrends.map((t, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3 h-full justify-end font-sans">
                <div className="w-full flex items-end justify-center gap-1.5 h-40">
                  {/* Openings Bar */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(t.openings / 16000) * 100}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    className="w-1/2 bg-stone-700 dark:bg-stone-500 rounded-t-md transition-colors"
                    title={`Openings: ${t.openings}`}
                  />
                  {/* Placements Bar */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(t.placements / 16000) * 100}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.1 + 0.05 }}
                    className="w-1/2 bg-[#0F766E] dark:bg-teal-400 rounded-t-md transition-colors"
                    title={`Placements: ${t.placements}`}
                  />
                </div>
                <span className="text-xs font-semibold text-stone-500 font-sans">{t.month}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-8 text-xs font-sans text-stone-500 dark:text-stone-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-xs bg-stone-700 dark:bg-stone-500" />
              <span>Job Openings</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-xs bg-[#0F766E] dark:bg-teal-400" />
              <span>Successful Placements</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
