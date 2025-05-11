"use client";

import { RequirementFile } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Code, FileText, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FileListProps {
  files: RequirementFile[];
  requirement: string;
  isLoading: boolean;
}

export function FileList({ files, requirement, isLoading }: FileListProps) {
  if (isLoading) {
    return (
      <Card className="w-full h-[400px] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2 text-lg">Analyzing repository...</p>
      </Card>
    );
  }

  if (!requirement) {
    return (
      <Card className="w-full h-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl">Matching Files</CardTitle>
          <CardDescription>
            Enter a requirement to see matching files
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <div className="text-center text-muted-foreground">
            <FileText className="h-16 w-16 mx-auto mb-4 opacity-20" />
            <p>No requirement specified</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Matching Files</CardTitle>
        <CardDescription>
          Files that match the requirement: <span className="font-medium">&quot;{requirement}&quot;</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {files.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="h-16 w-16 mx-auto mb-4 opacity-20" />
            <p>No matching files found</p>
          </div>
        ) : (
          <ScrollArea className="h-[300px] pr-4">
            <AnimatePresence>
              {files.map((file, index) => (
                <motion.div
                  key={file.path}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="p-4 rounded-lg border mb-4 hover:bg-accent transition-colors group">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <Code className="h-5 w-5 mr-2 text-primary group-hover:scale-110 transition-transform" />
                        <h3 className="font-medium">{file.path}</h3>
                      </div>
                      <div className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs">
                        {Math.round(file.matchScore * 100)}% match
                      </div>
                    </div>
                    
                    {file.snippets.length > 0 && (
                      <div className="mt-3">
                        <p className="text-sm text-muted-foreground mb-2">Relevant snippets:</p>
                        {file.snippets.map((snippet, i) => (
                          <div key={i} className="mt-2">
                            <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                              <code>{snippet}</code>
                            </pre>
                            {i < file.snippets.length - 1 && <Separator className="my-2" />}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}