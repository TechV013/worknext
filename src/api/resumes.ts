import { apiClient } from './client';

export interface ResumeRecord {
  id: number;
  userId: number;
  fileName: string;
  filePath: string;
  mimeType: string;
  size: number;
  createdAt?: string;
}

export const getResumes = async (): Promise<ResumeRecord[]> => {
  return apiClient('/resumes');
};

export const uploadResume = async (file: File): Promise<{ message: string; resume: ResumeRecord }> => {
  const formData = new FormData();
  formData.append('resume', file);
  return apiClient('/resumes', { method: 'POST', body: formData });
};