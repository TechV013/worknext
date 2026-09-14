import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { useApp } from '../context/AppContext';
import { Resume } from '../types';
import { Button } from '../components/ui/Button';
import { Sparkles, Download, CheckCircle, FileText, Layout, Loader2, Upload, CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react';
import { analyzeResume, ResumeAnalysis } from '../api/ai';
import { getResumes, uploadResume, ResumeRecord } from '../api/resumes';
import { EmptyState } from '../components/ui/EmptyState';

export const ResumeBuilderPage: React.FC = () => {
  const { user } = useApp();
  const [resumes, setResumes] = useState<ResumeRecord[]>([]);
  const [activeResume, setActiveResume] = useState<Resume | null>(null);
  const [template, setTemplate] = useState<Resume['template']>('modern');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [optimizedAlert, setOptimizedAlert] = useState(false);
  const [optimizeError, setOptimizeError] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<ResumeAnalysis | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mapRecordToResume = (record: ResumeRecord): Resume => ({
    id: String(record.id),
    title: record.fileName,
    targetRole: '',
    updatedAt: record.createdAt ?? '',
    score: 0,
    summary: '',
    skills: [],
    experiences: [],
    education: [],
    aiSuggestions: [],
    template: 'modern'
  });

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        setIsLoading(true);
        const data = await getResumes();
        if (data && data.length > 0) {
          setResumes(data);
          setActiveResume(mapRecordToResume(data[0]));
          setTemplate('modern');
        }
      } catch (err) {
        console.error('Failed to load resumes', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResumes();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    setUploadError(null);
    try {
      await uploadResume(file);
      const data = await getResumes();
      if (data && data.length > 0) {
        setResumes(data);
        setActiveResume(mapRecordToResume(data[0]));
        setAnalysisResult(null);
        setTemplate('modern');
      }
    } catch (err) {
      console.error('Upload Error:', err);
      setUploadError('Unable to upload resume. Please try again.');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleOptimizeAI = async () => {
    if (!activeResume) return;
    
    setIsOptimizing(true);
    setOptimizeError(null);
    setAnalysisResult(null);
    try {
      const analysis = await analyzeResume(activeResume.id);
      setAnalysisResult(analysis);
      setActiveResume(prev => prev ? ({
        ...prev,
        score: analysis.score,
        aiSuggestions: analysis.suggestions
      }) : null);
      setOptimizedAlert(true);
      setTimeout(() => setOptimizedAlert(false), 4000);
    } catch (err) {
      console.error('AI Scan Error:', err);
      setOptimizeError("Unable to analyze this resume. Please try again.");
    } finally {
      setIsOptimizing(false);
    }
  };

  const handleTemplateChange = (tpl: Resume['template']) => {
    setTemplate(tpl);
    setActiveResume(prev => prev ? ({ ...prev, template: tpl }) : null);
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-[#0F766E]" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200/80 dark:border-teal-800/50 text-xs font-semibold text-[#0F766E] dark:text-teal-400">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E] dark:bg-teal-400" />
              ATS Resume Optimizer
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 dark:text-white mt-2 font-display">
              AI Resume Builder
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1 font-sans">
              Generate ATS-parsable resumes engineered to pass recruiter screeners.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="md"
              icon={<Upload className="w-4 h-4" />}
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Upload Resume'}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              hidden
              onChange={handleFileUpload}
            />

            <Button
              variant="secondary"
              size="md"
              icon={<Sparkles className="w-4 h-4 text-amber-500" />}
              onClick={handleOptimizeAI}
              disabled={isOptimizing}
            >
              {isOptimizing ? 'Analyzing & Scoring...' : 'Run AI Scan'}
            </Button>

            <Button variant="primary" size="md" icon={<Download className="w-4 h-4" />} onClick={() => window.print()} className="bg-[#0F766E] hover:bg-[#0D655E]">
              Export PDF
            </Button>
          </div>
        </div>

        {uploadError && (
          <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-sans font-medium">
            {uploadError}
          </div>
        )}

        {optimizeError && (
          <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-sans font-medium">
            {optimizeError}
          </div>
        )}

        <AnimatePresence>
          {optimizedAlert && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-[#0F766E] dark:text-teal-300 text-xs flex items-center justify-between font-sans font-medium"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#0F766E] dark:text-teal-400 shrink-0" />
                <span>Resume score {activeResume?.score ?? 0}/100! Analysis complete.</span>
              </div>
              <span className="font-bold cursor-pointer hover:opacity-80" onClick={() => setOptimizedAlert(false)}>✕</span>
            </motion.div>
          )}
        </AnimatePresence>

        {activeResume ? (
          <>
            {/* Template Controls & Score */}
            <div className="p-8 rounded-[20px] bg-white dark:bg-[#1A1A1A] border border-stone-200/90 dark:border-stone-800 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-3">
                <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider font-sans">Formatting Template</p>
                <div className="flex flex-wrap gap-2.5">
                  {(['modern', 'minimal', 'executive', 'tech'] as const).map(tpl => (
                    <button
                      key={tpl}
                      onClick={() => handleTemplateChange(tpl)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer font-sans ${
                        template === tpl
                          ? 'bg-[#0F766E] text-white shadow-xs border border-teal-600'
                          : 'bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:text-stone-900 dark:hover:text-white'
                      }`}
                    >
                      {tpl} Style
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-stone-200 dark:border-stone-800 pt-6 md:pt-0 md:pl-8 w-full md:w-auto">
                <div>
                  <p className="text-xs font-medium text-stone-500 dark:text-stone-400 font-sans">Readability & Match Index</p>
                  <p className="text-3xl font-extrabold font-display text-[#0F766E] dark:text-teal-400 mt-1">
                    {activeResume.score}%
                  </p>
                </div>
                <div className="w-28 h-2.5 rounded-full bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-0.5 overflow-hidden">
                  <div className="h-full bg-[#0F766E] dark:bg-teal-400 rounded-full" style={{ width: `${activeResume.score}%` }} />
                </div>
              </div>
            </div>


            {/* AI Analysis Results */}
            {analysisResult && (
              <div className="p-8 rounded-[20px] bg-white dark:bg-[#1A1A1A] border border-stone-200/90 dark:border-stone-800 shadow-xs space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-base font-bold text-stone-900 dark:text-white flex items-center gap-2.5 font-display">
                    <Sparkles className="w-5 h-5 text-[#0F766E] dark:text-teal-400" /> AI Resume Analysis
                  </h2>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-stone-500 dark:text-stone-400 font-sans">Resume Score</span>
                    <span className="text-3xl font-extrabold font-display text-[#0F766E] dark:text-teal-400">{analysisResult.score}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0F766E] dark:text-teal-400 font-sans flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Strengths
                    </h4>
                    {analysisResult.strengths && analysisResult.strengths.length > 0 ? (
                      <ul className="space-y-2">
                        {analysisResult.strengths.map((s, i) => (
                          <li key={i} className="text-xs text-stone-700 dark:text-stone-300 flex items-start gap-2 font-sans">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-stone-400 font-sans">No strengths returned.</p>
                    )}
                  </div>

                  <div className="space-y-2.5">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 font-sans flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" /> Weaknesses
                    </h4>
                    {analysisResult.weaknesses && analysisResult.weaknesses.length > 0 ? (
                      <ul className="space-y-2">
                        {analysisResult.weaknesses.map((w, i) => (
                          <li key={i} className="text-xs text-stone-700 dark:text-stone-300 flex items-start gap-2 font-sans">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                            {w}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-stone-400 font-sans">No weaknesses returned.</p>
                    )}
                  </div>

                  <div className="space-y-2.5">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400 font-sans flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" /> Skill Gaps
                    </h4>
                    {analysisResult.skillGaps && analysisResult.skillGaps.length > 0 ? (
                      <ul className="space-y-2">
                        {analysisResult.skillGaps.map((g, i) => (
                          <li key={i} className="text-xs text-stone-700 dark:text-stone-300 flex items-start gap-2 font-sans">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                            {g}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-stone-400 font-sans">No skill gaps returned.</p>
                    )}
                  </div>

                  <div className="space-y-2.5">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0F766E] dark:text-teal-400 font-sans flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4" /> Suggestions
                    </h4>
                    {analysisResult.suggestions && analysisResult.suggestions.length > 0 ? (
                      <ul className="space-y-2">
                        {analysisResult.suggestions.map((s, i) => (
                          <li key={i} className="text-xs text-stone-700 dark:text-stone-300 flex items-start gap-2 font-sans">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E] mt-1.5 shrink-0" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-stone-400 font-sans">No suggestions returned.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Main Editor & Live Preview Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Editor Controls */}
              <div className="lg:col-span-6 space-y-6">
                <div className="p-8 rounded-[20px] bg-white dark:bg-[#1A1A1A] border border-stone-200/90 dark:border-stone-800 shadow-xs space-y-5">
                  <h2 className="text-base font-bold text-stone-900 dark:text-white flex items-center gap-2.5 font-display">
                    <FileText className="w-5 h-5 text-[#0F766E] dark:text-teal-400" /> Target Role & Summary
                  </h2>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 font-sans">
                      Target Role Title
                    </label>
                    <input
                      type="text"
                      value={activeResume.targetRole}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setActiveResume(prev => prev ? ({ ...prev, targetRole: e.target.value }) : null)}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-xs text-stone-900 dark:text-white focus:outline-none focus:border-[#0F766E] transition-colors font-sans"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 font-sans">
                      Executive Profile Summary
                    </label>
                    <textarea
                      rows={3}
                      value={activeResume.summary}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setActiveResume(prev => prev ? ({ ...prev, summary: e.target.value }) : null)}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-xs text-stone-900 dark:text-white focus:outline-none focus:border-[#0F766E] font-sans leading-relaxed transition-colors"
                    />
                  </div>
                </div>

                {/* Experience list */}
                <div className="p-8 rounded-[20px] bg-white dark:bg-[#1A1A1A] border border-stone-200/90 dark:border-stone-800 shadow-xs space-y-5">
                  <h2 className="text-base font-bold text-stone-900 dark:text-white flex items-center gap-2.5 font-display">
                    <Layout className="w-5 h-5 text-[#0F766E] dark:text-teal-400" /> Professional Experience
                  </h2>

                  {activeResume.experiences.map((exp) => (
                    <div key={exp.id} className="p-5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-2.5 font-sans">
                      <div className="flex justify-between items-center text-xs font-bold text-stone-900 dark:text-white">
                        <span>{exp.role} @ {exp.company}</span>
                        <span className="text-stone-500 font-normal text-[11px]">{exp.startDate} - {exp.endDate}</span>
                      </div>
                      <ul className="list-disc list-inside space-y-1.5 text-xs text-stone-600 dark:text-stone-300">
                        {exp.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Live Resume Document Preview */}
              <div className="lg:col-span-6">
                <div className="sticky top-24 p-8 rounded-[20px] bg-white dark:bg-[#1A1A1A] border border-stone-200/90 dark:border-stone-800 shadow-xs space-y-6 min-h-[550px] text-stone-900 dark:text-white font-sans">
                  <div className="border-b border-stone-200 dark:border-stone-800 pb-4 text-center space-y-1">
                    <h2 className="text-2xl font-extrabold tracking-tight text-stone-900 dark:text-white font-display uppercase">{user.name}</h2>
                    <p className="text-xs text-[#0F766E] dark:text-teal-400 font-semibold tracking-wider uppercase font-sans">{activeResume.targetRole}</p>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 font-sans">{user.location} • {user.email} • +1 (555) 234-5678</p>
                  </div>

                  {/* Summary */}
                  <div>
                    <h3 className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2 border-b border-stone-100 dark:border-stone-800 pb-1 font-sans">
                      Professional Summary
                    </h3>
                    <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed font-sans font-normal">
                      {activeResume.summary}
                    </p>
                  </div>

                  {/* Experience */}
                  <div>
                    <h3 className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-3 border-b border-stone-100 dark:border-stone-800 pb-1 font-sans">
                      Work Experience
                    </h3>
                    <div className="space-y-4">
                      {activeResume.experiences.map(exp => (
                        <div key={exp.id}>
                          <div className="flex justify-between items-baseline text-xs font-bold text-stone-900 dark:text-white font-display">
                            <span>{exp.role} — <span className="font-normal text-stone-500 font-sans">{exp.company}</span></span>
                            <span className="text-[11px] text-stone-400 font-sans">{exp.startDate} - {exp.endDate}</span>
                          </div>
                          <ul className="mt-2 space-y-1.5 font-sans">
                            {exp.highlights.map((hl, i) => (
                              <li key={i} className="text-xs text-stone-600 dark:text-stone-300 flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0F766E] dark:bg-teal-400 mt-1.5 shrink-0" />
                                <span>{hl}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills */}
                  <div>
                    <h3 className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2 border-b border-stone-100 dark:border-stone-800 pb-1 font-sans">
                      Technical Core Competencies
                    </h3>
                    <div className="flex flex-wrap gap-1.5 font-sans">
                      {activeResume.skills.map((s, idx) => (
                        <span key={idx} className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <EmptyState
            title="No Resumes Found"
            description="Upload a PDF, DOC, or DOCX resume to run the AI pipeline."
            actionText="Upload Resume"
            onAction={() => fileInputRef.current?.click()}
          />
        )}
      </div>
    </DashboardLayout>
  );
};