/**
 * BlogSmith Embed Script
 * This script allows clients to easily embed BlogSmith blog content on their websites
 * with proper styling and interactive elements.
 * 
 * Version: 1.0.0
 */

(function() {
  // BlogSmith namespace
  window.BlogSmith = window.BlogSmith || {};
  
  // Default configuration
  let config = {
    apiUrl: 'https://emdldcecqgrdgronpcoc.supabase.co/rest/v1',
    apiKey: 'YOUR_API_KEY_HERE',
    containerId: 'blogsmith-container'
  };
  
  // Helper function to format dates
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }
  
  // Add CSS styles to the page
  function addStyles() {
    if (document.getElementById('blogsmith-styles')) return;
    
    const styleEl = document.createElement('style');
    styleEl.id = 'blogsmith-styles';
    styleEl.textContent = `
      /* BlogSmith custom styles for rendering blog content */
      .blog-post-content h1,
      .blog-post-content h2,
      .blog-post-content h3,
      .blog-post-content h4,
      .blog-post-content h5,
      .blog-post-content h6 {
        font-weight: 600;
        color: #170F49;
        margin-top: 1.5em;
        margin-bottom: 0.5em;
      }

      .blog-post-content h1 {
        font-size: 2.25rem;
      }

      .blog-post-content h2 {
        font-size: 1.875rem;
      }

      .blog-post-content h3 {
        font-size: 1.5rem;
      }

      .blog-post-content h4 {
        font-size: 1.25rem;
      }

      .blog-post-content h5,
      .blog-post-content h6 {
        font-size: 1rem;
      }

      .blog-post-content p {
        margin-bottom: 1.25em;
        line-height: 1.7;
      }

      .blog-post-content a {
        color: #E98A23;
        text-decoration: underline;
      }

      .blog-post-content ul,
      .blog-post-content ol {
        margin-left: 2em;
        margin-bottom: 1.25em;
      }

      .blog-post-content li {
        margin-bottom: 0.5em;
      }

      .blog-post-content img {
        max-width: 100%;
        height: auto;
        border-radius: 0.5rem;
        margin: 1.5em 0;
      }

      .blog-post-content blockquote {
        border-left: 4px solid #E98A23;
        padding-left: 1.5em;
        margin: 1.5em 0;
        font-style: italic;
        color: #170F49;
      }

      .blog-post-content code {
        background-color: #f3f4f6;
        padding: 0.2em 0.4em;
        border-radius: 0.25em;
        font-family: monospace;
        font-size: 0.9em;
      }

      .blog-post-content table {
        border-collapse: collapse;
        width: 100%;
        margin-bottom: 1.5em;
      }

      .blog-post-content table th,
      .blog-post-content table td {
        border: 1px solid #e5e7eb;
        padding: 0.5em 1em;
      }

      .blog-post-content table th {
        background-color: #f3f4f6;
        font-weight: 600;
      }

      .blog-post-content hr {
        border: 0;
        border-top: 1px solid #e5e7eb;
        margin: 2em 0;
      }
    `;
    
    document.head.appendChild(styleEl);
  }
  
  // Render Markdown content to HTML - improved for better formatting
  function renderMarkdown(markdown) {
    if (!markdown) return '';
    
    // Process paragraphs and line breaks first
    let html = markdown.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');
    
    // Replace headings (must come before other replacements)
    html = html
      .replace(/### (.*?)(\n|$)/g, '<h3>$1</h3>')
      .replace(/## (.*?)(\n|$)/g, '<h2>$1</h2>')
      .replace(/# (.*?)(\n|$)/g, '<h1>$1</h1>');
  
    // Replace bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');
    
    // Replace italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/_(.*?)_/g, '<em>$1</em>');
    
    // Replace links
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Replace bullet lists - improved to handle various bullet formats
    html = html.replace(/^[\s]*[-*+][\s]+(.*?)$/gm, '<li>$1</li>');
    
    // Fix lists - wrap consecutive li elements in ul
    html = html.replace(/(<li>.*?<\/li>[\s]*)+/g, function(match) {
      return '<ul>' + match + '</ul>';
    });
    
    // Replace numbered lists
    html = html.replace(/^[\s]*(\d+)\.[\s]+(.*?)$/gm, '<li>$2</li>');
    html = html.replace(/(<li>.*?<\/li>[\s]*)+/g, function(match) {
      if (match.indexOf('<ul>') === -1) {
        return '<ol>' + match + '</ol>';
      }
      return match;
    });
    
    // Handle code blocks
    html = html.replace(/```([^`]+)```/g, '<pre><code>$1</code></pre>');
    
    // Handle inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Handle blockquotes
    html = html.replace(/^>[\s]+(.*?)$/gm, '<blockquote>$1</blockquote>');
    
    // Ensure content is wrapped in paragraphs if not already
    if (!html.startsWith('<')) {
      html = '<p>' + html + '</p>';
    }
    
    // Clean up any extra paragraph tags
    html = html.replace(/<\/p><p><\/p><p>/g, '</p><p>');
    html = html.replace(/<p><\/p>/g, '');
    
    return html;
  }
  
  // Configure BlogSmith
  BlogSmith.configure = function(options) {
    Object.assign(config, options);
  };
  
  // Load and display blog posts
  BlogSmith.loadPosts = async function() {
    addStyles();
    
    const container = document.getElementById(config.containerId);
    if (!container) {
      console.error('BlogSmith container not found.');
      return;
    }
    
    try {
      const response = await fetch(`${config.apiUrl}/blog_posts?select=*&published=eq.true`, {
        method: 'GET',
        headers: {
          'apikey': config.apiKey,
          'Authorization': `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const posts = await response.json();
      
      if (!posts || posts.length === 0) {
        container.innerHTML = '<p>No blog posts found.</p>';
        return;
      }
      
      let html = '<div class="blog-embed-list">';
      posts.forEach(post => {
        html += `
          <div class="blog-embed-list-item">
            <img src="${post.hero_image}" alt="${post.title}" class="blog-embed-image">
            <h2 class="blog-embed-title">${post.title}</h2>
            <p class="blog-embed-description">${post.description}</p>
            <div class="blog-embed-meta">
              <span>${formatDate(post.created_at)}</span>
              <span>Category: ${post.category}</span>
            </div>
            <a href="?blog_post=${post.slug}" class="blog-embed-read-more">Read More</a>
          </div>
        `;
      });
      html += '</div>';
      
      container.innerHTML = html;
    } catch (error) {
      console.error('Error loading blog posts:', error);
      container.innerHTML = '<p>Failed to load blog posts.</p>';
    }
  };
  
  // Load and display a single blog post
  BlogSmith.loadPost = async function(slug) {
    addStyles();
    
    const container = document.getElementById(config.containerId);
    if (!container) {
      console.error('BlogSmith container not found.');
      return;
    }
    
    try {
      const response = await fetch(`${config.apiUrl}/blog_posts?slug=eq.${slug}&select=*,blog_sections(*,section_content(*)),blog_faqs(*)&published=eq.true`, {
        method: 'GET',
        headers: {
          'apikey': config.apiKey,
          'Authorization': `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const posts = await response.json();
      
      if (!posts || posts.length === 0) {
        container.innerHTML = '<p>Blog post not found.</p>';
        return;
      }
      
      const post = posts[0];
      
      let html = `
        <div class="blog-embed-post">
          <img src="${post.hero_image}" alt="${post.title}" class="blog-embed-post-image">
          <h1 class="blog-embed-post-title">${post.title}</h1>
          <div class="blog-embed-post-meta">
            <span class="blog-embed-post-date">${formatDate(post.created_at)}</span>
            <span class="blog-embed-post-category">Category: ${post.category}</span>
          </div>
          <p class="blog-embed-post-description">${post.description}</p>
      `;
      
      // Render sections
      if (post.blog_sections && post.blog_sections.length > 0) {
        post.blog_sections.sort((a, b) => a.position - b.position).forEach(section => {
          html += `
            <div class="blog-embed-section">
              <h2 class="blog-embed-section-title">${section.title}</h2>
          `;
          
          // Render section content
          if (section.section_content && section.section_content.length > 0) {
            section.section_content.sort((a, b) => a.position - b.position).forEach(content => {
              if (content.type === 'text') {
                html += `<div class="blog-embed-content-text">${renderMarkdown(content.content.text)}</div>`;
              } else if (content.type === 'image' && content.content.url) {
                html += `
                  <figure class="blog-embed-content-image">
                    <img src="${content.content.url}" alt="${content.content.caption || ''}">
                    <figcaption>${content.content.caption || ''}</figcaption>
                  </figure>
                `;
              }
            });
          }
          
          html += `</div>`;
        });
      }
      
      // Render FAQs
      if (post.blog_faqs && post.blog_faqs.length > 0) {
        html += `
          <div class="blog-embed-faqs">
            <h2 class="blog-embed-faqs-title">Frequently Asked Questions</h2>
        `;
        post.blog_faqs.sort((a, b) => a.position - b.position).forEach(faq => {
          html += `
            <div class="blog-embed-faq">
              <h3 class="blog-embed-faq-question">${faq.question}</h3>
              <p class="blog-embed-faq-answer">${faq.answer}</p>
            </div>
          `;
        });
        html += `</div>`;
      }
      
      html += `</div>`;
      container.innerHTML = html;
    } catch (error) {
      console.error('Error loading blog post:', error);
      container.innerHTML = '<p>Failed to load blog post.</p>';
    }
  };
  
  // Initialize BlogSmith
  BlogSmith.init = function() {
    const params = new URLSearchParams(window.location.search);
    const blogPostSlug = params.get('blog_post');
    
    if (blogPostSlug) {
      BlogSmith.loadPost(blogPostSlug);
    } else {
      BlogSmith.loadPosts();
    }
  };
  
  // Auto-initialize BlogSmith when the script is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', BlogSmith.init);
  } else {
    BlogSmith.init();
  }
})();
