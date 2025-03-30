
/**
 * BlogEmbed - A client library for embedding BlogSmith content
 */
import { supabase } from '@/integrations/supabase/client';

export interface BlogEmbedOptions {
  limit?: number;
  showDescription?: boolean;
  showImage?: boolean;
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
  faqs?: any[]; // Add the faqs property to the interface
}

class BlogEmbed {
  constructor() {
    console.log('BlogEmbed: Initialized with Supabase integration');
  }

  // Method to fetch blog posts from Supabase
  private async fetchBlogPosts(limit: number = 10): Promise<BlogPost[]> {
    try {
      console.log(`BlogEmbed: Fetching ${limit} blog posts from Supabase`);
      
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (error) {
        console.error('Error fetching blog posts:', error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  }

  // Method to fetch a single blog post by slug with all related content
  private async fetchBlogPost(slug: string): Promise<BlogPostData> {
    try {
      console.log(`BlogEmbed: Fetching blog post with slug "${slug}" from Supabase`);
      
      // Fetch the main blog post
      const { data: post, error: postError } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();
      
      if (postError) {
        console.error('Error fetching blog post:', postError);
        return { post: null, sections: [] };
      }

      if (!post) {
        return { post: null, sections: [] };
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
        console.error('Error fetching blog sections:', sectionsError);
        return { post, sections: [] };
      }

      // Fetch FAQs if any
      const { data: faqs, error: faqsError } = await supabase
        .from('blog_faqs')
        .select('*')
        .eq('blog_post_id', post.id)
        .order('position', { ascending: true });

      if (faqsError) {
        console.error('Error fetching blog FAQs:', faqsError);
      }

      // Add FAQs to the result
      return { 
        post, 
        sections: sections || [],
        faqs: faqs || []
      };
    } catch (error) {
      console.error('Error fetching blog post:', error);
      return { post: null, sections: [] };
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
    
    // Fetch posts from Supabase
    const posts = await this.fetchBlogPosts(limit);

    // Add blog-embed-list class for styling
    container.classList.add('blog-embed-list');
    
    if (posts.length === 0) {
      container.innerHTML = '<div class="blog-embed-empty">No blog posts found</div>';
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
    
    // Fetch post from Supabase with all related content
    const { post, sections, faqs } = await this.fetchBlogPost(slug);
    
    if (!post) {
      container.innerHTML = '<div class="blog-embed-error">Blog post not found</div>';
      return;
    }

    // Add blog-embed-post class for styling
    container.classList.add('blog-embed-post');
    
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
      sections.forEach((section, index) => {
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
              console.warn(`Unknown content type: ${content.type}`);
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

    // Set the HTML
    container.innerHTML = postHtml;

    // Add SEO metadata for the specific post
    this.addSEOMetadata(post.title, post.description || '', post.hero_image || undefined);
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
