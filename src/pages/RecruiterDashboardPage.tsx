
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { mockCurrentUser } from '../data/mockData';
import { Job } from '../types';
import { Plus, CheckCircle2, Sparkles, X } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { getRecruiterCandidates } from '../api/ai';
import { RecruiterCandidateRanking } from '../api/ai';
import { Loader2 } from 'lucide-react';

export const RecruiterDashboardPage: React.FC = () => {
  const [jobsList, setJobsList] = useState<Job[]>([]);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [postedSuccessAlert, setPostedSuccessAlert] = useState(false);
  const [candidates, setCandidates] = useState<RecruiterCandidateRanking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const [newJob, setNewJob] = useState({
    title: '',
    company: 'Apex Solutions Tech',
    location: 'Chicago, IL',
    isRemote: true,
    type: 'Full-time' as const,
    category: 'Software Engineering',
    salaryMin: 90000,
    salaryMax: 120000,
    description: '',
    requirements: 'React, TypeScript, Tailwind CSS, REST APIs'
  });

  useEffect(() => {
    const initialJob: Job = {
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
      postedDate: 'Just now',
      description: '',
      requirements: [],
      matchScore: 95,
      skillGaps: [],
      applicantsCount: 1,
      experienceLevel: 'Mid-Level'
    };
    setJobsList([initialJob]);
    fetchCandidates(initialJob.id);
  }, []);

  const fetchCandidates = async (jobId: string) => {
    setIsLoading(true);
    setAiError(null);
    try {
      const numericId = parseInt(jobId.replace('job_', ''));
      const data = await getRecruiterCandidates(numericId);
      setCandidates(data);
    } catch (err) {
      setAiError('Unable to load AI ranking.');
      setCandidates([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Job = {
      id: 'job_' + Date.now(),
      title: newJob.title || 'Software Engineer',
      company: newJob.company,
      companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=120',
      location: newJob.location,
      isRemote: newJob.isRemote,
      type: newJob.type,
      category: newJob.category,
      salaryMin: Number(newJob.salaryMin),
      salaryMax: Number(newJob.salaryMax),
      salaryPeriod: 'year',
      postedDate: 'Just now',
      description: newJob.description || 'Exciting position for an engineer looking to build scalable UI systems.',
      requirements: newJob.requirements.split(',').map(r => r.trim()),
      matchScore: 95,
      skillGaps: [],
      applicantsCount: 1,
      experienceLevel: 'Mid-Level'
    };

    setJobsList([created, ...jobsList]);
    setPostModalOpen(false);
    setPostedSuccessAlert(true);
    setTimeout(() => setPostedSuccessAlert(false), 4000);
    fetchCandidates(created.id);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200/80 dark:border-teal-800/50 text-xs font-semibold text-[#0F766E] dark:text-teal-400">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E] dark:bg-teal-400" />
              Employer Talent Portal
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 dark:text-white mt-2 font-display">
              Recruiter Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1 font-sans">
              Source pre-vetted candidates matched by verified skill competency rather than arbitrary filters.
            </p>
          </div>

          <Button
            variant="primary"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setPostModalOpen(true)}
            className="bg-[#0F766E] hover:bg-[#0D655E]"
          >
            Post Opening
          </Button>
        </div>

        <AnimatePresence>
          {postedSuccessAlert && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-[#0F766E] dark:text-teal-300 text-xs font-sans font-medium flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0F766E] dark:text-teal-400 shrink-0" />
                <span>Job opening posted live! WorkNext AI match engine is routing candidates.</span>
              </div>
              <span className="font-bold cursor-pointer hover:opacity-80" onClick={() => setPostedSuccessAlert(false)}>✕</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recruiter Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="p-6 rounded-[20px] bg-white dark:bg-[#1A1A1A] border border-stone-200/90 dark:border-stone-800 shadow-xs space-y-2">
            <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider font-sans">Active Postings</p>
            <p className="text-3xl font-extrabold text-stone-900 dark:text-white font-display">{jobsList.length}</p>
            <p className="text-[11px] font-sans text-[#0F766E] dark:text-teal-400 font-bold">Open Positions</p>
          </div>

          <div className="p-6 rounded-[20px] bg-white dark:bg-[#1A1A1A] border border-stone-200/90 dark:border-stone-800 shadow-xs space-y-2">
            <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider font-sans">Matched Applicants</p>
            <p className="text-3xl font-extrabold text-[#0F766E] dark:text-teal-400 font-display">--</p>
            <p className="text-[11px] font-sans text-stone-500 dark:text-stone-400">Applications Pending</p>
          </div>

          <div className="p-6 rounded-[20px] bg-white dark:bg-[#1A1A1A] border border-stone-200/90 dark:border-stone-800 shadow-xs space-y-2">
            <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider font-sans">Time-to-Hire</p>
            <p className="text-3xl font-extrabold text-stone-900 dark:text-white font-display">--</p>
            <p className="text-[11px] text-stone-500 dark:text-stone-400 font-sans font-normal">Skill-based vetting</p>
          </div>
        </div>

        {/* Pre-vetted Candidate Pipeline */}
        <div className="p-8 rounded-[20px] bg-white dark:bg-[#1A1A1A] border border-stone-200/90 dark:border-stone-800 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-stone-900 dark:text-white flex items-center gap-2.5 font-display">
                <Sparkles className="w-5 h-5 text-[#0F766E] dark:text-teal-400" /> High-Compatibility Candidate Pool
              </h2>
            </div>
            <span className="text-xs font-sans text-stone-500 dark:text-stone-400">AI Ranked</span>
          </div>

          {isLoading ? (
            <div className="flex justify-center p-8"><Loader2 className="w-8 h-8 animate-spin text-[#0F766E]"/></div>
          ) : aiError ? (
            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 text-xs font-sans font-medium">{aiError}</div>
          ) : candidates.length === 0 ? (
            <div className="p-4 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-xs font-sans">No candidates available.</div>
          ) : (
            <div className="space-y-3 font-sans">
              {candidates.map((cand, i) => (
                <div key={cand.candidateId || i} className="p-5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <img src={mockCurrentUser.avatar} alt={cand.name} className="w-11 h-11 rounded-xl object-cover border border-stone-200 dark:border-stone-800" />
                    <div>
                      <h4 className="text-sm font-bold text-stone-900 dark:text-white font-display">{cand.name}</h4>
                      <p className="text-xs text-[#0F766E] dark:text-teal-400 font-medium">User ID: {cand.userId}</p>
                      <div className="flex gap-1.5 mt-2">
                        {cand.matchedSkills.map((s, idx) => (
                          <span key={idx} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-stone-200/60 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <span className="text-xs font-bold text-[#0F766E] dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 px-3 py-1 rounded-full font-sans">
                      {cand.score}% Match
                    </span>
                    <div className="flex gap-2">
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-stone-200/60 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                        {cand.applicationStatus}
                      </span>
                      <Button variant="outline" size="sm">
                        Interview
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Job Post Modal */}
        <AnimatePresence>
          {postModalOpen && (
            <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.2 }}
                className="bg-white dark:bg-[#1A1A1A] border border-stone-200 dark:border-stone-800 rounded-[20px] shadow-lg w-full max-w-lg p-8 space-y-5 text-stone-900 dark:text-white"
              >
                <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4 font-display">
                  <h3 className="text-lg font-bold text-stone-900 dark:text-white">Post New Job Opening</h3>
                  <button onClick={() => setPostModalOpen(false)} className="p-1 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleCreatePost} className="space-y-4 text-xs font-sans">
                  <div className="space-y-1">
                    <label className="block font-semibold text-stone-700 dark:text-stone-300">Job Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Senior Frontend Engineer"
                      value={newJob.title}
                      onChange={e => setNewJob({ ...newJob, title: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-white focus:outline-none focus:border-[#0F766E]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="block font-semibold text-stone-700 dark:text-stone-300">Location</label>
                      <input
                        type="text"
                        value={newJob.location}
                        onChange={e => setNewJob({ ...newJob, location: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-white focus:outline-none focus:border-[#0F766E]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block font-semibold text-stone-700 dark:text-stone-300">Type</label>
                      <select
                        value={newJob.type}
                        onChange={e => setNewJob({ ...newJob, type: e.target.value as any })}
                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-white focus:outline-none focus:border-[#0F766E]"
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Contract">Contract</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block font-semibold text-stone-700 dark:text-stone-300">Required Skills (CSV)</label>
                    <input
                      type="text"
                      value={newJob.requirements}
                      onChange={e => setNewJob({ ...newJob, requirements: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-white focus:outline-none focus:border-[#0F766E]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block font-semibold text-stone-700 dark:text-stone-300">Job Description</label>
                    <textarea
                      rows={3}
                      value={newJob.description}
                      onChange={e => setNewJob({ ...newJob, description: e.target.value })}
                      placeholder="Describe role responsibilities..."
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-white focus:outline-none focus:border-[#0F766E]"
                    />
                  </div>

                  <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex justify-end gap-3 font-sans">
                    <Button variant="outline" size="sm" type="button" onClick={() => setPostModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button variant="primary" size="sm" type="submit" className="bg-[#0F766E] hover:bg-[#0D655E]">
                      Publish Position
                    </Button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
};
