
import { apiClient } from './client';
import { Resume } from '../types';

export const getResumes = async (): Promise<Resume[]> => {
  return apiClient('/resumes');
};
