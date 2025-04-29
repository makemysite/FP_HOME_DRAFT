
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";

export interface SeoFactor {
  name: string;
  description: string;
  status: 'good' | 'warning' | 'error';
  score: number;
  suggestions: string[];
}

export interface SeoReport {
  url: string;
  date: string;
  overallScore: number;
  factors: SeoFactor[];
  aiSuggestions: string[];
}

const MAX_SCORE = 100;
const WEIGHT_MAP = {
  metaTags: 15,
  headings: 10,
  images: 10,
  links: 10,
  performance: 15,
  mobileResponsiveness: 10,
  siteStructure: 10,
  sitemapRobots: 10,
  socialMeta: 5,
  https: 5,
};

// Function to analyze meta tags
const analyzeMeta = async (html: string): Promise<SeoFactor> => {
  const metaTitleRegex = /<title>(.*?)<\/title>/i;
  const metaDescriptionRegex = /<meta\s+name=["']description["']\s+content=["'](.*?)["']/i;
  
  const titleMatch = html.match(metaTitleRegex);
  const descriptionMatch = html.match(metaDescriptionRegex);
  
  const title = titleMatch ? titleMatch[1] : '';
  const description = descriptionMatch ? descriptionMatch[1] : '';
  
  const suggestions = [];
  let status: 'good' | 'warning' | 'error' = 'good';
  let score = WEIGHT_MAP.metaTags;

  if (!title) {
    suggestions.push('Missing title tag. Add a descriptive title that includes your main keyword.');
    status = 'error';
    score = 0;
  } else if (title.length < 30 || title.length > 60) {
    suggestions.push(`Title length is ${title.length} characters. Optimal length is between 30-60 characters.`);
    status = 'warning';
    score = WEIGHT_MAP.metaTags * 0.5;
  }

  if (!description) {
    suggestions.push('Missing meta description. Add a compelling description that includes your main keywords.');
    status = status === 'good' ? 'warning' : 'error';
    score = score * 0.5;
  } else if (description.length < 120 || description.length > 160) {
    suggestions.push(`Meta description length is ${description.length} characters. Optimal length is between 120-160 characters.`);
    status = status === 'good' ? 'warning' : status;
    score = score * 0.75;
  }

  return {
    name: 'Meta Tags',
    description: 'Title and meta description tags',
    status,
    score,
    suggestions,
  };
};

// Function to analyze headings structure
const analyzeHeadings = async (html: string): Promise<SeoFactor> => {
  const h1Regex = /<h1[^>]*>(.*?)<\/h1>/ig;
  const h2Regex = /<h2[^>]*>(.*?)<\/h2>/ig;
  
  const h1Matches = html.match(h1Regex) || [];
  const h2Matches = html.match(h2Regex) || [];
  
  const suggestions = [];
  let status: 'good' | 'warning' | 'error' = 'good';
  let score = WEIGHT_MAP.headings;

  if (h1Matches.length === 0) {
    suggestions.push('No H1 heading found. Each page should have exactly one H1 heading that includes your main keyword.');
    status = 'error';
    score = 0;
  } else if (h1Matches.length > 1) {
    suggestions.push(`Found ${h1Matches.length} H1 headings. It's best to have exactly one H1 heading per page.`);
    status = 'warning';
    score = WEIGHT_MAP.headings * 0.7;
  }

  if (h2Matches.length === 0) {
    suggestions.push('No H2 headings found. Use H2 headings to structure your content and include secondary keywords.');
    status = status === 'good' ? 'warning' : status;
    score = score * 0.8;
  }

  return {
    name: 'Heading Structure',
    description: 'H1, H2, and other heading tags',
    status,
    score,
    suggestions,
  };
};

// Function to analyze images
const analyzeImages = async (html: string): Promise<SeoFactor> => {
  const imgRegex = /<img[^>]+>/ig;
  const imgMatches = html.match(imgRegex) || [];
  
  const altRegex = /alt=["'](.*?)["']/i;
  const suggestions = [];
  let status: 'good' | 'warning' | 'error' = 'good';
  let score = WEIGHT_MAP.images;
  
  let missingAltCount = 0;
  
  for (const img of imgMatches) {
    const altMatch = img.match(altRegex);
    if (!altMatch || altMatch[1].trim() === '') {
      missingAltCount++;
    }
  }
  
  if (imgMatches.length > 0 && missingAltCount > 0) {
    const percentage = (missingAltCount / imgMatches.length) * 100;
    suggestions.push(`${missingAltCount} out of ${imgMatches.length} images (${percentage.toFixed(1)}%) are missing alt text.`);
    if (percentage > 50) {
      status = 'error';
      score = WEIGHT_MAP.images * 0.3;
    } else {
      status = 'warning';
      score = WEIGHT_MAP.images * 0.7;
    }
  }

  return {
    name: 'Image Optimization',
    description: 'Image alt attributes and optimization',
    status,
    score,
    suggestions: suggestions.length > 0 ? suggestions : ['All images have proper alt text.'],
  };
};

// Function to analyze sitemap and robots.txt
const analyzeSitemapRobots = async (): Promise<SeoFactor> => {
  let hasSitemap = false;
  let hasRobots = false;
  
  try {
    const sitemapResponse = await fetch('/sitemap.xml');
    hasSitemap = sitemapResponse.ok;
    
    const robotsResponse = await fetch('/robots.txt');
    hasRobots = robotsResponse.ok;
  } catch (error) {
    console.error('Error checking sitemap/robots:', error);
  }
  
  const suggestions = [];
  let status: 'good' | 'warning' | 'error' = 'good';
  let score = WEIGHT_MAP.sitemapRobots;
  
  if (!hasSitemap) {
    suggestions.push('No sitemap.xml found. Create a sitemap to help search engines crawl your website more efficiently.');
    status = 'error';
    score = score * 0.5;
  }
  
  if (!hasRobots) {
    suggestions.push('No robots.txt found. Create a robots.txt file to guide search engine crawlers.');
    status = status === 'good' ? 'warning' : 'error';
    score = score * 0.5;
  }
  
  return {
    name: 'Sitemap & Robots.txt',
    description: 'Presence and configuration of sitemap.xml and robots.txt',
    status,
    score,
    suggestions: suggestions.length > 0 ? suggestions : ['Sitemap and robots.txt are properly configured.'],
  };
};

// Main function to analyze a page
export const analyzePage = async (url: string): Promise<SeoReport> => {
  try {
    // Fetch the page content
    const response = await fetch(url);
    const html = await response.text();
    
    // Run various SEO checks in parallel
    const [metaResult, headingsResult, imagesResult, sitemapRobotsResult] = await Promise.all([
      analyzeMeta(html),
      analyzeHeadings(html),
      analyzeImages(html),
      analyzeSitemapRobots(),
    ]);
    
    // Collect all factors
    const factors = [metaResult, headingsResult, imagesResult, sitemapRobotsResult];
    
    // Calculate overall score
    const totalScore = factors.reduce((sum, factor) => sum + factor.score, 0);
    const overallScore = Math.min(Math.round(totalScore), MAX_SCORE);
    
    // Generate AI suggestions using Gemini API (placeholder)
    // This will be replaced with actual Gemini API integration
    const aiSuggestions = [
      "Implement structured data markup for better rich snippets",
      "Consider adding more content to improve keyword coverage",
      "Improve internal linking structure",
    ];
    
    return {
      url,
      date: new Date().toISOString(),
      overallScore,
      factors,
      aiSuggestions,
    };
  } catch (error) {
    console.error('Error analyzing page:', error);
    throw new Error('Failed to analyze page');
  }
};

// Save report to database
export const saveReport = async (report: SeoReport): Promise<void> => {
  try {
    // Convert SeoFactor[] to Json compatible format
    const factorsJson = JSON.parse(JSON.stringify(report.factors)) as Json;
    
    console.log('Saving report to database:', {
      url: report.url,
      scan_date: report.date,
      overall_score: report.overallScore,
      factors_count: report.factors.length,
      ai_suggestions_count: report.aiSuggestions.length
    });
    
    const { error } = await supabase
      .from('seo_reports')
      .insert({
        url: report.url,
        scan_date: report.date,
        overall_score: report.overallScore,
        factors: factorsJson,
        ai_suggestions: report.aiSuggestions,
      });
      
    if (error) {
      console.error('Supabase error while saving report:', error);
      throw error;
    }
    
    console.log('Report saved successfully to database');
  } catch (error) {
    console.error('Error saving SEO report:', error);
    throw new Error('Failed to save SEO report');
  }
};

// Function to get saved reports
export const getSavedReports = async (): Promise<any[]> => {
  try {
    const { data, error } = await supabase
      .from('seo_reports')
      .select('*')
      .order('scan_date', { ascending: false });
      
    if (error) {
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching SEO reports:', error);
    return [];
  }
};
