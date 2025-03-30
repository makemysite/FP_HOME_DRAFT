
/**
 * BlogEmbed - A client library for embedding BlogSmith content
 */
import { supabase } from '@/integrations/supabase/client';

export interface BlogEmbedOptions {
  limit?: number;
  showDescription?: boolean;
  showImage?: boolean;
  fallbackContent?: string;
  retryOnFailure?: boolean;
  retryAttempts?: number;
  retryDelay?: number;
}

export interface BlogEmbedConfig {
  debug?: boolean;
  domCheckInterval?: number;
  errorHandler?: (error: Error) => void;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  hero_image: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  category: string;
  label: string;
  published: boolean;
  conclusion: string | null;
}

// Define the return type for fetchBlogPost
interface BlogPostData {
  post: BlogPost | null;
  sections: any[];
  faqs?: any[]; // FAQs property is explicitly defined
}

class BlogEmbed {
  private activeContainers: Set<string> = new Set();
  private config: BlogEmbedConfig;
  private domCheckIntervalId: number | null = null;
  
  constructor(config: BlogEmbedConfig = {}) {
    this.config = {
      debug: false,
      domCheckInterval: 0,
      errorHandler: undefined,
      ...config
    };
    
    this.log('BlogEmbed: Initialized with Supabase integration');
    
    // Start DOM check interval if configured
    if (this.config.domCheckInterval && this.config.domCheckInterval > 0) {
      this.startDomChecks();
    }
  }
  
  private log(...args: any[]): void {
    if (this.config.debug) {
      console.log(...args);
    }
  }
  
  private handleError(error: Error, context?: string): void {
    const contextualError = context ? new Error(`${context}: ${error.message}`) : error;
    
    // Call custom error handler if provided
    if (typeof this.config.errorHandler === 'function') {
      try {
        this.config.errorHandler(contextualError);
      } catch (handlerError) {
        console.error('Error in custom error handler:', handlerError);
      }
    }
    
    // Always log the error
    console.error(context || 'BlogEmbed Error:', error);
  }
  
  private startDomChecks(): void {
    // Clear any existing interval first
    if (this.domCheckIntervalId !== null) {
      window.clearInterval(this.domCheckIntervalId);
    }
    
    // Set up new interval
    this.domCheckIntervalId = window.setInterval(() => {
      try {
        // Check all active containers to ensure they still exist in the DOM
        const containersToRemove: string[] = [];
        
        this.activeContainers.forEach(containerId => {
          const container = document.getElementById(containerId);
          if (!container || !document.body.contains(container)) {
            this.log(`DOM check: Container #${containerId} no longer in DOM, removing from tracking`);
            containersToRemove.push(containerId);
          }
        });
        
        // Remove any containers that no longer exist
        containersToRemove.forEach(id => {
          this.activeContainers.delete(id);
        });
      } catch (error) {
        console.error('Error in DOM check interval:', error);
      }
    }, this.config.domCheckInterval);
  }
  
  private stopDomChecks(): void {
    if (this.domCheckIntervalId !== null) {
      window.clearInterval(this.domCheckIntervalId);
      this.domCheckIntervalId = null;
    }
  }

  // Method to fetch blog posts from Supabase with retry capability
  private async fetchBlogPosts(limit: number = 10, retryOptions?: { attempts: number, delay: number }): Promise<BlogPost[]> {
    const maxAttempts = retryOptions?.attempts || 1;
    const delayMs = retryOptions?.delay || 1000;
    
    let currentAttempt = 0;
    let lastError: any = null;
    
    while (currentAttempt < maxAttempts) {
      try {
        currentAttempt++;
        this.log(`BlogEmbed: Fetching ${limit} blog posts from Supabase (attempt ${currentAttempt}/${maxAttempts})`);
        
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false })
          .limit(limit);
        
        if (error) {
          lastError = error;
          this.log(`Error fetching blog posts (attempt ${currentAttempt}/${maxAttempts}):`, error);
          
          // If we have attempts left, wait before retrying
          if (currentAttempt < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, delayMs));
            continue;
          }
          
          throw error;
        }
        
        return data || [];
      } catch (error) {
        lastError = error;
        this.log(`Error fetching blog posts (attempt ${currentAttempt}/${maxAttempts}):`, error);
        
        // If we have attempts left, wait before retrying
        if (currentAttempt < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, delayMs));
          continue;
        }
      }
    }
    
    // If we get here, all attempts failed
    this.handleError(new Error(lastError?.message || 'Failed to fetch blog posts after multiple attempts'), 'FetchBlogPosts');
    return [];
  }

  // Method to fetch a single blog post by slug with all related content and retry capability
  private async fetchBlogPost(slug: string, retryOptions?: { attempts: number, delay: number }): Promise<BlogPostData> {
    const maxAttempts = retryOptions?.attempts || 1;
    const delayMs = retryOptions?.delay || 1000;
    
    let currentAttempt = 0;
    let lastError: any = null;
    
    while (currentAttempt < maxAttempts) {
      try {
        currentAttempt++;
        this.log(`BlogEmbed: Fetching blog post with slug "${slug}" from Supabase (attempt ${currentAttempt}/${maxAttempts})`);
        
        // Fetch the main blog post
        const { data: post, error: postError } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .eq('published', true)
          .single();
        
        if (postError) {
          lastError = postError;
          this.log(`Error fetching blog post (attempt ${currentAttempt}/${maxAttempts}):`, postError);
          
          // If we have attempts left, wait before retrying
          if (currentAttempt < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, delayMs));
            continue;
          }
          
          throw postError;
        }

        if (!post) {
          return { post: null, sections: [], faqs: [] };
        }

        // Fetch blog sections with their content
        const { data: sections, error: sectionsError } = await supabase
          .from('blog_sections')
          .select(`
            id, 
            title, 
            position,
            section_content(id, type, content, position)
          `)
          .eq('blog_post_id', post.id)
          .order('position', { ascending: true });

        if (sectionsError) {
          this.log('Error fetching blog sections:', sectionsError);
        }

        // Fetch FAQs if any
        const { data: faqs, error: faqsError } = await supabase
          .from('blog_faqs')
          .select('*')
          .eq('blog_post_id', post.id)
          .order('position', { ascending: true });

        if (faqsError) {
          this.log('Error fetching blog FAQs:', faqsError);
        }

        // Add FAQs to the result
        return { 
          post, 
          sections: sections || [],
          faqs: faqs || []
        };
      } catch (error) {
        lastError = error;
        this.log(`Error fetching blog post (attempt ${currentAttempt}/${maxAttempts}):`, error);
        
        // If we have attempts left, wait before retrying
        if (currentAttempt < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, delayMs));
          continue;
        }
      }
    }
    
    // If we get here, all attempts failed
    this.handleError(new Error(lastError?.message || 'Failed to fetch blog post after multiple attempts'), 'FetchBlogPost');
    return { post: null, sections: [], faqs: [] };
  }

  // Method to safely check if a container exists with added error handling
  private getContainer(containerId: string): HTMLElement | null {
    try {
      // Check if container ID is being tracked
      if (!this.activeContainers.has(containerId)) {
        // Add it to tracking
        this.activeContainers.add(containerId);
      }
      
      const container = document.getElementById(containerId);
      if (!container) {
        this.log(`Container with ID "${containerId}" not found`);
        // Remove from tracked containers if not found
        this.activeContainers.delete(containerId);
        return null;
      }
      
      // Extra check to ensure container is in the DOM
      if (!document.body.contains(container)) {
        this.log(`Container with ID "${containerId}" is not in the DOM`);
        // Remove from tracked containers if not in DOM
        this.activeContainers.delete(containerId);
        return null;
      }
      
      return container;
    } catch (error) {
      this.handleError(error as Error, `Error getting container ${containerId}`);
      this.activeContainers.delete(containerId);
      return null;
    }
  }

  // Method to safely update container content with improved error handling
  private safelyUpdateContainer(container: HTMLElement | null, content: string, containerId: string): boolean {
    if (!container) {
      // Container not available, remove from tracking
      this.activeContainers.delete(containerId);
      return false;
    }
    
    try {
      // Extra check to ensure the container is still in the DOM
      if (!document.body.contains(container)) {
        this.log(`Container #${containerId} is no longer in the DOM, aborting update`);
        this.activeContainers.delete(containerId);
        return false;
      }
      
      // Using a safer approach to set innerHTML
      try {
        // First method: Use innerHTML directly with defensive check
        container.innerHTML = content;
        return true;
      } catch (innerHTMLError) {
        this.log(`Error using innerHTML directly, trying alternate approach:`, innerHTMLError);
        
        // Second method: Create a document fragment
        const fragment = document.createDocumentFragment();
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;
        
        // Clear the container first safely
        while (container.firstChild) {
          try {
            container.removeChild(container.firstChild);
          } catch (removeError) {
            this.log(`Error removing child:`, removeError);
            // Break to avoid infinite loop
            break;
          }
        }
        
        // Move nodes from temp div to fragment
        while (tempDiv.firstChild) {
          fragment.appendChild(tempDiv.firstChild);
        }
        
        // Append fragment to container
        container.appendChild(fragment);
        
        return true;
      }
    } catch (error) {
      this.handleError(error as Error, `Error updating container ${containerId} content`);
      this.activeContainers.delete(containerId);
      return false;
    }
  }

  // Method to safely clean up tracking for a container with improved error handling
  public cleanupContainer(containerId: string): void {
    try {
      // Remove from tracked containers first
      this.activeContainers.delete(containerId);
      
      const container = document.getElementById(containerId);
      if (!container) {
        this.log(`Container #${containerId} not found, skipping cleanup`);
        return;
      }
      
      if (!document.body.contains(container)) {
        this.log(`Container #${containerId} is not in DOM, skipping cleanup`);
        return;
      }
      
      // Clear the container's content safely
      try {
        // First approach: Set innerHTML to empty string
        container.innerHTML = '';
      } catch (error) {
        this.log(`Error clearing container with innerHTML, trying alternate approach:`, error);
        
        // Fallback approach: Remove children one by one
        while (container.firstChild) {
          try {
            if (container.firstChild.parentNode === container) {
              container.removeChild(container.firstChild);
            } else {
              // If parentNode doesn't match, just break out to avoid errors
              break;
            }
          } catch (removeError) {
            this.log(`Error removing child:`, removeError);
            // Break to avoid infinite loop
            break;
          }
        }
      }
    } catch (error) {
      this.handleError(error as Error, `Error cleaning up container ${containerId}`);
    }
  }

  // Method to clean up all tracked containers with enhanced error handling
  public cleanupAllContainers(): void {
    try {
      // Make a copy of the set to avoid iteration issues during deletion
      const containers = Array.from(this.activeContainers);
      
      // Clear our tracking set first
      this.activeContainers.clear();
      
      // Clean each container individually
      containers.forEach(id => {
        try {
          const container = document.getElementById(id);
          if (container && document.body.contains(container)) {
            try {
              // Attempt to clear innerHTML first
              container.innerHTML = '';
            } catch (clearError) {
              this.log(`Error clearing container ${id} with innerHTML:`, clearError);
              
              // Fallback: remove children one by one
              try {
                while (container.firstChild) {
                  if (container.firstChild.parentNode === container) {
                    container.removeChild(container.firstChild);
                  } else {
                    break;
                  }
                }
              } catch (removeError) {
                this.log(`Error removing children from container ${id}:`, removeError);
              }
            }
          } else {
            this.log(`Container #${id} does not exist or is not in DOM during cleanup`);
          }
        } catch (containerError) {
          this.handleError(containerError as Error, `Error cleaning up container ${id}`);
        }
      });
      
      // Stop DOM checks when cleaning up all containers
      this.stopDomChecks();
    } catch (error) {
      this.handleError(error as Error, 'Error in cleanupAllContainers');
    }
  }

  // Method to check if container is still being tracked
  public isContainerActive(containerId: string): boolean {
    return this.activeContainers.has(containerId);
  }

  // Method to render a list of blog posts with enhanced error handling and fallback content
  async renderBlogList(containerId: string, options: BlogEmbedOptions = {}): Promise<void> {
    const container = this.getContainer(containerId);
    if (!container) {
      this.handleError(new Error(`Container with ID "${containerId}" not found`), 'RenderBlogList');
      return;
    }

    const { 
      limit = 10, 
      showDescription = true, 
      showImage = true,
      fallbackContent = 'No blog posts found',
      retryOnFailure = false,
      retryAttempts = 1,
      retryDelay = 1000
    } = options;
    
    // Show loading state
    this.safelyUpdateContainer(container, '<div class="blog-embed-loading">Loading blog posts...</div>', containerId);
    
    // Fetch posts from Supabase with retry capability if requested
    const posts = await this.fetchBlogPosts(
      limit,
      retryOnFailure ? { attempts: retryAttempts, delay: retryDelay } : undefined
    );

    // Check if container still exists and is being tracked
    if (!this.isContainerActive(containerId)) {
      this.log(`Container #${containerId} is no longer being tracked, aborting render`);
      return;
    }
    
    const updatedContainer = this.getContainer(containerId);
    if (!updatedContainer) {
      this.log(`Container #${containerId} no longer exists, aborting render`);
      return;
    }

    // Add blog-embed-list class for styling
    updatedContainer.classList.add('blog-embed-list');
    
    if (posts.length === 0) {
      this.safelyUpdateContainer(
        updatedContainer, 
        `<div class="blog-embed-empty">${fallbackContent}</div>`, 
        containerId
      );
      return;
    }
    
    // Generate HTML for blog list
    const postsHtml = posts.map(post => {
      const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      return `
        <article class="blog-embed-list-item">
          ${showImage && post.hero_image ? `<img src="${post.hero_image}" alt="${post.title}" class="blog-embed-image" />` : ''}
          <h3 class="blog-embed-title">${post.title}</h3>
          ${showDescription && post.description ? `<p class="blog-embed-description">${post.description}</p>` : ''}
          <div class="blog-embed-meta">
            <span class="blog-embed-date">${formattedDate}</span>
            <span class="blog-embed-category">${post.category || 'Uncategorized'}</span>
          </div>
          <a href="/blog/${post.slug}" class="blog-embed-read-more">Read More</a>
        </article>
      `;
    }).join('');

    // Final check if container still exists and is being tracked
    if (!this.isContainerActive(containerId)) {
      this.log(`Container #${containerId} is no longer being tracked, aborting render`);
      return;
    }
    
    const finalContainer = this.getContainer(containerId);
    if (!finalContainer) {
      this.log(`Container #${containerId} no longer exists, aborting render`);
      return;
    }

    // Set the HTML
    this.safelyUpdateContainer(finalContainer, postsHtml, containerId);

    // Add SEO metadata
    this.addSEOMetadata('Blog Posts', 'Latest blog posts from our company');
  }

  // Method to render a single blog post with enhanced error handling and fallback content
  async renderBlogPost(containerId: string, slug: string, options: BlogEmbedOptions = {}): Promise<void> {
    const container = this.getContainer(containerId);
    if (!container) {
      this.handleError(new Error(`Container with ID "${containerId}" not found`), 'RenderBlogPost');
      return;
    }

    const {
      fallbackContent = 'Blog post not found',
      retryOnFailure = false,
      retryAttempts = 1,
      retryDelay = 1000
    } = options;

    // Show loading state
    this.safelyUpdateContainer(container, '<div class="blog-embed-loading">Loading blog post...</div>', containerId);
    
    // Fetch post from Supabase with all related content and retry capability if requested
    const { post, sections, faqs } = await this.fetchBlogPost(
      slug,
      retryOnFailure ? { attempts: retryAttempts, delay: retryDelay } : undefined
    );
    
    // Check if container still exists and is being tracked
    if (!this.isContainerActive(containerId)) {
      this.log(`Container #${containerId} is no longer being tracked, aborting render`);
      return;
    }
    
    const updatedContainer = this.getContainer(containerId);
    if (!updatedContainer) {
      this.log(`Container #${containerId} no longer exists, aborting render`);
      return;
    }
    
    if (!post) {
      this.safelyUpdateContainer(
        updatedContainer, 
        `<div class="blog-embed-error">${fallbackContent}</div>`, 
        containerId
      );
      throw new Error(`Blog post with slug "${slug}" not found`);
    }

    // Add blog-embed-post class for styling
    updatedContainer.classList.add('blog-embed-post');
    
    const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Generate HTML for the blog post header
    let postHtml = `
      <article>
        ${post.hero_image ? `<img src="${post.hero_image}" alt="${post.title}" class="blog-embed-post-image" />` : ''}
        <h1 class="blog-embed-post-title">${post.title}</h1>
        <div class="blog-embed-post-meta">
          <span class="blog-embed-post-date">${formattedDate}</span>
          <span class="blog-embed-post-category">${post.category || 'Uncategorized'}</span>
        </div>
        
        <div class="blog-embed-post-description">
          ${post.description || ''}
        </div>
    `;

    // Add sections with their content
    if (sections && sections.length > 0) {
      sections.forEach((section) => {
        postHtml += `
          <div class="blog-embed-section" id="section-${section.id}">
            <h2 class="blog-embed-section-title">${section.title}</h2>
            <div class="blog-embed-section-content">
        `;

        // Sort section content by position
        const sectionContent = section.section_content || [];
        sectionContent.sort((a, b) => a.position - b.position);

        // Add each content block
        sectionContent.forEach(content => {
          switch (content.type) {
            case 'text':
              postHtml += `<div class="blog-embed-content-text">${content.content?.text || ''}</div>`;
              break;
            case 'image':
              postHtml += `
                <div class="blog-embed-content-image">
                  <img src="${content.content?.url || ''}" alt="${content.content?.alt || ''}" />
                  ${content.content?.caption ? `<figcaption>${content.content.caption}</figcaption>` : ''}
                </div>
              `;
              break;
            case 'quote':
              postHtml += `
                <blockquote class="blog-embed-content-quote">
                  <p>${content.content?.text || ''}</p>
                  ${content.content?.source ? `<cite>${content.content.source}</cite>` : ''}
                </blockquote>
              `;
              break;
            case 'list':
              const listItems = content.content?.items || [];
              const listType = content.content?.ordered ? 'ol' : 'ul';
              
              postHtml += `<${listType} class="blog-embed-content-list">`;
              listItems.forEach(item => {
                postHtml += `<li>${item}</li>`;
              });
              postHtml += `</${listType}>`;
              break;
            default:
              // Handle unknown content type
              this.log(`Unknown content type: ${content.type}`);
              if (typeof content.content === 'string') {
                postHtml += `<div>${content.content}</div>`;
              } else if (content.content && typeof content.content === 'object') {
                postHtml += `<div>${JSON.stringify(content.content)}</div>`;
              }
          }
        });

        postHtml += `
            </div>
          </div>
        `;
      });
    }

    // Add FAQs section if available
    if (faqs && faqs.length > 0) {
      postHtml += `
        <div class="blog-embed-faqs">
          <h2 class="blog-embed-faqs-title">Frequently Asked Questions</h2>
          <div class="blog-embed-faqs-list">
      `;

      faqs.forEach(faq => {
        postHtml += `
          <div class="blog-embed-faq">
            <h3 class="blog-embed-faq-question">${faq.question}</h3>
            <div class="blog-embed-faq-answer">${faq.answer}</div>
          </div>
        `;
      });

      postHtml += `
          </div>
        </div>
      `;
    }

    // Add conclusion if available
    if (post.conclusion) {
      postHtml += `
        <div class="blog-embed-conclusion">
          <h2 class="blog-embed-conclusion-title">Conclusion</h2>
          <div class="blog-embed-conclusion-content">${post.conclusion}</div>
        </div>
      `;
    }

    // Close the article tag
    postHtml += `</article>`;

    // Final check if container still exists and is tracked
    if (!this.isContainerActive(containerId)) {
      this.log(`Container #${containerId} is no longer being tracked, aborting render`);
      return;
    }
    
    const finalContainer = this.getContainer(containerId);
    if (!finalContainer) {
      this.log(`Container #${containerId} no longer exists, aborting render`);
      return;
    }

    // Set the HTML with safer method
    this.safelyUpdateContainer(finalContainer, postHtml, containerId);

    // Add SEO metadata for the specific post
    this.addSEOMetadata(post.title, post.description || '', post.hero_image || undefined);
  }

  // Add SEO metadata to the page
  private addSEOMetadata(title: string, description: string, image?: string): void {
    try {
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
        try {
          script = document.createElement('script');
          script.setAttribute('type', 'application/ld+json');
          document.head.appendChild(script);
        } catch (error) {
          this.log("Error creating schema script:", error);
          return;
        }
      }
      
      try {
        script.textContent = JSON.stringify(schemaData);
      } catch (error) {
        this.log("Error setting script content:", error);
      }

      // Add meta tags for SEO and social sharing
      this.setMetaTag('title', title);
      this.setMetaTag('description', description);
      this.setMetaTag('og:title', title);
      this.setMetaTag('og:description', description);
      if (image) {
        this.setMetaTag('og:image', image);
      }
    } catch (error) {
      this.handleError(error as Error, "Error setting SEO metadata");
    }
  }

  // Helper method to set or update meta tags
  private setMetaTag(name: string, content: string): void {
    try {
      let meta = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
      if (!meta) {
        try {
          meta = document.createElement('meta');
          if (name.startsWith('og:')) {
            meta.setAttribute('property', name);
          } else {
            meta.setAttribute('name', name);
          }
          document.head.appendChild(meta);
        } catch (error) {
          this.log(`Error creating meta tag ${name}:`, error);
          return;
        }
      }
      
      meta.setAttribute('content', content);
    } catch (error) {
      this.log(`Error setting meta tag ${name}:`, error);
    }
  }
  
  // Clean up resources when instance is no longer needed
  public destroy(): void {
    try {
      // Clean up all containers
      this.cleanupAllContainers();
      
      // Stop DOM checks
      this.stopDomChecks();
      
      this.log('BlogEmbed instance destroyed');
    } catch (error) {
      this.handleError(error as Error, 'Error destroying BlogEmbed instance');
    }
  }
}

export default BlogEmbed;
