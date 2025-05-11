"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { GithubIcon } from "lucide-react";
import { RepositoryInfo } from "@/lib/types";

interface RepoFormProps {
  onSubmit: (data: RepositoryInfo) => void;
}

export function RepoForm({ onSubmit }: RepoFormProps) {
  const [repoUrl, setRepoUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!repoUrl.trim()) {
      setError("Repository URL is required");
      return;
    }
    
    // Basic GitHub URL validation
    const githubUrlPattern = /^https:\/\/github\.com\/[^\/]+\/[^\/]+/;
    if (!githubUrlPattern.test(repoUrl)) {
      setError("Please enter a valid GitHub repository URL");
      return;
    }
    
    setError(null);
    onSubmit({ repoUrl });
  };

  return (
    <Card className="w-full transition-all hover:shadow-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Repository Information</CardTitle>
        <CardDescription>
          Enter the GitHub repository URL to analyze requirements
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="repo-url">GitHub Repository URL</Label>
            <div className="flex items-center relative">
              <GithubIcon className="w-5 h-5 absolute left-3 text-muted-foreground" />
              <Input
                id="repo-url"
                placeholder="https://github.com/username/repository"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="pl-10"
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
          
          <Button 
            type="submit" 
            className="w-full group"
          >
            <span className="group-hover:translate-x-1 transition-transform">
              Connect Repository
            </span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}