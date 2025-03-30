
/**
 * Build script for the BlogSmith client library
 * In a real implementation, this would transpile the TypeScript and bundle it
 */

const fs = require('fs');
const path = require('path');

// Create build directory if it doesn't exist
const buildDir = path.resolve(__dirname, '../../../build/client-lib');
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
}

// Function to create a file with content
function createFile(filename, content) {
  fs.writeFileSync(path.join(buildDir, filename), content);
  console.log(`Created ${filename}`);
}

// Create unminified version
createFile('blogsmith-embed.js', `
/**
 * BlogSmith Embed Library
 * Version: 1.0.0
 */
class BlogEmbed {
  constructor() {
    this.subscribeToUpdates();
  }

  renderBlogList(containerId, options = {}) {
    // Logic to render blog list
  }

  renderBlogPost(containerId, slug) {
    // Logic to render a single blog post
  }

  subscribeToUpdates() {
    // Subscribe to real-time updates
  }
}

export default BlogEmbed;
`);

// Create minified version
createFile('blogsmith-embed.min.js', 'class BlogEmbed{constructor(){this.subscribeToUpdates()}renderBlogList(e,t={}){/*...*/}renderBlogPost(e,t){/*...*/}subscribeToUpdates(){/*...*/}}export default BlogEmbed;');

// Create robots.txt
createFile('robots.txt', `User-agent: *
Allow: /blog/
`);

// Create README.md
createFile('README.md', `# BlogSmith Embed Library

A JavaScript library for embedding BlogSmith content on any website.

## Installation

Include the script in your HTML:

\`\`\`html
<script type="module" src="path/to/blogsmith-embed.min.js"></script>
\`\`\`

## Usage

See INSTALLATION.md for detailed instructions.
`);

// Create INSTALLATION.md
createFile('INSTALLATION.md', `# Installation and Usage Guide

## Basic Setup

1. Include the script in your HTML
2. Create a container for your blog content
3. Initialize the BlogEmbed object
4. Call renderBlogList() or renderBlogPost()

## Examples

See demo.html for complete examples.
`);

// Create demo.html
createFile('demo.html', `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BlogSmith Demo</title>
  <style>
    .blog-embed-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem; }
    .blog-embed-list-item { border: 1px solid #eee; padding: 1rem; border-radius: 8px; }
    /* Additional styles */
  </style>
</head>
<body>
  <h1>BlogSmith Demo</h1>
  
  <h2>Blog List Example</h2>
  <div id="blog-list-container"></div>
  
  <h2>Single Post Example</h2>
  <div id="blog-post-container"></div>
  
  <script type="module">
    import BlogEmbed from './blogsmith-embed.min.js';
    
    const blogEmbed = new BlogEmbed();
    
    // Render a list of posts
    blogEmbed.renderBlogList('blog-list-container', {
      limit: 3,
      showDescription: true,
      showImage: true
    });
    
    // Render a single post
    blogEmbed.renderBlogPost('blog-post-container', 'example-post-slug');
  </script>
</body>
</html>
`);

// Create generate-sitemap.js
createFile('generate-sitemap.js', `/**
 * Sitemap Generator for BlogSmith
 */
function generateSitemap(blogPosts) {
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  
  blogPosts.forEach(post => {
    sitemap += \`
  <url>
    <loc>https://yourdomain.com/blog/\${post.slug}</loc>
    <lastmod>\${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\`;
  });
  
  sitemap += '\n</urlset>';
  return sitemap;
}

module.exports = { generateSitemap };
`);

console.log('Build completed successfully! Files are in build/client-lib/');
