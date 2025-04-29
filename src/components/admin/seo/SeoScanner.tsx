
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Scan, Loader2, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { analyzePage, saveReport } from '@/services/seoBot';
import { generateSeoSuggestions } from '@/services/geminiAiService';

interface SeoScannerProps {
  onScanComplete: (report: any) => void;
  geminiApiKey: string;
}

const SeoScanner: React.FC<SeoScannerProps> = ({ onScanComplete, geminiApiKey }) => {
  const [url, setUrl] = useState('https://fieldpromax.com');
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async () => {
    if (!url) {
      toast.error('Please enter a valid URL');
      return;
    }

    try {
      setIsScanning(true);
      setError(null);
      toast.info('Scanning website for SEO factors...');

      // Test if the URL is valid and accessible
      try {
        const testResponse = await fetch(url, { method: 'HEAD' });
        if (!testResponse.ok) {
          throw new Error(`Could not access URL: ${testResponse.statusText}`);
        }
      } catch (urlError) {
        console.error('URL access error:', urlError);
        toast.error(`Could not access the URL. Please check if it's valid and accessible.`);
        setIsScanning(false);
        setError('Could not access the URL. Please check if it\'s valid and accessible.');
        return;
      }

      // Analyze the page
      console.log('Starting page analysis...');
      const report = await analyzePage(url);
      console.log('Page analysis complete:', report);

      // If Gemini API key is provided, get AI suggestions
      if (geminiApiKey) {
        console.log('Generating AI suggestions with Gemini...');
        try {
          // Fetch the HTML content for AI analysis
          const pageResponse = await fetch(url);
          const htmlContent = await pageResponse.text();
          
          // Generate AI suggestions
          const aiResponse = await generateSeoSuggestions(
            geminiApiKey,
            url,
            htmlContent,
            report.factors
          );
          
          console.log('AI suggestions response:', aiResponse);
          
          if (aiResponse.error) {
            console.error('Error from Gemini API:', aiResponse.error);
            toast.warning(`AI suggestions error: ${aiResponse.error}. Using standard analysis only.`);
          }
          
          if (aiResponse.suggestions?.length) {
            report.aiSuggestions = aiResponse.suggestions;
          }
        } catch (aiError) {
          console.error('Error getting AI suggestions:', aiError);
          toast.error('Could not generate AI suggestions. Continuing with standard analysis.');
        }
      } else {
        console.log('No Gemini API key provided, using fallback suggestions.');
        report.aiSuggestions = [
          'Add Gemini API key to get AI-powered suggestions.',
          'Configure your content structure for better keyword relevance.',
          'Consider expanding keyword coverage for more topic authority.'
        ];
      }

      console.log('Saving report to database...');
      // Save report to database
      await saveReport(report);
      console.log('Report saved successfully');
      
      // Update UI with report
      onScanComplete(report);
      
      toast.success('SEO scan completed successfully!');
    } catch (error) {
      console.error('Error scanning website:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      toast.error(`Failed to scan website: ${errorMessage}`);
      setError(`Scan failed: ${errorMessage}`);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Scan className="h-5 w-5" />
          SEO Scanner
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Website URL to scan</Label>
            <div className="flex gap-2">
              <Input 
                id="url" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://fieldpromax.com"
                disabled={isScanning}
              />
              <Button 
                onClick={handleScan}
                disabled={isScanning}
              >
                {isScanning ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Scanning...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Scan Now
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {error && (
            <div className="bg-red-50 p-3 rounded-md border border-red-200 flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <div className="text-sm text-muted-foreground">
            <p>This will check your website for common SEO issues and generate suggestions for improvement.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SeoScanner;
