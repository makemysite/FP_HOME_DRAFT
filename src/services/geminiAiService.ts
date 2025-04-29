
const GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export interface GeminiAiResponse {
  suggestions: string[];
  error?: string;
}

export const generateSeoSuggestions = async (
  apiKey: string, 
  url: string, 
  htmlContent: string,
  seoFactors: any[]
): Promise<GeminiAiResponse> => {
  try {
    if (!apiKey) {
      console.error('Gemini API key is not provided');
      return {
        suggestions: [],
        error: "Gemini API key is not provided"
      };
    }

    console.log('Preparing to call Gemini API with key:', apiKey.substring(0, 4) + '...');

    // Create a summary of the SEO factors to send to Gemini
    const factorsSummary = seoFactors.map(factor => {
      return `${factor.name} (Score: ${factor.score}/100): ${(factor.suggestions || []).join('. ')}`;
    }).join('\n\n');

    // Prepare prompt for Gemini API - improved to be more specific
    const prompt = `
      As an SEO expert, analyze this website and provide specific, actionable recommendations 
      to improve its search engine rankings. Here is the information:
      
      URL: ${url}
      
      Current SEO analysis summary:
      ${factorsSummary}
      
      Based on this information, provide 5-7 specific, actionable recommendations to improve this website's SEO performance. 
      
      For each recommendation:
      1. Start with a clear action item
      2. Explain why it's important
      3. Include a specific example of how to implement it
      
      Format each recommendation as a bullet point starting with "- ".
      
      If you don't have enough information to make specific suggestions, provide general best practices for SEO improvement that would apply to most websites.
    `;
    
    console.log('Sending request to Gemini API...');
    
    // Call the Gemini API with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
    
    const response = await fetch(`${GEMINI_API_ENDPOINT}?key=${apiKey}`, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 1024,
        }
      })
    });
    
    clearTimeout(timeoutId);
    console.log('Gemini API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error response:', errorText);
      throw new Error(`Gemini API error (${response.status}): ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Gemini API response data:', JSON.stringify(data).substring(0, 200) + '...');
    
    // Extract suggestions from the response
    let suggestions: string[] = [];
    if (data.candidates && data.candidates.length > 0 && data.candidates[0].content) {
      const text = data.candidates[0].content.parts[0].text;
      
      // More robust extraction of suggestions
      suggestions = text
        .split('\n')
        .filter(line => line.trim().length > 0 && line.trim().startsWith('-'))
        .map(line => line.trim().substring(1).trim());
      
      console.log('Extracted suggestions:', suggestions);
      
      // If no bullet points found, try to extract paragraphs instead
      if (suggestions.length === 0) {
        suggestions = text
          .split('\n\n')
          .filter(para => para.trim().length > 10)
          .map(para => para.trim())
          .slice(0, 5);
      }
    }
    
    // Provide fallback suggestions if none were generated
    if (suggestions.length === 0) {
      return {
        suggestions: [
          "Improve meta title and description with targeted keywords",
          "Add more heading tags (H1, H2, H3) to structure your content",
          "Optimize image alt text to improve accessibility and SEO",
          "Create a sitemap.xml file to help search engines crawl your site",
          "Increase page loading speed by optimizing images and scripts",
          "Add structured data markup for rich snippets in search results",
          "Create more high-quality content focused on your target keywords"
        ]
      };
    }
    
    return { suggestions };
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    
    // Return default suggestions in case of error
    return {
      suggestions: [
        "Improve your meta title and description with relevant keywords",
        "Structure your content with proper heading tags (H1, H2, H3)",
        "Optimize all images with descriptive alt text",
        "Improve internal linking between pages on your site",
        "Create a sitemap.xml and robots.txt file",
        "Focus on creating quality content that answers user questions",
        "Improve page loading speed for better user experience"
      ],
      error: `AI suggestion generation failed: ${error instanceof Error ? error.message : String(error)}`
    };
  }
};
