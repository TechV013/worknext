
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { useApp } from '../context/AppContext';
import { Job } from '../types';
import { JobCard } from '../components/cards/JobCard';
import { JobFilterForm } from '../components/forms/JobFilterForm';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { Sparkles, X, CheckCircle2, Loader2 } from 'lucide-react';
import { getJobSkillGaps, getJobMatch, JobMatch } from '../api/ai';

export const LocalJobFinderPage: React.FC = () => {
  const { jobs, applyForJob, appliedJobIds, savedJobIds, toggleSaveJob } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedExp, setSelectedExp] = useState('');
  const [isRemoteOnly, setIsRemoteOnly] = useState(false);
  const [minMatchScore, setMinMatchScore] = useState(50);

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [aiData, setAiData] = useState<{ gaps: string[] } | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  
  const [matchData, setMatchData] = useState<JobMatch | null>(null);
  const [matchLoading, setMatchLoading] = useState(false);
  const [matchError, setMatchError] = useState<string | null>(null);

  const handleSelectJob = async (job: Job) => {
    setSelectedJob(job);
    setAiLoading(true);
    setAiData(null);
    setAiError(null);
    setMatchLoading(true);
    setMatchData(null);
    setMatchError(null);

    const jobId = parseInt(job.id.replace('job_', ''));

    // Fetch Skill Gaps
    getJobSkillGaps(jobId)
        .then(data => setAiData({ gaps: data.gaps }))
        .catch(() => setAiError('Unable to load AI skill data.'))
        .finally(() => setAiLoading(false));

    // Fetch Job Match
    getJobMatch(jobId)
        .then(data => setMatchData(data))
        .catch(() => setMatchError('Match score not available yet.'))
        .finally(() => setMatchLoading(false));
  };

  const handleReset = () => {
    setSearchQuery('');
    setLocationFilter('');
    setSelectedType('');
    setSelectedExp('');
    setIsRemoteOnly(false);
    setMinMatchScore(50);
  };

  const filteredJobs = jobs.filter(job => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const titleMatch = job.title.toLowerCase().includes(q);
      const companyMatch = job.company.toLowerCase().includes(q);
      const reqMatch = job.requirements.some(r => r.toLowerCase().includes(q));
      if (!titleMatch && !companyMatch && !reqMatch) return false;
    }

    if (locationFilter.trim()) {
      if (!job.location.toLowerCase().includes(locationFilter.toLowerCase())) return false;
    }

    if (selectedType && job.type !== selectedType) return false;
    if (selectedExp && job.experienceLevel !== selectedExp) return false;
    if (isRemoteOnly && !job.isRemote) return false;
    if (job.matchScore < minMatchScore) return false;

    return true;
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Title */}
        <div>
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200/80 dark:border-teal-800/50 text-xs font-semibold text-[#0F766E] dark:text-teal-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E] dark:bg-teal-400" />
            Regional Job Engine
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 dark:text-white mt-2 font-display">
            Local Job & Skill Finder
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1 font-sans">
            Discover verified openings filtered by ZIP code, skill readiness, and wage transparency.
          </p>
        </div>

        {/* Filters */}
        <JobFilterForm
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          locationFilter={locationFilter}
          onLocationChange={setLocationFilter}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          selectedExp={selectedExp}
          onExpChange={setSelectedExp}
          isRemoteOnly={isRemoteOnly}
          onRemoteToggle={setIsRemoteOnly}
          minMatchScore={minMatchScore}
          onMatchScoreChange={setMinMatchScore}
          onReset={handleReset}
        />

        {/* Results Counter Bar */}
        <div className="flex items-center justify-between text-xs font-sans text-stone-500 dark:text-stone-400 px-1">
          <span>Showing {filteredJobs.length} verified position{filteredJobs.length === 1 ? '' : 's'}</span>
          <span className="text-[#0F766E] dark:text-teal-400 flex items-center gap-1.5 font-bold">
            <Sparkles className="w-3.5 h-3.5" /> AI Skill Matching Active
          </span>
        </div>

        {/* Jobs List */}
        {filteredJobs.length === 0 ? (
          <EmptyState
            title="No matching job listings found"
            description="Try lowering your minimum AI match score or clearing location filters."
            actionText="Reset All Filters"
            onAction={handleReset}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map(job => (
              <JobCard key={job.id} job={job} onSelect={j => handleSelectJob(j)} />
            ))}
          </div>
        )}

        {/* Job Detail Modal */}
        <AnimatePresence>
          {selectedJob && (
            <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-[#1A1A1A] border border-stone-200 dark:border-stone-800 rounded-[20px] shadow-lg w-full max-w-2xl max-h-[85vh] overflow-y-auto p-8 space-y-6 text-stone-900 dark:text-white"
              >
                {/* Modal Header */}
                <div className="flex items-start justify-between gap-4 border-b border-stone-100 dark:border-stone-800 pb-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedJob.companyLogo}
                      alt={selectedJob.company}
                      className="w-14 h-14 rounded-2xl object-cover border border-stone-200 dark:border-stone-800 shrink-0 bg-stone-50"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-stone-900 dark:text-white font-display">{selectedJob.title}</h3>
                      <p className="text-xs text-stone-500 dark:text-stone-400 font-sans mt-0.5">{selectedJob.company} • {selectedJob.location}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* AI Match Area */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Match Score */}
                   <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800">
                        {matchLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 
                        matchError ? <p className="text-xs text-amber-600">{matchError}</p> :
                        matchData ? (
                            <>
                                <h4 className="text-xs font-bold font-display">AI Match</h4>
                                <p className="text-2xl font-extrabold text-[#0F766E] dark:text-teal-400">{matchData.score}%</p>
                                <div className="text-xs mt-2 space-y-1">
                                    <p>Semantic: {matchData.semanticScore}%</p>
                                    <p>Skills: {matchData.skillScore}%</p>
                                    <p>Experience: {matchData.experienceScore}%</p>
                                    <p>Preferences: {matchData.preferenceScore}%</p>
                                    <p>Role: {matchData.roleScore}%</p>
                                </div>
                            </>
                        ) : null}
                   </div>
                    
                    {/* Skill Analysis */}
                    <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 space-y-3">
                        <h4 className="text-xs font-bold text-stone-900 dark:text-white font-display flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-teal-600"/> AI Skill Analysis
                        </h4>
                        {aiLoading ? <Loader2 className="w-5 h-5 animate-spin"/> :
                         aiError ? <p className="text-xs text-red-500">{aiError}</p> :
                         aiData ? (
                            <div className="text-xs">
                              <p className="font-semibold">Missing Skills:</p>
                              <ul className="list-disc ml-4">
                                {aiData.gaps.length > 0 ? aiData.gaps.map(g => <li key={g}>{g}</li>) : <li>None!</li>}
                              </ul>
                            </div>
                         ) : null}
                    </div>
                </div>

                {/* Job Description */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 font-sans">Position Overview</h4>
                  <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-sans font-normal">
                    {selectedJob.description}
                  </p>
                </div>

                {/* Requirements */}
                <div className="space-y-3 font-sans">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 font-sans">Core Requirements</h4>
                  <ul className="space-y-2">
                    {selectedJob.requirements.map((req, i) => (
                      <li key={i} className="text-xs text-stone-700 dark:text-stone-300 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#0F766E] dark:text-teal-400 mt-0.5 shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Modal Actions */}
                <div className="pt-6 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-4 font-sans">
                  <Button variant="outline" size="sm" onClick={() => toggleSaveJob(selectedJob.id)}>
                    {savedJobIds.includes(selectedJob.id) ? 'Saved' : 'Save Opening'}
                  </Button>

                  {appliedJobIds.includes(selectedJob.id) ? (
                    <Button variant="outline" size="md" disabled className="text-[#0F766E] border-teal-200 bg-teal-50">
                      <CheckCircle2 className="w-4 h-4" /> Application Submitted
                    </Button>
                  ) : (
                    <Button variant="primary" size="md" onClick={() => applyForJob(selectedJob.id)} className="bg-[#0F766E] hover:bg-[#0D655E]">
                      Submit Direct Application
                    </Button>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
};
