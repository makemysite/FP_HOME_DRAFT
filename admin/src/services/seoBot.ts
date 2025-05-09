
import { supabase } from '@/integrations/supabase/client';

export interface SeoFactor {
  name: string;
  description: string;
  score: number;
  status: 'good' | 'warning' | 'error';
  suggestions: string[];
}

export interface SeoReport {
  url: string;
  date: string;
  overallScore: number;
  factors: SeoFactor[];
  aiSuggestions?: string[];
}

// Analyze a webpage for SEO factors
export async function analyzePage(url: string): Promise<SeoReport> {
  // In a real implementation, this would make API calls to analyze the page
  // For demo purposes, we'll return mock data
  const factors: SeoFactor[] = [
    {
      name: 'Meta Tags',
      description: 'Analysis of title tag, meta description, and other meta tags',
      score: 85,
      status: 'good',
      suggestions: ['Consider adding more relevant keywords to your meta description']
    },
    {
      name: 'Content Quality',
      description: 'Analysis of content length, readability, and keyword usage',
      score: 70,
      status: 'warning',
      suggestions: [
        'Your content could be more comprehensive',
        'Consider adding more industry-specific terminology'
      ]
    },
    {
      name: 'Mobile Optimization',
      description: 'Analysis of mobile responsiveness and user experience',
      score: 90,
      status: 'good',
      suggestions: ['The page is well optimized for mobile devices']
    },
    {
      name: 'Page Speed',
      description: 'Analysis of page loading performance',
      score: 60,
      status: 'warning',
      suggestions: [
        'Large images could be compressed further',
        'Consider implementing lazy loading for below-fold content'
      ]
    }
  ];

  // Calculate overall score based on individual factor scores
  const overallScore = Math.round(
    factors.reduce((sum, factor) => sum + factor.score, 0) / factors.length
  );

  return {
    url,
    date: new Date().toISOString(),
    overallScore,
    factors
  };
}

// Save an SEO report to the database
export async function saveReport(report: SeoReport): Promise<void> {
  const { error } = await supabase.from('seo_reports').insert({
    url: report.url,
    scan_date: report.date,
    overall_score: report.overallScore,
    factors: report.factors,
    ai_suggestions: report.aiSuggestions || []
  });

  if (error) {
    console.error('Error saving report:', error);
    throw error;
  }
}

// Get all saved SEO reports
export async function getSavedReports(): Promise<any[]> {
  const { data, error } = await supabase
    .from('seo_reports')
    .select('*')
    .order('scan_date', { ascending: false });

  if (error) {
    console.error('Error fetching reports:', error);
    throw error;
  }

  return data || [];
}
