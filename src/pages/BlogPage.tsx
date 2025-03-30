
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  description: string;
  image: string;
  date: string;
  author: string;
}

const BlogPage: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
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
  ]);

  // This function would typically fetch actual blog data from an API
  useEffect(() => {
    // In a real implementation, you would fetch blog posts here
    console.log("Blog page mounted - would fetch blog posts in a real implementation");
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#170F49] mb-6">Our Blog</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Stay up to date with the latest trends, tips, and insights in field service management
              and cloud-based solutions.
            </p>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-[#170F49] mb-8">Latest Articles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article key={post.id} className="flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex-shrink-0">
                    <img 
                      className="h-48 w-full object-cover" 
                      src={post.image} 
                      alt={post.title} 
                    />
                  </div>
                  <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#E98A23]">
                        {post.date}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold text-gray-900 hover:text-[#E98A23] transition-colors">
                        {post.title}
                      </h3>
                      <p className="mt-3 text-base text-gray-600">
                        {post.description}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center">
                      <div className="flex-shrink-0">
                        <span className="sr-only">{post.author}</span>
                      </div>
                      <div className="ml-0">
                        <p className="text-sm font-medium text-gray-900">
                          {post.author}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button className="text-[#E98A23] text-sm flex items-center gap-2 hover:text-[rgba(233,138,35,0.8)] transition-colors">
                        Read More
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.172 7L6.808 1.636L8.222 0.222L16 8L8.222 15.778L6.808 14.364L12.172 9H0V7H12.172Z" fill="currentColor"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-16 mb-12">
            <h2 className="text-2xl font-bold text-[#170F49] mb-8">Integration Guide</h2>
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-xl font-bold mb-4">How to Integrate BlogSmith on Client Websites</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-2">Step 1: Build the Client Library</h4>
                  <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                    <code>node src/lib/blog/build-client-lib.js</code>
                  </pre>
                  <p className="mt-2 text-gray-600">This creates the following files in the build/client-lib directory:</p>
                  <ul className="list-disc pl-5 mt-2 text-gray-600">
                    <li>blogsmith-embed.js - Unminified version for debugging</li>
                    <li>blogsmith-embed.min.js - Minified version for production</li>
                    <li>robots.txt - SEO configuration</li>
                    <li>README.md - Usage documentation</li>
                    <li>INSTALLATION.md - Detailed integration guide</li>
                    <li>demo.html - Example implementation</li>
                    <li>generate-sitemap.js - Tool for generating a sitemap</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-2">Step 2: Upload the Client Library</h4>
                  <ul className="list-disc pl-5 mt-2 text-gray-600">
                    <li>Upload the blogsmith-embed.min.js file to your client's web server or CDN.</li>
                    <li>Make note of the URL where the file is accessible.</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-2">Step 3: Basic Integration (HTML)</h4>
                  <p className="mb-2 text-gray-600">Add this code to any HTML page where you want to display blog content:</p>
                  <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                    <code>{`<!-- For blog listing -->
<div id="blog-list-container"></div>

<!-- Include the BlogSmith library -->
<script type="module">
  import BlogEmbed from 'https://path-to-your-file/blogsmith-embed.min.js';
  
  // Create a new BlogEmbed instance
  const blogEmbed = new BlogEmbed();
  
  // Render a list of recent posts
  blogEmbed.renderBlogList('blog-list-container', {
    limit: 5,
    showDescription: true,
    showImage: true
  });
</script>`}</code>
                  </pre>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-2">Step 4: Display a Single Blog Post</h4>
                  <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                    <code>{`<div id="blog-post-container"></div>

<script type="module">
  import BlogEmbed from 'https://path-to-your-file/blogsmith-embed.min.js';
  
  const blogEmbed = new BlogEmbed();
  
  // Get the slug from the URL (example)
  const slug = window.location.pathname.split('/').pop();
  
  // Render the blog post
  blogEmbed.renderBlogPost('blog-post-container', slug);
</script>`}</code>
                  </pre>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-2">Step 5: Add Routing (Optional)</h4>
                  <p className="mb-2 text-gray-600">For a more integrated experience, add simple routing:</p>
                  <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                    <code>{`import BlogEmbed from 'https://path-to-your-file/blogsmith-embed.min.js';

document.addEventListener('DOMContentLoaded', () => {
  const blogEmbed = new BlogEmbed();
  const path = window.location.pathname;
  
  // Blog list page
  if (path === '/blog' || path === '/blog/') {
    blogEmbed.renderBlogList('blog-container');
  }
  // Single blog post page
  else if (path.startsWith('/blog/')) {
    const slug = path.replace('/blog/', '');
    blogEmbed.renderBlogPost('blog-container', slug);
  }
});`}</code>
                  </pre>
                </div>
              </div>
              
              <div className="mt-8 space-y-4">
                <h4 className="text-lg font-semibold">Real-time Updates</h4>
                <p className="text-gray-600">The library automatically subscribes to real-time updates. When you publish or update content in BlogSmith, changes will appear instantly on client websites without requiring a page refresh.</p>
                
                <h4 className="text-lg font-semibold">SEO Benefits</h4>
                <p className="text-gray-600">The embed library automatically adds:</p>
                <ul className="list-disc pl-5 mt-2 text-gray-600">
                  <li>Schema.org structured data</li>
                  <li>Meta tags for SEO</li>
                  <li>Open Graph tags for social sharing</li>
                  <li>Canonical URLs</li>
                </ul>
                
                <h4 className="text-lg font-semibold">Styling</h4>
                <p className="text-gray-600">The library adds minimal styling. Customize the appearance by adding CSS to target these classes:</p>
                <ul className="list-disc pl-5 mt-2 text-gray-600">
                  <li>.blog-embed-list - Blog list container</li>
                  <li>.blog-embed-list-item - Individual blog item</li>
                  <li>.blog-embed-post - Blog post container</li>
                  <li>.blog-embed-post-title - Blog post title</li>
                  <li>.blog-embed-post-content - Blog post content</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
