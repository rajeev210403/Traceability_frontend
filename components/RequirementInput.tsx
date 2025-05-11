"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Search } from "lucide-react";

interface RequirementInputProps {
  onSubmit: (requirement: string) => void;
  isDisabled: boolean;
}

export function RequirementInput({ onSubmit, isDisabled }: RequirementInputProps) {
  const [requirement, setRequirement] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (requirement.trim()) {
      onSubmit(requirement.trim());
    }
  };

  return (
    <Card className={`w-full transition-all ${isDisabled ? 'opacity-70' : 'hover:shadow-md'}`}>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Requirement Mapping</CardTitle>
        <CardDescription>
          Enter a specific requirement to find matching files
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="requirement">Requirement</Label>
            <Textarea
              id="requirement"
              placeholder="Enter a natural language requirement..."
              value={requirement}
              onChange={(e) => setRequirement(e.target.value)}
              className="min-h-[100px] resize-none"
              disabled={isDisabled}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full group"
            disabled={isDisabled || !requirement.trim()}
          >
            <Search className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
            <span>Find Matching Files</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}