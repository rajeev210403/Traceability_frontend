"use client";

import { useState } from "react";
import { RepositoryInfo, RequirementFile, RequirementMapping } from "@/lib/types";

export const useRequirementMapping = () => {
  const [repositoryInfo, setRepositoryInfo] = useState<RepositoryInfo | null>(null);
  const [requirementMapping, setRequirementMapping] = useState<RequirementMapping>({
    requirement: "",
    files: [],
    isLoading: false,
  });

  const connectRepository = async (info: RepositoryInfo) => {
    try {
      const response = await fetch('/api/connect-repository', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to connect repository');
      }

      const data = await response.json();
      if (data.success) {
        setRepositoryInfo(info);
      } else {
        throw new Error(data.error || 'Failed to connect repository');
      }
    } catch (error) {
      console.error('Error connecting repository:', error);
      throw error;
    }
  };

  const findMatchingFiles = async (requirement: string) => {
    if (!repositoryInfo) return;

    setRequirementMapping({
      requirement,
      files: [],
      isLoading: true,
    });

    try {
      const response = await fetch('/api/analyze-requirement', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requirement,
          repoUrl: repositoryInfo.repoUrl,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to analyze requirement');
      }

      const data = await response.json();
      
      if (data.success) {
        setRequirementMapping({
          requirement,
          files: data.data || [],
          isLoading: false,
        });
      } else {
        throw new Error(data.error || 'Failed to analyze requirement');
      }
    } catch (error) {
      console.error('Error analyzing requirement:', error);
      setRequirementMapping({
        requirement,
        files: [],
        isLoading: false,
      });
    }
  };

  return {
    repositoryInfo,
    requirementMapping,
    connectRepository,
    findMatchingFiles,
  };
};