
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { useApp } from '../context/AppContext';
import { DashboardCard } from '../components/cards/DashboardCard';
import { JobCard } from '../components/cards/JobCard';
import { Job } from '../types';
import {
  Sparkles,
  Briefcase,
  FileText,
  TrendingUp,
  Bookmark,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { getRecommendedJobs } from '../api/ai';

export const UserDashboardPage: React.FC = () => {
  const { user, savedJobIds, appliedJobIds } = useApp();
  const [recommendedJobs, setRecommendedJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setIsLoading(true);
        const data = await getRecommendedJobs(3);
        // Note: The UI expects a Job object. The API returns JobRecommendation which might be a subset.
        // I need to fetch the full job details or adapt the JobCard.
        // Assuming getRecommendedJobs returns objects that can be partially mapped to Job or I should fetch details.
        // Given instructions, adapt API response in smallest way.
        // I will map JobRecommendation to Job for JobCard.
        const jobs = data.map(j => ({
            id: j.id,
            title: j.title,
            company: j.company,
            matchScore: j.matchScore,
            companyLogo: '', // Need to fill or adapt
            location: 'Remote/Local', // Placeholder
            isRemote: true,
            type: 'Full-time',
            category: 'Tech',
            salaryMin: 0,
            salaryMax: 0,
            salaryPeriod: 'year',
            postedDate: 'Recently',
            description: '',
            requirements: [],
            skillGaps: [],
            applicantsCount: 0,
            experienceLevel: 'Mid-Level'
        } as unknown as Job));
        setRecommendedJobs(jobs);
      } catch (err) {
        setError('Unable to load recommendations.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecommendations();
  }, []);

  const savedJobsCount = savedJobIds.length;
  const appliedJobsCount = appliedJobIds.length;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Header Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-8 sm:p-10 rounded-[20px] bg-white dark:bg-[#1A1A1A] border border-stone-200/90 dark:border-stone-800 text-stone-900 dark:text-white shadow-xs relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div className="space-y-2.5 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-[#0F766E] dark:text-teal-400 text-xs font-semibold border border-teal-200/60 dark:border-teal-800/40">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Readiness Score: --
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 dark:text-white font-display">
              Welcome back, {user.name.split(' ')[0]}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-sans">
              Your dashboard for managing local job searches, ATS resume checks, and skill alignment.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link to="/resume">
              <Button variant="outline" size="md">
                Optimize Resume
              </Button>
            </Link>
            <Link to="/jobs">
              <Button variant="primary" size="md" className="bg-[#0F766E] hover:bg-[#0D655E]">
                Find Local Jobs
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Dashboard Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <DashboardCard
            title="Active Applications"
            value={appliedJobsCount > 0 ? appliedJobsCount : "No Data Yet"}
            subtext={appliedJobsCount > 0 ? "Tracked in portal" : "No applications logged yet"}
            icon={<Briefcase className="w-5 h-5" />}
          />

          <DashboardCard
            title="Saved Opportunities"
            value={savedJobsCount}
            subtext="Bookmarks synced"
            icon={<Bookmark className="w-5 h-5" />}
          />

          <DashboardCard
            title="Resume ATS Score"
            value="--"
            subtext="Upload resume to analyze"
            icon={<FileText className="w-5 h-5" />}
          />

          <DashboardCard
            title="Skill Progress"
            value="Not Started"
            subtext="Run skill gap analyzer"
            icon={<TrendingUp className="w-5 h-5" />}
          />
        </div>

        {/* Recommended Jobs Section */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-stone-900 dark:text-white flex items-center gap-2 font-display">
                  <Sparkles className="w-5 h-5 text-[#0F766E] dark:text-teal-400" /> High-Match Local Opportunities
                </h2>
              </div>
            </div>
            <Link to="/jobs">
              <Button variant="ghost" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />} iconPosition="right">
                View All Matches
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="flex justify-center p-8"><Loader2 className="animate-spin text-[#0F766E]"/></div>
          ) : error ? (
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 text-xs font-sans font-medium">{error}</div>
          ) : recommendedJobs.length === 0 ? (
            <div className="p-4 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-xs font-sans">No recommendations available yet.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendedJobs.map(job => (
                <JobCard key={job.id} job={job} compact />
              ))}
            </div>
          )}
        </div>

        {/* Skill Gap Analysis Banner */}
        <div className="p-8 rounded-[20px] bg-white dark:bg-[#1A1A1A] border border-stone-200/90 dark:border-stone-800 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[11px] font-sans font-semibold px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-[#0F766E] dark:text-teal-400 border border-teal-200 dark:border-teal-800">
              AI Skill Recommendation
            </span>
            <h3 className="text-lg font-bold text-stone-900 dark:text-white font-display">
              Recommendation Banner
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 font-sans">
              Free micro-learning courses available through Chicago Workforce Partners.
            </p>
          </div>
          <Link to="/insights">
            <Button variant="secondary" size="md">
              Explore Modules
            </Button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
};
