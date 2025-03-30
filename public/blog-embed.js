
/**
 * Blog Embed Script
 * This script allows clients to easily embed blog content on their websites
 * with proper styling and interactive elements.
 * 
 * Version: 1.0.0
 */

(function() {
  // BlogEmbed namespace
  window.BlogEmbed = window.BlogEmbed || {};
  
  // Default configuration
  let config = {
    apiUrl: 'https://emdldcecqgrdgronpcoc.supabase.co/rest/v1',
    apiKey: 'YOUR_API_KEY_HERE',
    containerId: 'blog-container'
  };
  
  // Helper function to format dates
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }
  
  // Add CSS styles to the page
  function addStyles() {
    if (document.getElementById('blog-embed-styles')) return;
    
    const styleEl = document.createElement('style');
    styleEl.id = 'blog-embed-styles';
    styleEl.textContent = `
      /* Base styles */
      .blog-container {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 900px;
        margin: 0 auto;
      }
      
      /* Post listing styles */
      .blog-post-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 2rem;
      }
      
      .blog-post-card {
        border: 1px solid #e2e8f0;
        border-radius: 0.5rem;
        overflow: hidden;
        transition: transform 0.2s, box-shadow 0.2s;
      }
      
      .blog-post-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
      }
      
      .blog-post-link {
        text-decoration: none;
        color: inherit;
        display: block;
      }
      
      .blog-post-image {
        width: 100%;
        height: 200px;
        object-fit: cover;
      }
      
      .blog-post-content {
        padding: 1.5rem;
      }
      
      .blog-post-title {
        font-size: 1.25rem;
        font-weight: 600;
        margin: 0 0 0.75rem 0;
        color: #1a202c;
      }
      
      .blog-post-description {
        font-size: 0.875rem;
        color: #4a5568;
        margin-bottom: 1rem;
      }
      
      .blog-post-date {
        font-size: 0.75rem;
        color: #718096;
      }
      
      /* Single post styles */
      .blog-post-container {
        max-width: 800px;
        margin: 0 auto;
      }
      
      .blog-post-header {
        margin-bottom: 2rem;
        text-align: center;
      }
      
      .blog-post-header .blog-post-title {
        font-size: 2.25rem;
        font-weight: 700;
        margin-bottom: 1rem;
      }
      
      .blog-post-header .blog-post-date {
        font-size: 0.875rem;
        margin-bottom: 1.5rem;
      }
      
      .blog-post-hero-image {
        width: 100%;
        max-height: 500px;
        object-fit: cover;
        border-radius: 0.5rem;
        margin-bottom: 2rem;
      }
      
      /* Table of Contents */
      .blog-table-of-contents {
        background-color: #f8fafc;
        padding: 1.5rem;
        border-radius: 0.5rem;
        margin-bottom: 2rem;
      }
      
      .blog-table-of-contents h2 {
        font-size: 1.25rem;
        font-weight: 600;
        margin-top: 0;
        margin-bottom: 1rem;
      }
      
      .blog-table-of-contents ul {
        list-style-type: none;
        padding-left: 1rem;
        margin: 0;
      }
      
      .blog-table-of-contents li {
        margin-bottom: 0.5rem;
      }
      
      .blog-table-of-contents a {
        color: #3182ce;
        text-decoration: none;
      }
      
      .blog-table-of-contents a:hover {
        text-decoration: underline;
      }
      
      /* Section styles */
      .blog-section {
        margin-bottom: 3rem;
      }
      
      .blog-section-title {
        font-size: 1.75rem;
        font-weight: 600;
        margin-bottom: 1.5rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid #e2e8f0;
      }
      
      /* Content styles */
      .blog-content h1 {
        font-size: 2rem;
        margin: 2.5rem 0 1.5rem;
      }
      
      .blog-content h2 {
        font-size: 1.5rem;
        margin: 2rem 0 1.25rem;
      }
      
      .blog-content h3 {
        font-size: 1.25rem;
        margin: 1.75rem 0 1rem;
      }
      
      .blog-content p {
        margin-bottom: 1.5rem;
      }
      
      .blog-content a {
        color: #3182ce;
        text-decoration: none;
      }
      
      .blog-content a:hover {
        text-decoration: underline;
      }
      
      .blog-content ul, .blog-content ol {
        padding-left: 1.5rem;
        margin-bottom: 1.5rem;
      }
      
      .blog-content li {
        margin-bottom: 0.5rem;
      }
      
      .blog-content blockquote {
        border-left: 4px solid #e2e8f0;
        padding-left: 1rem;
        font-style: italic;
        color: #4a5568;
        margin: 1.5rem 0;
      }
      
      .blog-content code {
        background-color: #f1f5f9;
        padding: 0.2rem 0.4rem;
        border-radius: 0.25rem;
        font-family: monospace;
        font-size: 0.875em;
      }
      
      .blog-content pre {
        background-color: #f1f5f9;
        padding: 1rem;
        border-radius: 0.5rem;
        overflow-x: auto;
        margin-bottom: 1.5rem;
      }
      
      .blog-content pre code {
        background-color: transparent;
        padding: 0;
      }
      
      /* Image container */
      .blog-image-container {
        margin: 2rem 0;
        text-align: center;
      }
      
      .blog-content-image {
        max-width: 100%;
        border-radius: 0.5rem;
      }
      
      .blog-image-caption {
        font-size: 0.875rem;
        color: #4a5568;
        margin-top: 0.5rem;
        font-style: italic;
      }
      
      /* FAQ section styles */
      .blog-faqs {
        margin-top: 3rem;
        margin-bottom: 3rem;
      }
      
      .blog-faqs h2 {
        font-size: 1.75rem;
        font-weight: 600;
        margin-bottom: 1.5rem;
      }
      
      .blog-faq-item {
        margin-bottom: 1rem;
        border: 1px solid #e2e8f0;
        border-radius: 0.5rem;
        overflow: hidden;
      }
      
      .blog-faq-question {
        padding: 1rem 1.5rem;
        background-color: #f8fafc;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .blog-faq-question::after {
        content: "+";
        font-size: 1.25rem;
        transition: transform 0.2s;
      }
      
      .blog-faq-question.active::after {
        content: "-";
      }
      
      .blog-faq-answer {
        padding: 0;
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease-out, padding 0.3s ease;
      }
      
      .blog-faq-answer.active {
        padding: 1.5rem;
        max-height: 1000px;
      }
      
      /* Conclusion section */
      .blog-conclusion {
        background-color: #f8fafc;
        padding: 1.5rem;
        border-radius: 0.5rem;
        margin: 3rem 0;
      }
      
      .blog-conclusion h2 {
        font-size: 1.5rem;
        font-weight: 600;
        margin-top: 0;
        margin-bottom: 1rem;
      }
      
      /* Loading and error states */
      .blog-loading {
        text-align: center;
        padding: 3rem 0;
        color: #718096;
      }
      
      .blog-loading::after {
        content: "";
        display: inline-block;
        width: 1.5rem;
        height: 1.5rem;
        border: 3px solid rgba(203, 213, 224, 0.3);
        border-radius: 50%;
        border-top-color: #718096;
        animation: spin 1s linear infinite;
        margin-left: 0.5rem;
        vertical-align: middle;
      }
      
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      
      .blog-error {
        text-align: center;
        padding: 3rem 0;
        color: #e53e3e;
      }
    `;
    
    document.head.appendChild(styleEl);
  }
  
  // Render Markdown content to HTML - improved for better formatting
  function renderMarkdown(markdown) {
    if (!markdown) return '';
    
    // Replace special characters
    let html = markdown
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    
    // Process paragraphs by looking for double line breaks
    html = '<p>' + html.replace(/\n\n+/g, '</p>\n\n<p>') + '</p>';
    
    // Replace single line breaks with <br>
    html = html.replace(/\n(?!<\/p>|<p>)/g, '<br>');
    
    // Replace headings (must come before other replacements)
    html = html
      .replace(/<p>### (.*?)<\/p>/g, '<h3>$1</h3>')
      .replace(/<p>## (.*?)<\/p>/g, '<h2>$1</h2>')
      .replace(/<p># (.*?)<\/p>/g, '<h1>$1</h1>');
  
    // Replace bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');
    
    // Replace italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/_(.*?)_/g, '<em>$1</em>');
    
    // Replace links
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Replace bullet lists - find patterns for bullet points
    let bulletListPattern = /<p>(\s*[-*+]\s+.*?)<\/p>/gs;
    html = html.replace(bulletListPattern, function(match, list) {
      let items = list.split(/\n(?=\s*[-*+]\s+)/);
      let listItems = items.map(item => {
        return '<li>' + item.replace(/^\s*[-*+]\s+/, '') + '</li>';
      }).join('');
      
      return '<ul>' + listItems + '</ul>';
    });
    
    // Replace numbered lists - find patterns for numbered lists
    let numberedListPattern = /<p>(\s*\d+\.\s+.*?)<\/p>/gs;
    html = html.replace(numberedListPattern, function(match, list) {
      let items = list.split(/\n(?=\s*\d+\.\s+)/);
      let listItems = items.map(item => {
        return '<li>' + item.replace(/^\s*\d+\.\s+/, '') + '</li>';
      }).join('');
      
      return '<ol>' + listItems + '</ol>';
    });
    
    // Handle code blocks
    html = html.replace(/<p>```([\s\S]*?)```<\/p>/g, '<pre><code>$1</code></pre>');
    
    // Handle inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Handle blockquotes
    html = html.replace(/<p>&gt;\s+(.*?)<\/p>/g, '<blockquote><p>$1</p></blockquote>');
    
    // Clean up any empty paragraphs
    html = html.replace(/<p><\/p>/g, '');
    
    return html;
  }
  
  // Configure BlogEmbed settings
  window.BlogEmbed.configure = function(newConfig) {
    if (!newConfig) return;
    
    if (newConfig.apiUrl) config.apiUrl = newConfig.apiUrl;
    if (newConfig.apiKey) config.apiKey = newConfig.apiKey;
    if (newConfig.containerId) config.containerId = newConfig.containerId;
    
    // Add CSS styles
    addStyles();
  };
  
  // Load a list of all published blog posts
  window.BlogEmbed.loadPosts = async function() {
    const container = document.getElementById(config.containerId);
    if (!container) {
      console.error(`Container with ID '${config.containerId}' not found`);
      return;
    }
    
    try {
      // Display loading state
      container.innerHTML = '<div class="blog-loading">Loading posts...</div>';
      container.className = 'blog-container';
      
      // Fetch posts from the API
      const response = await fetch(`${config.apiUrl}/blog_posts?select=id,title,slug,description,hero_image,created_at&published=eq.true&order=created_at.desc`, {
        headers: {
          'apikey': config.apiKey,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.status}`);
      }
      
      const posts = await response.json();
      
      if (posts.length === 0) {
        container.innerHTML = '<div class="blog-error">No posts found.</div>';
        return;
      }
      
      // Generate HTML for posts
      let html = '<div class="blog-post-list">';
      
      posts.forEach(post => {
        const postUrl = `/blog/${post.slug}`;
        
        html += `
          <article class="blog-post-card">
            <a href="${postUrl}" class="blog-post-link">
              ${post.hero_image ? `<img src="${post.hero_image}" alt="${post.title}" class="blog-post-image">` : ''}
              <div class="blog-post-content">
                <h2 class="blog-post-title">${post.title}</h2>
                ${post.description ? `<p class="blog-post-description">${post.description}</p>` : ''}
                <p class="blog-post-date">${formatDate(post.created_at)}</p>
              </div>
            </a>
          </article>
        `;
      });
      
      html += '</div>';
      
      // Update the container
      container.innerHTML = html;
      
    } catch (error) {
      console.error('Error loading posts:', error);
      container.innerHTML = '<div class="blog-error">Failed to load posts. Please try again later.</div>';
    }
  };
  
  // Load a single blog post by slug
  window.BlogEmbed.loadPost = async function(slug) {
    const container = document.getElementById(config.containerId);
    if (!container) {
      console.error(`Container with ID '${config.containerId}' not found`);
      return;
    }
    
    try {
      // Display loading state
      container.innerHTML = '<div class="blog-loading">Loading content...</div>';
      container.className = 'blog-container blog-post-container';
      
      // Fetch the blog post
      console.log(`Fetching post with slug: ${slug}`);
      const response = await fetch(`${config.apiUrl}/blog_posts?slug=eq.${encodeURIComponent(slug)}&published=eq.true`, {
        headers: {
          'apikey': config.apiKey,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch post: ${response.status}`);
      }
      
      const posts = await response.json();
      
      if (posts.length === 0) {
        container.innerHTML = '<div class="blog-error">Post not found.</div>';
        return;
      }
      
      const post = posts[0];
      console.log(`Found post: ${post.title}`);
      
      // Fetch sections for this post
      const sectionsResponse = await fetch(`${config.apiUrl}/blog_sections?blog_post_id=eq.${post.id}&order=position.asc`, {
        headers: {
          'apikey': config.apiKey,
          'Content-Type': 'application/json'
        }
      });
      
      if (!sectionsResponse.ok) {
        throw new Error(`Failed to fetch sections: ${sectionsResponse.status}`);
      }
      
      const sections = await sectionsResponse.json();
      console.log(`Found ${sections.length} sections`);
      
      // Fetch section content for each section
      for (const section of sections) {
        const contentResponse = await fetch(`${config.apiUrl}/section_content?section_id=eq.${section.id}&order=position.asc`, {
          headers: {
            'apikey': config.apiKey,
            'Content-Type': 'application/json'
          }
        });
        
        if (!contentResponse.ok) {
          throw new Error(`Failed to fetch section content: ${contentResponse.status}`);
        }
        
        section.content = await contentResponse.json();
        console.log(`Section "${section.title}" has ${section.content.length} content items`);
      }
      
      // Fetch FAQs for this post
      const faqsResponse = await fetch(`${config.apiUrl}/blog_faqs?blog_post_id=eq.${post.id}&order=position.asc`, {
        headers: {
          'apikey': config.apiKey,
          'Content-Type': 'application/json'
        }
      });
      
      if (!faqsResponse.ok) {
        throw new Error(`Failed to fetch FAQs: ${faqsResponse.status}`);
      }
      
      const faqs = await faqsResponse.json();
      console.log(`Found ${faqs.length} FAQs`);
      
      // Generate HTML for the blog post
      let html = `
        <article class="blog-post">
          <header class="blog-post-header">
            <h1 class="blog-post-title">${post.title}</h1>
            <p class="blog-post-date">${formatDate(post.created_at)}</p>
            ${post.hero_image ? `<img src="${post.hero_image}" alt="${post.title}" class="blog-post-hero-image">` : ''}
            ${post.description ? `<div class="blog-post-description">${post.description}</div>` : ''}
          </header>
      `;
      
      // Add table of contents if there are sections
      if (sections.length > 0) {
        html += '<div class="blog-table-of-contents"><h2>Table of Contents</h2><ul>';
        
        sections.forEach(section => {
          const sectionId = `section-${section.id}`;
          html += `<li><a href="#${sectionId}">${section.title}</a></li>`;
        });
        
        html += '</ul></div>';
      }
      
      // Add sections
      sections.forEach(section => {
        const sectionId = `section-${section.id}`;
        
        html += `
          <section id="${sectionId}" class="blog-section">
            <h2 class="blog-section-title">${section.title}</h2>
            <div class="blog-content">
        `;
        
        // Add content for this section
        section.content.forEach(item => {
          if (item.type === 'text') {
            html += renderMarkdown(item.content.text);
          } else if (item.type === 'image' && item.content.src) {
            html += `
              <div class="blog-image-container">
                <img src="${item.content.src}" alt="${item.content.alt || ''}" class="blog-content-image">
                ${item.content.caption ? `<div class="blog-image-caption">${item.content.caption}</div>` : ''}
              </div>
            `;
          }
        });
        
        html += '</div></section>';
      });
      
      // Add conclusion if it exists
      if (post.conclusion) {
        html += `
          <div class="blog-conclusion">
            <h2>Conclusion</h2>
            ${renderMarkdown(post.conclusion)}
          </div>
        `;
      }
      
      // Add FAQs if there are any
      if (faqs.length > 0) {
        html += '<div class="blog-faqs"><h2>Frequently Asked Questions</h2>';
        
        faqs.forEach(faq => {
          html += `
            <div class="blog-faq-item">
              <div class="blog-faq-question">${faq.question}</div>
              <div class="blog-faq-answer">${renderMarkdown(faq.answer)}</div>
            </div>
          `;
        });
        
        html += '</div>';
      }
      
      html += '</article>';
      
      // Update the container
      container.innerHTML = html;
      
      // Add interactivity to FAQs
      const questions = document.querySelectorAll('.blog-faq-question');
      questions.forEach(question => {
        question.addEventListener('click', () => {
          const answer = question.nextElementSibling;
          const isActive = question.classList.contains('active');
          
          // Close all other active FAQs
          document.querySelectorAll('.blog-faq-question.active').forEach(item => {
            if (item !== question) {
              item.classList.remove('active');
              item.nextElementSibling.classList.remove('active');
            }
          });
          
          // Toggle this FAQ
          if (isActive) {
            question.classList.remove('active');
            answer.classList.remove('active');
          } else {
            question.classList.add('active');
            answer.classList.add('active');
          }
        });
      });
      
    } catch (error) {
      console.error('Error loading post:', error);
      container.innerHTML = '<div class="blog-error">Failed to load the blog post. Please try again later.</div>';
    }
  };
})();
