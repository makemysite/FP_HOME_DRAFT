
/**
 * BlogEmbed - A client library for embedding BlogSmith content
 */
export interface BlogEmbedOptions {
  limit?: number;
  showDescription?: boolean;
  showImage?: boolean;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  date: string;
  author: string;
}

class BlogEmbed {
  private apiEndpoint: string = 'https://api.blogsmith.example.com'; // This would be replaced with the actual BlogSmith API endpoint

  constructor() {
    console.log('BlogEmbed: Subscribed to real-time updates');
  }

  // Method to fetch blog posts from the API
  private async fetchBlogPosts(limit: number = 10): Promise<BlogPost[]> {
    try {
      // In a real implementation, this would make an API request to BlogSmith
      // For now, we'll return an empty array since we don't have the actual API
      console.log(`BlogEmbed: Fetching ${limit} blog posts from API`);
      
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return [];
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  }

  // Method to fetch a single blog post by slug
  private async fetchBlogPost(slug: string): Promise<BlogPost | null> {
    try {
      // In a real implementation, this would make an API request to BlogSmith
      // For now, we'll return null since we don't have the actual API
      console.log(`BlogEmbed: Fetching blog post with slug "${slug}" from API`);
      
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return null;
    } catch (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }
  }

  // Method to render a list of blog posts
  async renderBlogList(containerId: string, options: BlogEmbedOptions = {}): Promise<void> {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container with ID "${containerId}" not found`);
      return;
    }

    const { limit = 10, showDescription = true, showImage = true } = options;
    
    // Show loading state
    container.innerHTML = '<div class="blog-embed-loading">Loading blog posts...</div>';
    
    // Fetch posts from API
    const posts = await this.fetchBlogPosts(limit);

    // Add blog-embed-list class for styling
    container.classList.add('blog-embed-list');
    
    if (posts.length === 0) {
      container.innerHTML = '<div class="blog-embed-empty">No blog posts found</div>';
      return;
    }
    
    // Generate HTML for blog list
    const postsHtml = posts.map(post => {
      return `
        <article class="blog-embed-list-item">
          ${showImage ? `<img src="${post.image}" alt="${post.title}" class="blog-embed-image" />` : ''}
          <h3 class="blog-embed-title">${post.title}</h3>
          ${showDescription ? `<p class="blog-embed-description">${post.description}</p>` : ''}
          <div class="blog-embed-meta">
            <span class="blog-embed-date">${post.date}</span>
            <span class="blog-embed-author">by ${post.author}</span>
          </div>
          <a href="/blog/${post.slug}" class="blog-embed-read-more">Read More</a>
        </article>
      `;
    }).join('');

    // Set the HTML
    container.innerHTML = postsHtml;

    // Add SEO metadata
    this.addSEOMetadata('Blog Posts', 'Latest blog posts from our company');
  }

  // Method to render a single blog post
  async renderBlogPost(containerId: string, slug: string): Promise<void> {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container with ID "${containerId}" not found`);
      return;
    }

    // Show loading state
    container.innerHTML = '<div class="blog-embed-loading">Loading blog post...</div>';
    
    // Fetch post from API
    const post = await this.fetchBlogPost(slug);
    
    if (!post) {
      container.innerHTML = '<div class="blog-embed-error">Blog post not found</div>';
      return;
    }

    // Add blog-embed-post class for styling
    container.classList.add('blog-embed-post');
    
    // Generate HTML for the blog post
    const postHtml = `
      <article>
        <img src="${post.image}" alt="${post.title}" class="blog-embed-post-image" />
        <h1 class="blog-embed-post-title">${post.title}</h1>
        <div class="blog-embed-post-meta">
          <span class="blog-embed-post-date">${post.date}</span>
          <span class="blog-embed-post-author">by ${post.author}</span>
        </div>
        <div class="blog-embed-post-content">
          ${post.description}
        </div>
      </article>
    `;

    // Set the HTML
    container.innerHTML = postHtml;

    // Add SEO metadata for the specific post
    this.addSEOMetadata(post.title, post.description, post.image);
  }

  // Add SEO metadata to the page
  private addSEOMetadata(title: string, description: string, image?: string): void {
    // Add schema.org structured data
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": title,
      "description": description,
      "image": image || "",
      "publisher": {
        "@type": "Organization",
        "name": "BlogSmith",
        "logo": {
          "@type": "ImageObject",
          "url": "https://example.com/logo.png"
        }
      }
    };

    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schemaData);

    // Add meta tags for SEO and social sharing
    this.setMetaTag('title', title);
    this.setMetaTag('description', description);
    this.setMetaTag('og:title', title);
    this.setMetaTag('og:description', description);
    if (image) {
      this.setMetaTag('og:image', image);
    }
  }

  // Helper method to set or update meta tags
  private setMetaTag(name: string, content: string): void {
    let meta = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      if (name.startsWith('og:')) {
        meta.setAttribute('property', name);
      } else {
        meta.setAttribute('name', name);
      }
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  }
}

export default BlogEmbed;
