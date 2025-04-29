
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

    // Prepare prompt for Gemini API
    const prompt = `
      As an SEO expert, analyze this website and provide specific, actionable recommendations 
      to improve its search engine rankings. Here is the information:
      
      URL: ${url}
      
      Current SEO analysis summary:
      ${factorsSummary}
      
      Based on this information and your SEO expertise, provide 5-7 specific, actionable recommendations 
      to improve this website's SEO performance. Each recommendation should be clear and practical.
      
      Format each recommendation as a bullet point starting with "- ".
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
      suggestions = text
        .split('\n')
        .filter(line => line.trim().startsWith('-'))
        .map(line => line.trim().substring(2).trim());
      
      console.log('Extracted suggestions:', suggestions);
    }
    
    return {
      suggestions: suggestions.length > 0 ? suggestions : ["No specific suggestions were generated. Try analyzing the page again."]
    };
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return {
      suggestions: [],
      error: `Failed to get AI suggestions: ${error instanceof Error ? error.message : String(error)}`
    };
  }
};
