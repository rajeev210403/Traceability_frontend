export interface RepositoryInfo {
  repoUrl: string;
  requirementsFolder: string;
}

export interface RequirementFile {
  path: string;
  matchScore: number;
  snippets: string[];
}

export interface RequirementMapping {
  requirement: string;
  files: RequirementFile[];
  isLoading: boolean;
}

export interface BackendResponse {
  success: boolean;
  data?: RequirementFile[];
  error?: string;
}