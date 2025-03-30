
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
  private blogPosts: BlogPost[] = [
    {
      id: 1,
      slug: "scalable-application-aws",
      image: "https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/6df54d197fcb93eba7de2f3bec60bd7d62d5c6df?placeholderIfAbsent=true",
      title: "How to Build a Scalable Application up to 1 Million Users on AWS",
      description: "Learn the key architectural decisions and AWS services that enable you to scale your application to support a million users efficiently.",
      date: "June 15, 2023",
      author: "Alex Johnson"
    },
    {
      id: 2,
      slug: "reducing-cloud-costs",
      image: "https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/32455780da50348952934e255ef56b99a6abf598?placeholderIfAbsent=true",
      title: "5 Strategies for Reducing Your Cloud Infrastructure Costs",
      description: "Practical tips to optimize your cloud spending without compromising on performance or reliability.",
      date: "July 22, 2023",
      author: "Samantha Lee"
    },
    {
      id: 3,
      slug: "field-service-mobile-apps",
      image: "https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/773964830d4922e124cd00b93afc92626bc1a944?placeholderIfAbsent=true",
      title: "Best Practices for Field Service Mobile Applications",
      description: "How to design and implement mobile applications that truly empower your field service technicians.",
      date: "August 5, 2023",
      author: "Michael Chen"
    },
    {
      id: 4,
      slug: "real-time-analytics",
      image: "https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/eb83e093cf09f45a48cbce15f61c6acb114e3b02?placeholderIfAbsent=true",
      title: "Implementing Real-Time Analytics for Field Service Operations",
      description: "A comprehensive guide to setting up dashboards and metrics that drive operational excellence.",
      date: "September 12, 2023",
      author: "Rachel Williams"
    },
    {
      id: 5,
      slug: "ai-dispatch-optimization",
      image: "https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/6a3eae6fe5fa62d85a4ca98956ab3569d1d92b2e?placeholderIfAbsent=true",
      title: "How AI is Revolutionizing Field Service Dispatch Optimization",
      description: "Explore the latest AI and machine learning techniques for smart scheduling and routing.",
      date: "October 8, 2023",
      author: "David Patel"
    },
    {
      id: 6,
      slug: "integration-customer-systems",
      image: "https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/6df54d197fcb93eba7de2f3bec60bd7d62d5c6df?placeholderIfAbsent=true",
      title: "Seamless Integration With Customer Systems: A Step-by-Step Guide",
      description: "Learn how to connect your field service software with clients' existing systems for maximum efficiency.",
      date: "November 19, 2023",
      author: "Lisa Zhang"
    },
    {
      id: 7,
      slug: "predictive-maintenance",
      image: "https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/32455780da50348952934e255ef56b99a6abf598?placeholderIfAbsent=true",
      title: "The Future of Predictive Maintenance in Field Service",
      description: "How IoT sensors and machine learning are transforming maintenance from reactive to predictive.",
      date: "December 3, 2023",
      author: "James Wilson"
    },
    {
      id: 8,
      slug: "customer-experience",
      image: "https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/773964830d4922e124cd00b93afc92626bc1a944?placeholderIfAbsent=true",
      title: "Elevating Customer Experience in Field Service Management",
      description: "Strategies for using technology to exceed customer expectations and build loyalty.",
      date: "January 15, 2024",
      author: "Emma Thompson"
    }
  ];

  constructor() {
    // Initialize subscription for real-time updates (simulated)
    this.subscribeToUpdates();
  }

  // Method to render a list of blog posts
  renderBlogList(containerId: string, options: BlogEmbedOptions = {}): void {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container with ID "${containerId}" not found`);
      return;
    }

    const { limit = 10, showDescription = true, showImage = true } = options;
    const posts = this.blogPosts.slice(0, limit);

    // Add blog-embed-list class for styling
    container.classList.add('blog-embed-list');
    
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
  renderBlogPost(containerId: string, slug: string): void {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container with ID "${containerId}" not found`);
      return;
    }

    const post = this.blogPosts.find(post => post.slug === slug);
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
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
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

  // Simulate subscription to real-time updates
  private subscribeToUpdates(): void {
    // In a real implementation, this would connect to a WebSocket or SSE endpoint
    console.log('BlogEmbed: Subscribed to real-time updates');
  }
}

export default BlogEmbed;
