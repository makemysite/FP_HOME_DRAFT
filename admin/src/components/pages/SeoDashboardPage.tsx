import React, { useEffect, useState } from 'react';
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Settings, History, LineChart, AlertTriangle, Loader2 } from 'lucide-react';
import SeoScanner from '../seo/SeoScanner';
import SeoScoreCard from '../seo/SeoScoreCard';
import SeoFactorsList from '../seo/SeoFactorsList';
import AiSuggestions from '../seo/AiSuggestions';
import SeoHistoryTable from '../seo/SeoHistoryTable';
import { SeoReport, getSavedReports } from '@/services/seoBot';
import { supabase } from '@/integrations/supabase/client';

const SeoDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentReport, setCurrentReport] = useState<SeoReport | null>(null);
  const [reports, setReports] = useState<any[]>([]);
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [apiKeyError, setApiKeyError] = useState<string | null>(null);
  const [isLoadingKey, setIsLoadingKey] = useState(true);

  // Load saved reports and API key on component mount
  useEffect(() => {
    const loadReportsAndApiKey = async () => {
      try {
        setIsLoadingKey(true);
        // Load saved reports
        const savedReports = await getSavedReports();
        setReports(savedReports);
        
        if (savedReports.length > 0) {
          // Set the most recent report as the current one
          const latestReport = savedReports[0];
          setCurrentReport({
            url: latestReport.url,
            date: latestReport.scan_date,
            overallScore: latestReport.overall_score,
            factors: latestReport.factors || [],
            aiSuggestions: latestReport.ai_suggestions || [],
          });
        }
        
        // Try to get Gemini API key from supabase secrets
        try {
          console.log('Fetching Gemini API key...');
          const { data, error } = await supabase.functions.invoke('get-admin-secret', {
            body: { secretName: 'GEMINI_API_KEY' }
          });
          
          if (error) {
            console.error('Error invoking get-admin-secret:', error);
            setApiKeyError(`Failed to retrieve API key: ${error.message}`);
            toast.error('Failed to retrieve Gemini API key');
          } else if (data && data.value) {
            console.log('Gemini API key retrieved successfully');
            setGeminiApiKey(data.value);
            setApiKeyError(null);
          } else {
            console.warn('No Gemini API key found or empty key returned');
            setApiKeyError('No API key found. AI-powered suggestions will not be available.');
          }
        } catch (error) {
          console.error('Exception fetching Gemini API key:', error);
          setApiKeyError(`Error fetching API key: ${error instanceof Error ? error.message : String(error)}`);
          toast.error('Failed to fetch Gemini API key');
        }
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error('Failed to load SEO dashboard data');
      } finally {
        setIsLoadingKey(false);
      }
    };
    
    loadReportsAndApiKey();
  }, []);

  const handleScanComplete = (report: SeoReport) => {
    setCurrentReport(report);
    
    // Update reports list
    setReports(prevReports => [
      {
        id: Date.now().toString(),
        url: report.url,
        scan_date: report.date,
        overall_score: report.overallScore,
        factors: report.factors,
        ai_suggestions: report.aiSuggestions,
      },
      ...prevReports
    ]);
    
    // Switch to overview tab to show results
    setActiveTab('overview');
  };

  const handleViewReport = (report: any) => {
    setCurrentReport({
      url: report.url,
      date: report.scan_date,
      overallScore: report.overall_score,
      factors: report.factors || [],
      aiSuggestions: report.ai_suggestions || [],
    });
    setActiveTab('overview');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">SEO Dashboard</h1>
        <Button variant="outline">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
          <TabsTrigger value="overview" className="flex items-center gap-1">
            <LineChart className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="scan" className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4" />
            New Scan
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-1">
            <History className="h-4 w-4" />
            History
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 mt-6">
          {currentReport ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Overall score card */}
                <div className="md:col-span-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>SEO Analysis Overview</CardTitle>
                      <CardDescription>
                        Last scanned {new Date(currentReport.date).toLocaleString()} • <span className="font-medium">{currentReport.url}</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="text-center md:border-r md:pr-8 flex flex-col items-center">
                          <div className="text-6xl font-bold">{currentReport.overallScore}</div>
                          <div className="text-sm text-muted-foreground mt-1">Overall Score</div>
                          
                          <div className="mt-4 flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => setActiveTab('scan')}>
                              Run New Scan
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
                          {currentReport.factors.map((factor, i) => (
                            <SeoScoreCard 
                              key={i}
                              title={factor.name}
                              score={factor.score}
                              status={factor.status}
                            />
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>SEO Factor Analysis</CardTitle>
                      <CardDescription>
                        Detailed analysis of SEO factors and recommendations
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <SeoFactorsList factors={currentReport.factors} />
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <AiSuggestions 
                    suggestions={currentReport.aiSuggestions || []} 
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium mb-2">No SEO report available</h3>
              <p className="text-muted-foreground mb-4">
                Run a scan to generate an SEO report and get improvement suggestions.
              </p>
              <Button onClick={() => setActiveTab('scan')}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Run SEO Scan
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="scan" className="mt-6">
          {apiKeyError && (
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="font-medium text-yellow-800">API Key Issue</p>
                  <p className="text-sm text-yellow-700">{apiKeyError}</p>
                  <p className="text-sm mt-1 text-yellow-700">
                    You can still run the scan, but AI-powered suggestions will be limited.
                  </p>
                </div>
              </div>
            </div>
          )}
          {isLoadingKey ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <SeoScanner 
              onScanComplete={handleScanComplete}
              geminiApiKey={geminiApiKey}
            />
          )}
        </TabsContent>
        
        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Scan History</CardTitle>
              <CardDescription>
                View previous SEO scans and reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SeoHistoryTable 
                reports={reports}
                onViewReport={handleViewReport}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SeoDashboardPage;
