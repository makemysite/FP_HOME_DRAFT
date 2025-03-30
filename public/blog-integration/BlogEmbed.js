// This is a copy of the blog-embed.js file for the blog integration package

// BlogEmbed.js - Main script to integrate the blog functionality
// This script will load all necessary components and styles for the blog

(function() {
  // Configuration variables
  let config = {
    apiUrl: 'https://emdldcecqgrdgronpcoc.supabase.co/rest/v1',
    apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtZGxkY2VjcWdyZGdyb25wY29jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxNDQ5OTcsImV4cCI6MjA1ODcyMDk5N30.7f6V0MkrBtBSmao3boXqlEwy7IyB_lxAKtQtb-3M2NE',
    containerId: 'blog-container',
    baseRoute: '/blog'
  };

  // Helper functions
  function getPathSlug() {
    const path = window.location.pathname;
    const pathParts = path.split('/');
    // Ensure we're getting the correct slug from paths like /blog/some-slug/
    for (let i = 0; i < pathParts.length; i++) {
      if (pathParts[i] === 'blog' && i + 1 < pathParts.length) {
        return pathParts[i + 1];
      }
    }
    return null;
  }

  // Load CSS
  function loadStyles() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${config.baseRoute}/blog-styles.css`;
    document.head.appendChild(link);
    
    console.log(`Loading styles from: ${config.baseRoute}/blog-styles.css`);
  }

  // Load React and ReactDOM if not already loaded
  function loadReactDependencies(callback) {
    if (window.React && window.ReactDOM && window.ReactMarkdown) {
      callback();
      return;
    }

    // Load React
    const reactScript = document.createElement('script');
    reactScript.src = 'https://unpkg.com/react@18/umd/react.production.min.js';
    reactScript.crossOrigin = '';
    
    // Load ReactDOM
    const reactDOMScript = document.createElement('script');
    reactDOMScript.src = 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js';
    reactDOMScript.crossOrigin = '';
    
    // Load ReactMarkdown
    const markdownScript = document.createElement('script');
    markdownScript.src = 'https://unpkg.com/react-markdown@9.0.1/react-markdown.min.js';
    markdownScript.crossOrigin = '';

    document.body.appendChild(reactScript);
    
    reactScript.onload = function() {
      document.body.appendChild(reactDOMScript);
      
      reactDOMScript.onload = function() {
        document.body.appendChild(markdownScript);
        
        markdownScript.onload = function() {
          callback();
        };
      };
    };
  }

  // Fetch a blog post by slug
  async function fetchBlogPost(slug) {
    try {
      console.log(`Fetching blog post with slug: ${slug} from ${config.apiUrl}`);
      
      // Use the Supabase endpoint
      const response = await fetch(`${config.apiUrl}/blog_posts?slug=eq.${slug}`, {
        headers: {
          'apikey': config.apiKey
        }
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      const blogPosts = await response.json();
      let blogPost = blogPosts[0]; // Get the first result
      
      if (!blogPost && slug.endsWith('/')) {
        // Try without trailing slash
        const altSlug = slug.slice(0, -1);
        console.log(`Trying alternative slug without trailing slash: ${altSlug}`);
        
        const altResponse = await fetch(`${config.apiUrl}/blog_posts?slug=eq.${altSlug}`, {
          headers: {
            'apikey': config.apiKey
          }
        });
        
        if (altResponse.ok) {
          const altBlogPosts = await altResponse.json();
          blogPost = altBlogPosts[0];
        }
      }
      
      if (!blogPost && !slug.endsWith('/')) {
        // Try with trailing slash
        const altSlug = `${slug}/`;
        console.log(`Trying alternative slug with trailing slash: ${altSlug}`);
        
        const altResponse = await fetch(`${config.apiUrl}/blog_posts?slug=eq.${altSlug}`, {
          headers: {
            'apikey': config.apiKey
          }
        });
        
        if (altResponse.ok) {
          const altBlogPosts = await altResponse.json();
          blogPost = altBlogPosts[0];
        }
      }
      
      if (blogPost) {
        // Fetch related sections
        const sectionsResponse = await fetch(`${config.apiUrl}/blog_sections?blog_post_id=eq.${blogPost.id}&order=position`, {
          headers: {
            'apikey': config.apiKey
          }
        });
        
        const faqsResponse = await fetch(`${config.apiUrl}/blog_faqs?blog_post_id=eq.${blogPost.id}&order=position`, {
          headers: {
            'apikey': config.apiKey
          }
        });
        
        const sections = await sectionsResponse.json();
        const faqs = await faqsResponse.json();
        
        console.log(`Found ${sections.length} sections and ${faqs.length} FAQs for blog post`);
        
        // Fetch content for each section
        for (let section of sections) {
          const contentResponse = await fetch(`${config.apiUrl}/section_content?section_id=eq.${section.id}&order=position`, {
            headers: {
              'apikey': config.apiKey
            }
          });
          
          const content = await contentResponse.json();
          console.log(`Section "${section.title}" has ${content.length} content items`);
          
          // Transform the content to match our expected format
          section.content = content.map((item) => {
            if (item.type === 'text') {
              return {
                type: 'text',
                id: item.id,
                text: item.content?.text || ''
              };
            } else if (item.type === 'image') {
              return {
                type: 'image',
                id: item.id,
                src: item.content?.src || item.content?.url || '',
                alt: item.content?.alt || '',
                caption: item.content?.caption || ''
              };
            }
            return null;
          }).filter(Boolean);
        }
        
        // Transform data to match our expected format
        return {
          id: blogPost.id,
          title: blogPost.title,
          slug: blogPost.slug,
          metaTitle: blogPost.meta_title || '',
          metaDescription: blogPost.meta_description || '',
          heroImage: blogPost.hero_image || '',
          description: blogPost.description || '',
          createdAt: blogPost.created_at,
          updatedAt: blogPost.updated_at,
          published: blogPost.published,
          sections: sections,
          conclusion: blogPost.conclusion || '',
          faqs: faqs,
          category: blogPost.category,
          label: blogPost.label
        };
      } else {
        throw new Error(`Blog post not found for slug: ${slug}`);
      }
    } catch (err) {
      console.error("Error fetching blog post:", err);
      throw err;
    }
  }

  // Fetch all blog posts for the listing page
  async function fetchBlogPosts() {
    try {
      const response = await fetch(`${config.apiUrl}/blog_posts?published=eq.true&order=created_at.desc`, {
        headers: {
          'apikey': config.apiKey
        }
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      const blogPosts = await response.json();
      
      // Transform data to match expected format
      return blogPosts.map(post => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        description: post.description || '',
        heroImage: post.hero_image || '',
        createdAt: post.created_at,
        updatedAt: post.updated_at,
        published: post.published,
        category: post.category,
        label: post.label
      }));
    } catch (err) {
      console.error("Error fetching blog posts:", err);
      throw err;
    }
  }

  // Update meta tags for SEO
  function updateMetaTags(post) {
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', post.metaDescription || post.description || '');
    
    // Update Open Graph tags
    const updateOpenGraphTag = (property, content) => {
      let tag = document.querySelector(`meta[property="og:${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', `og:${property}`);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };
    
    updateOpenGraphTag('title', post.title);
    updateOpenGraphTag('description', post.metaDescription || post.description || '');
    if (post.heroImage) {
      updateOpenGraphTag('image', post.heroImage);
    }
    updateOpenGraphTag('url', window.location.href);
  }

  // Main Blog Components
  function createBlogComponents() {
    const React = window.React;
    const ReactDOM = window.ReactDOM;
    const ReactMarkdown = window.ReactMarkdown;

    // ClientFAQAccordion Component
    const ClientFAQAccordion = ({ faqs }) => {
      const [openFAQ, setOpenFAQ] = React.useState(null);

      if (!faqs || faqs.length === 0) return null;

      const toggleFAQ = (id) => {
        setOpenFAQ(openFAQ === id ? null : id);
      };

      return React.createElement(
        'div',
        { className: 'mt-8 mb-12' },
        React.createElement('h2', { className: 'text-2xl font-bold mb-6' }, 'Frequently Asked Questions'),
        React.createElement(
          'div',
          { className: 'space-y-4' },
          faqs.map((faq) => React.createElement(
            'div',
            { 
              key: faq.id, 
              className: `border border-gray-200 rounded-lg overflow-hidden blog-embed-faq ${openFAQ === faq.id ? 'active' : ''}` 
            },
            React.createElement(
              'button',
              {
                className: `w-full text-left p-4 font-medium flex justify-between items-center blog-embed-faq-question ${
                  openFAQ === faq.id ? "bg-blue-50" : "bg-white"
                }`,
                onClick: () => toggleFAQ(faq.id)
              },
              faq.question,
              React.createElement(
                'svg',
                {
                  className: `w-5 h-5 transition-transform ${
                    openFAQ === faq.id ? "transform rotate-180" : ""
                  }`,
                  xmlns: 'http://www.w3.org/2000/svg',
                  viewBox: '0 0 24 24',
                  fill: 'none',
                  stroke: 'currentColor',
                  strokeWidth: '2',
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round'
                },
                React.createElement('polyline', { points: '6 9 12 15 18 9' })
              )
            ),
            React.createElement(
              'div',
              {
                className: `blog-embed-faq-answer overflow-hidden transition-all duration-300 ${
                  openFAQ === faq.id
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`
              },
              React.createElement(
                'div',
                { className: 'p-4 border-t border-gray-200 prose max-w-none' },
                React.createElement(ReactMarkdown, null, faq.answer)
              )
            )
          ))
        )
      );
    };

    // ClientTableOfContents Component
    const ClientTableOfContents = ({ sections }) => {
      const [activeSection, setActiveSection] = React.useState(null);

      const handleClick = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      };

      React.useEffect(() => {
        // Track scroll position and update active section
        const handleScroll = () => {
          let currentSectionId = null;
          for (const section of sections) {
            const sectionElement = document.getElementById(section.id);
            if (sectionElement) {
              const rect = sectionElement.getBoundingClientRect();
              // If the section is in view (or just above it)
              if (rect.top <= 200) {
                currentSectionId = section.id;
              } else {
                break;
              }
            }
          }
          setActiveSection(currentSectionId);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Initial check

        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }, [sections]);

      if (sections.length === 0) return null;

      console.log("Rendering table of contents with sections:", sections.map(s => s.title));

      return React.createElement(
        'div',
        { className: 'blog-embed-toc bg-gray-50 p-4 rounded-lg mb-8' },
        React.createElement(
          'div',
          { className: 'blog-embed-toc-title flex items-center mb-2 text-gray-700 font-medium' },
          React.createElement(
            'svg',
            {
              className: 'h-5 w-5 mr-2',
              xmlns: 'http://www.w3.org/2000/svg',
              viewBox: '0 0 24 24',
              fill: 'none',
              stroke: 'currentColor',
              strokeWidth: '2',
              strokeLinecap: 'round',
              strokeLinejoin: 'round'
            },
            React.createElement('line', { x1: '10', y1: '6', x2: '21', y2: '6' }),
            React.createElement('line', { x1: '10', y1: '12', x2: '21', y2: '12' }),
            React.createElement('line', { x1: '10', y1: '18', x2: '21', y2: '18' }),
            React.createElement('line', { x1: '3', y1: '6', x2: '3.01', y2: '6' }),
            React.createElement('line', { x1: '3', y1: '12', x2: '3.01', y2: '12' }),
            React.createElement('line', { x1: '3', y1: '18', x2: '3.01', y2: '18' })
          ),
          'Table of Contents'
        ),
        React.createElement(
          'nav',
          null,
          React.createElement(
            'ul',
            { className: 'space-y-2 pl-4' },
            sections.map((section) => React.createElement(
              'li',
              { key: section.id },
              React.createElement(
                'button',
                {
                  onClick: () => handleClick(section.id),
                  className: `text-left block w-full truncate ${
                    activeSection === section.id 
                    ? "text-blue-600 font-medium" 
                    : "text-gray-600 hover:text-blue-600"
                  }`
                },
                section.title
              )
            ))
          )
        )
      );
    };

    // ClientBlogRenderer Component
    const ClientBlogRenderer = ({ post }) => {
      // Render content based on type
      const renderContent = (content) => {
        if (content.type === "text") {
          // Use ReactMarkdown to render Markdown content
          return React.createElement(
            'div',
            { className: 'prose max-w-none' },
            React.createElement(ReactMarkdown, null, content.text || "")
          );
        } else if (content.type === "image") {
          console.log("Rendering image:", content);
          return React.createElement(
            'figure',
            { className: 'blog-embed-content-image my-6' },
            React.createElement(
              'img',
              {
                src: content.src,
                alt: content.alt || "",
                className: 'mx-auto rounded-md max-w-full'
              }
            ),
            content.caption && React.createElement(
              'figcaption',
              { className: 'text-center text-sm text-gray-500 mt-2' },
              content.caption
            )
          );
        }
        return null;
      };

      const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      };

      return React.createElement(
        'article',
        { className: 'max-w-3xl mx-auto px-4 py-8' },
        // Header
        React.createElement(
          'header',
          { className: 'mb-8' },
          React.createElement('h1', { className: 'text-4xl font-bold mb-4' }, post.title),
          React.createElement(
            'p',
            { className: 'text-gray-500 mb-6' },
            `Published on ${formatDate(post.createdAt)}`,
            post.updatedAt !== post.createdAt && 
              ` • Updated on ${formatDate(post.updatedAt)}`
          ),
          post.heroImage && React.createElement(
            'img',
            {
              src: post.heroImage,
              alt: post.title,
              className: 'w-full h-auto object-cover rounded-lg mb-6'
            }
          ),
          post.description && React.createElement(
            'div',
            { className: 'text-lg text-gray-700 border-l-4 border-blue-500 pl-4 py-2 mb-6' },
            post.description
          )
        ),

        // Table of Contents
        post.sections && post.sections.length > 0 && React.createElement(ClientTableOfContents, { sections: post.sections }),

        // Main Content
        React.createElement(
          'div',
          { className: 'blog-content-wrapper' },
          // Sections
          post.sections && post.sections.map((section) => React.createElement(
            'section',
            { key: section.id, id: section.id, className: 'mb-10' },
            React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, section.title),
            React.createElement(
              'div',
              { className: 'blog-content' },
              section.content && section.content.map((content) => React.createElement(
                'div',
                { key: content.id },
                renderContent(content)
              ))
            )
          )),
          
          // Conclusion
          post.conclusion && React.createElement(
            'section',
            { className: 'mb-10' },
            React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, 'Conclusion'),
            React.createElement(
              'div',
              { className: 'blog-content prose max-w-none' },
              React.createElement(ReactMarkdown, null, post.conclusion)
            )
          ),
          
          // FAQs
          post.faqs && post.faqs.length > 0 && React.createElement(ClientFAQAccordion, { faqs: post.faqs })
        )
      );
    };

    // ClientBlogPost Component (Main container for a single blog post)
    const ClientBlogPost = ({ slug }) => {
      const [post, setPost] = React.useState(null);
      const [loading, setLoading] = React.useState(true);
      const [error, setError] = React.useState(null);

      React.useEffect(() => {
        const fetchPost = async () => {
          if (!slug) {
            setError("No blog post slug provided");
            setLoading(false);
            return;
          }

          try {
            console.log("Fetching blog post with slug:", slug);
            const blogPost = await fetchBlogPost(slug);
            
            if (blogPost) {
              setPost(blogPost);
              document.title = blogPost.title;
              
              // Update meta tags for SEO
              updateMetaTags(blogPost);
            } else {
              setError(`Blog post not found for slug: ${slug}`);
            }
          } catch (err) {
            console.error("Error fetching blog post:", err);
            setError("Failed to load blog post. Please try again later.");
          } finally {
            setLoading(false);
          }
        };

        fetchPost();
      }, [slug]);

      if (loading) {
        return React.createElement(
          'div',
          { className: 'min-h-screen bg-gray-50' },
          React.createElement(
            'div',
            { className: 'container mx-auto px-4 py-12' },
            React.createElement(
              'div',
              { className: 'flex justify-center items-center h-64' },
              React.createElement(
                'div',
                { className: 'animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500' }
              )
            )
          )
        );
      }

      if (error || !post) {
        return React.createElement(
          'div',
          { className: 'min-h-screen bg-gray-50' },
          React.createElement(
            'div',
            { className: 'container mx-auto px-4 py-12' },
            React.createElement(
              'div',
              { className: 'bg-white shadow-md rounded-lg p-8 text-center' },
              React.createElement('h2', { className: 'text-2xl font-semibold mb-4' }, 'Post Not Found'),
              React.createElement('p', { className: 'text-gray-600' }, error || "The blog post could not be loaded."),
              React.createElement(
                'a',
                { href: '/blog', className: 'inline-block mt-4 text-blue-600 hover:underline' },
                'Back to Blog'
              )
            )
          )
        );
      }

      return React.createElement(
        'div',
        { className: 'min-h-screen bg-gray-50' },
        React.createElement(
          'div',
          { className: 'container mx-auto px-4 py-12' },
          React.createElement(
            'div',
            { className: 'bg-white shadow-md rounded-lg overflow-hidden' },
            React.createElement(ClientBlogRenderer, { post: post })
          ),
          React.createElement(
            'div',
            { className: 'mt-8 text-center' },
            React.createElement(
              'a',
              { href: '/blog', className: 'inline-flex items-center text-blue-600 hover:text-blue-800' },
              React.createElement(
                'svg',
                {
                  className: 'w-4 h-4 mr-2',
                  xmlns: 'http://www.w3.org/2000/svg',
                  viewBox: '0 0 24 24',
                  fill: 'none',
                  stroke: 'currentColor',
                  strokeWidth: '2',
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round'
                },
                React.createElement('line', { x1: '19', y1: '12', x2: '5', y2: '12' }),
                React.createElement('polyline', { points: '12 19 5 12 12 5' })
              ),
              'Back to all articles'
            )
          )
        )
      );
    };

    return {
      ClientFAQAccordion,
      ClientTableOfContents,
      ClientBlogRenderer,
      ClientBlogPost
    };
  }

  // Initialize the blog components when the DOM is loaded
  function initializeBlog() {
    loadStyles();
    
    loadReactDependencies(async () => {
      try {
        const container = document.getElementById(config.containerId);
        if (!container) {
          console.error(`Container element with ID '${config.containerId}' not found.`);
          return;
        }

        const { ReactDOM } = window;
        const { ClientBlogPost } = createBlogComponents();
        
        // Get slug from URL
        const slug = getPathSlug();
        
        if (slug) {
          ReactDOM.render(
            React.createElement(ClientBlogPost, { slug: slug }),
            container
          );
        } else {
          container.innerHTML = '<p>No blog post slug found in URL.</p>';
        }
      } catch (err) {
        console.error('Error initializing blog:', err);
      }
    });
  }

  // Public API
  window.BlogEmbed = {
    configure: function(options) {
      config = {...config, ...options};
    },
    loadPost: function(slug) {
      loadReactDependencies(async () => {
        const container = document.getElementById(config.containerId);
        if (!container) {
          console.error(`Container element with ID '${config.containerId}' not found.`);
          return;
        }

        const { ReactDOM } = window;
        const { ClientBlogPost } = createBlogComponents();
        
        ReactDOM.render(
          React.createElement(ClientBlogPost, { slug: slug }),
          container
        );
      });
    },
    loadPosts: function() {
      // Implementation for loading blog listing page
      console.log('Blog listing page functionality not implemented yet');
    }
  };

  // Auto-initialize if we're on a blog post page
  if (window.location.pathname.includes('/blog/')) {
    document.addEventListener('DOMContentLoaded', initializeBlog);
  }
})();
