import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Scan, Loader2, AlertTriangle, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { analyzePage, saveReport } from '@/services/seoBot';
import { generateSeoSuggestions } from '@/services/geminiAiService';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface SeoScannerProps {
  onScanComplete: (report: any) => void;
  geminiApiKey: string;
}

const SeoScanner: React.FC<SeoScannerProps> = ({ 
  onScanComplete, 
  geminiApiKey 
}) => {
  const [url, setUrl] = useState('https://fieldpromax.com');
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleScan = async () => {
    if (!url) {
      toast.error('Please enter a URL');
      return;
    }

    if (!validateUrl(url)) {
      toast.error('Please enter a valid URL format (e.g., https://example.com)');
      setError('Invalid URL format. Please include http:// or https://');
      return;
    }

    try {
      setIsScanning(true);
      setError(null);
      toast.info('Scanning website for SEO factors...');

      // Test if the URL is valid and accessible
      try {
        console.log(`Testing URL accessibility: ${url}`);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const testResponse = await fetch(url, { 
          method: 'HEAD',
          signal: controller.signal,
          mode: 'no-cors' // Try with no-cors mode to avoid CORS issues
        });
        
        clearTimeout(timeoutId);
        
        console.log('URL test response:', testResponse);
      } catch (urlError) {
        console.error('URL access error:', urlError);
        
        // Try a second attempt with a proxy for CORS issues
        try {
          console.log('Trying alternative method to access URL...');
          const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
          const proxyResponse = await fetch(proxyUrl);
          
          if (!proxyResponse.ok) {
            throw new Error('Failed to access URL through proxy');
          }
          
          console.log('Successfully accessed URL through proxy');
        } catch (proxyError) {
          console.error('Proxy access error:', proxyError);
          toast.error(`Could not access the URL. Please check if it's valid and accessible.`);
          setIsScanning(false);
          setError('Could not access the URL. Please check if it\'s valid and accessible.');
          return;
        }
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
          const pageResponse = await fetch(url, { mode: 'no-cors' })
            .catch(() => fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`));
            
          let htmlContent = '';
          try {
            htmlContent = await pageResponse.text();
          } catch (textError) {
            console.error('Error extracting text from response:', textError);
            // Continue with empty HTML content, AI will work with just SEO factors
          }
          
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
      try {
        // Save report to database
        await saveReport(report);
        console.log('Report saved successfully');
        
        // Update UI with report
        onScanComplete(report);
        
        toast.success('SEO scan completed successfully!');
      } catch (saveError) {
        console.error('Error saving report to database:', saveError);
        
        // Check if the error is related to authentication
        if (String(saveError).includes('authentication') || String(saveError).includes('not authorized')) {
          toast.error('Authentication required to save reports. Please log in and try again.');
          setError('Authentication required to save reports. Please log in and try again.');
        } else {
          toast.error(`Failed to save SEO report: ${saveError instanceof Error ? saveError.message : String(saveError)}`);
          setError(`Failed to save report: ${saveError instanceof Error ? saveError.message : String(saveError)}`);
          
          // Still update UI with report even if saving failed
          onScanComplete(report);
        }
      }
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
                placeholder="https://example.com"
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
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription className="flex flex-col gap-2">
                <p>{error}</p>
                <div className="text-sm mt-2">
                  <p className="font-medium">Troubleshooting tips:</p>
                  <ul className="list-disc pl-5 space-y-1 mt-1">
                    <li>Check if the URL is correctly formatted (including https://)</li>
                    <li>Verify that the website is publicly accessible</li>
                    <li>Ensure there are no CORS restrictions on the domain</li>
                    <li>Try a different website to see if the issue persists</li>
                  </ul>
                </div>
              </AlertDescription>
            </Alert>
          )}

          <div className="text-sm text-muted-foreground">
            <p>This will check your website for common SEO issues and generate suggestions for improvement.</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <p className="text-sm text-muted-foreground">Scan time: ~30 seconds</p>
        <Button variant="outline" size="sm" onClick={() => window.open('https://developers.google.com/search/docs/fundamentals/seo-starter-guide', '_blank')}>
          <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
          SEO Best Practices
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SeoScanner;
