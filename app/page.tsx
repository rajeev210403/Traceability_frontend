"use client";

import { useState } from "react";
import { RepoForm } from "@/components/RepoForm";
import { RequirementInput } from "@/components/RequirementInput";
import { FileList } from "@/components/FileList";
import { useRequirementMapping } from "@/hooks/useRequirementMapping";
import { ModeToggle } from "@/components/ModeToggle";
import { GithubIcon } from "lucide-react";

export default function Home() {
  const { 
    repositoryInfo, 
    requirementMapping, 
    connectRepository, 
    findMatchingFiles 
  } = useRequirementMapping();

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <GithubIcon className="h-6 w-6 mr-2" />
            <h1 className="text-2xl font-bold">ReqMapper</h1>
          </div>
          <ModeToggle />
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <RepoForm onSubmit={connectRepository} />
          </div>
          <div className="lg:col-span-2">
            <div className="space-y-8">
              <RequirementInput 
                onSubmit={findMatchingFiles} 
                isDisabled={!repositoryInfo}
              />
              <FileList 
                files={requirementMapping.files} 
                requirement={requirementMapping.requirement}
                isLoading={requirementMapping.isLoading}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>ReqMapper &copy; {new Date().getFullYear()} - Map requirements to code with ease</p>
        </div>
      </footer>
    </main>
  );
}