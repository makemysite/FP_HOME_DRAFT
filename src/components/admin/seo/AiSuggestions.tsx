
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles, AlertCircle } from 'lucide-react';

interface AiSuggestionsProps {
  suggestions: string[];
  isLoading?: boolean;
  error?: string;
}

const AiSuggestions: React.FC<AiSuggestionsProps> = ({ 
  suggestions, 
  isLoading = false,
  error
}) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          <CardTitle>AI-Powered SEO Suggestions</CardTitle>
        </div>
        <CardDescription>
          Generated with Google Gemini AI based on the analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-6 space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
            <p className="text-sm text-muted-foreground">Generating AI suggestions...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <p className="text-red-800 text-sm font-medium">Error generating suggestions</p>
                <p className="text-red-700 text-sm mt-1">{error}</p>
              </div>
            </div>
          </div>
        ) : suggestions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No AI suggestions available yet.</p>
            <p className="text-sm mt-2">Run an SEO scan to get Gemini-powered recommendations.</p>
          </div>
        ) : (
          <ScrollArea className="h-[300px] pr-4">
            <ul className="space-y-4">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="bg-purple-50 border-l-4 border-purple-500 p-3 rounded-sm">
                  <p className="text-sm">{suggestion}</p>
                </li>
              ))}
            </ul>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default AiSuggestions;
