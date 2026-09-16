
import { apiClient } from './client';

export interface ResumeAnalysis {
    id: number;
    userId: number;
    score: number;
    strengths: string[];
    weaknesses: string[];
    skillGaps: string[];
    suggestions: string[];
    createdAt?: string;
    updatedAt?: string;
}

export interface JobRecommendation {
    score: number;
    semanticScore: number;
    skillScore: number;
    experienceScore: number;
    preferenceScore: number;
    roleScore: number;
    matchedSkills: string[];
    missingSkills: string[];
    explanation: { summary: string; strengths: string[]; gaps: string[] };
    job: {
        id: number;
        title: string;
        company: string;
        description: string;
        location: string;
        jobType: string;
        salary?: string;
        experience?: string;
        isRemote: boolean;
        skills: { skill: { name: string } }[];
    };
}

export interface JobSkillGap {
    matchedSkills: string[];
    missingSkills: { name: string; priority: string; recommendation: string }[];
    requiredSkillCount: number;
    matchedSkillCount: number;
    coverage: number;
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
    explanation: { summary: string; strengths: string[]; gaps: string[] };
}

export interface RecruiterCandidate {
    userId: number;
    applicationId: number;
    score: number;
    semanticScore: number;
    skillScore: number;
    experienceScore: number;
    matchedSkills: string[];
    missingSkills: string[];
    applicationStatus: string;
    explanation: { summary: string; strengths: string[]; gaps: string[] };
}

export interface RecruiterCandidateRanking {
    jobId: number;
    candidates: RecruiterCandidate[];
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

export const getRecruiterCandidates = async (jobId: number): Promise<RecruiterCandidateRanking> => {
    return apiClient(`/ai/recruiter/jobs/${jobId}/candidates`);
};

export const analyzeResume = async (resumeId: number): Promise<ResumeAnalysis> => {
    return apiClient(`/ai/resumes/${resumeId}/analyze`, { method: 'POST' });
};

export const getResumeAnalysis = async (resumeId: number): Promise<ResumeAnalysis> => {
    return apiClient(`/ai/resumes/${resumeId}/analysis`);
};
