
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Scan, Loader2 } from 'lucide-react';
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

  const handleScan = async () => {
    if (!url) {
      toast.error('Please enter a valid URL');
      return;
    }

    try {
      setIsScanning(true);
      toast.info('Scanning website for SEO factors...');

      // Analyze the page
      const report = await analyzePage(url);

      // If Gemini API key is provided, get AI suggestions
      if (geminiApiKey) {
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
          
          if (aiResponse.suggestions?.length) {
            report.aiSuggestions = aiResponse.suggestions;
          }
        } catch (aiError) {
          console.error('Error getting AI suggestions:', aiError);
          toast.error('Could not generate AI suggestions. Continuing with standard analysis.');
        }
      } else {
        report.aiSuggestions = [
          'Add Gemini API key to get AI-powered suggestions.',
          'Configure your content structure for better keyword relevance.',
          'Consider expanding keyword coverage for more topic authority.'
        ];
      }

      // Save report to database
      await saveReport(report);
      
      // Update UI with report
      onScanComplete(report);
      
      toast.success('SEO scan completed successfully!');
    } catch (error) {
      console.error('Error scanning website:', error);
      toast.error('Failed to scan website. Please try again.');
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
          
          <div className="text-sm text-muted-foreground">
            <p>This will check your website for common SEO issues and generate suggestions for improvement.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SeoScanner;
