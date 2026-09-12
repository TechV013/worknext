
import { apiClient } from './client';

export interface ResumeAnalysis {
    id: number;
    score: number;
    strengths: string[];
    weaknesses: string[];
    missingSkills: string[];
    suggestions: string[];
}

export interface JobRecommendation {
    id: string;
    title: string;
    company: string;
    matchScore: number;
}

export interface JobSkillGap {
    jobId: number;
    gaps: string[];
}

export interface JobMatch {
    jobId: number;
    score: number;
    semanticScore: number;
    skillScore: number;
    experienceScore: number;
    preferenceScore: number;
    roleScore: number;
    matchedSkills: string[];
    missingSkills: string[];
    explanation: string;
}

export interface RecruiterCandidateRanking {
    candidateId: string;
    userId: string;
    applicationId: string;
    name: string;
    rank: number;
    score: number;
    matchedSkills: string[];
    missingSkills: string[];
    applicationStatus: string;
    explanation: string;
}

export const getRecommendedJobs = async (limit?: number): Promise<JobRecommendation[]> => {
    return apiClient(`/ai/jobs/recommended?limit=${limit || 10}`);
};

export const getJobSkillGaps = async (jobId: number): Promise<JobSkillGap> => {
    return apiClient(`/ai/jobs/${jobId}/skill-gaps`);
};

export const getJobMatch = async (jobId: number | string): Promise<JobMatch> => {
    const numericId = typeof jobId === 'string' ? parseInt(jobId.replace('job_', '')) : jobId;
    return apiClient(`/ai/jobs/${numericId}/match`);
};

export const getRecruiterCandidates = async (jobId: number): Promise<RecruiterCandidateRanking[]> => {
    return apiClient(`/ai/recruiter/jobs/${jobId}/candidates`);
};

export const analyzeResume = async (resumeId: string): Promise<ResumeAnalysis> => { // Changed resumeId to string to match mockData
    return apiClient(`/ai/resumes/${resumeId}/analyze`, { method: 'POST' });
};

export const getResumeAnalysis = async (resumeId: string): Promise<ResumeAnalysis> => {
    return apiClient(`/ai/resumes/${resumeId}/analysis`);
};
