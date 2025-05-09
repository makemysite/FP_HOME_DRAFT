
export async function generateSeoSuggestions(
  apiKey: string,
  url: string,
  htmlContent: string = '',
  seoFactors: any[]
): Promise<{ suggestions?: string[], error?: string }> {
  try {
    // API endpoint for Gemini
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

    // Create the prompt
    const prompt = `
      As an SEO expert, analyze this website: ${url}
      
      Here are the SEO analysis results:
      ${JSON.stringify(seoFactors, null, 2)}
      
      ${htmlContent ? `Here's part of the page HTML: ${htmlContent.substring(0, 5000)}` : ''}
      
      Based on this information, provide 5-8 specific, actionable recommendations to improve the site's SEO.
      Format each suggestion as a concise, action-oriented statement.
      Focus on the most important improvements with the highest impact.
    `;

    // Make the API request
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    // Extract suggestions from the response
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!responseText) {
      return { 
        error: 'No response generated from AI',
        suggestions: getDefaultSuggestions() 
      };
    }

    // Process the response text into discrete suggestions
    let suggestions = responseText
      .split(/\d+\.|\n-|\n\*/)  // Split by numbered lists or bullet points
      .filter(line => line.trim().length > 0)
      .map(line => line.trim());

    // Add a fallback if we didn't get enough suggestions
    if (!suggestions || suggestions.length < 3) {
      return { 
        suggestions: getDefaultSuggestions(),
        error: 'Insufficient AI suggestions generated' 
      };
    }

    return { suggestions };
  } catch (error) {
    console.error('Error generating AI suggestions:', error);
    return {
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      suggestions: getDefaultSuggestions()
    };
  }
}

// Fallback suggestions if the API call fails
function getDefaultSuggestions(): string[] {
  return [
    'Improve page titles with more specific keywords relevant to your content.',
    'Add descriptive alt text to all images to improve accessibility and SEO.',
    'Increase internal linking between related pages to improve site architecture.',
    'Optimize page load speed by compressing images and minifying CSS/JavaScript.',
    'Create more comprehensive content that thoroughly addresses user search intent.',
    'Improve mobile responsiveness for better user experience across all devices.'
  ];
}
