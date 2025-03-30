
import React, { useEffect } from 'react';

// Extend Window interface for the embed script
declare global {
  interface Window {
    BlogEmbed?: {
      configure: (config: { apiUrl: string; apiKey: string; containerId: string; baseRoute?: string }) => void;
      loadPosts: () => void;
      loadPost: (slug: string) => void;
    };
  }
}

interface ClientEmbedScriptProps {
  containerId: string;
  apiKey: string;
  apiUrl?: string;
  baseRoute?: string;
  slug?: string;
  mode?: 'list' | 'single';
}

const ClientEmbedScript: React.FC<ClientEmbedScriptProps> = ({
  containerId,
  apiKey,
  apiUrl = 'https://emdldcecqgrdgronpcoc.supabase.co/rest/v1',
  baseRoute = '/blog',
  slug,
  mode
}) => {
  useEffect(() => {
    // Create a script element
    const scriptElement = document.createElement('script');
    scriptElement.src = '/blog-embed.js';
    scriptElement.async = true;
    
    // Add the script to the document
    document.body.appendChild(scriptElement);
    
    scriptElement.onload = () => {
      if (window.BlogEmbed) {
        console.log('Blog embed script loaded successfully');
        
        // Configure the embed with the updated parameters
        window.BlogEmbed.configure({
          apiUrl,
          apiKey,
          containerId,
          baseRoute
        });
        
        // Determine whether to load blog listing or single post
        if (mode === 'single' && slug) {
          console.log('Loading single post with slug:', slug);
          window.BlogEmbed.loadPost(slug);
        } else if (mode === 'list' || !mode) {
          console.log('Loading blog listing page');
          window.BlogEmbed.loadPosts();
        } else if (!mode && slug) {
          console.log('Loading single post (auto-detected) with slug:', slug);
          window.BlogEmbed.loadPost(slug);
        }
      } else {
        console.error('Blog embed script failed to initialize correctly');
      }
    };
    
    scriptElement.onerror = () => {
      console.error('Failed to load blog embed script');
    };
    
    // Clean up
    return () => {
      if (document.body.contains(scriptElement)) {
        document.body.removeChild(scriptElement);
      }
    };
  }, [containerId, apiKey, apiUrl, baseRoute, slug, mode]);
  
  return <div id={containerId} className="blog-container"></div>;
};

export default ClientEmbedScript;
