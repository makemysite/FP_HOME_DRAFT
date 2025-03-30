
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { getBlogPostBySlug } from "@/lib/blog/queries";

// Fix the type annotation for useParams
type BlogPostParams = {
  slug: string;
};

const BlogPost: React.FC = () => {
  const { slug } = useParams<BlogPostParams>();
  const [blogPost, setBlogPost] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    if (!slug) {
      setError("Blog post not found");
      setLoading(false);
      return;
    }

    const loadBlogPost = async () => {
      try {
        console.log(`Attempting to load blog post with slug: ${slug}`);
        
        const post = await getBlogPostBySlug(slug);
        
        if (post) {
          console.log("Blog post loaded successfully:", post.title);
          setBlogPost(post);
        } else {
          console.error(`No blog post found with slug: ${slug}`);
          setError(`Blog post not found: ${slug}`);
          toast({
            title: "Not Found",
            description: `Could not find the blog post "${slug}"`,
            variant: "destructive"
          });
        }
      } catch (err) {
        console.error("Error loading blog post:", err);
        setError("Failed to load blog post");
        toast({
          title: "Error",
          description: "Failed to load blog post. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadBlogPost();
    
  }, [slug, toast]);

  const renderContent = () => {
    if (!blogPost) return null;
    
    return (
      <div className="prose max-w-none">
        <h1 className="text-3xl font-bold mb-4">{blogPost.title}</h1>
        {blogPost.description && (
          <p className="text-lg text-gray-600 mb-6">{blogPost.description}</p>
        )}
        
        {blogPost.heroImage && (
          <img 
            src={blogPost.heroImage} 
            alt={blogPost.title} 
            className="w-full h-auto max-h-96 object-cover rounded-lg mb-8"
          />
        )}
        
        {blogPost.sections?.map((section: any, index: number) => (
          <div key={section.id || index} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
            {section.content?.map((content: any, contentIndex: number) => (
              <div key={content.id || contentIndex} className="mb-4">
                {content.type === 'text' && (
                  <div dangerouslySetInnerHTML={{ __html: content.content.text }} />
                )}
                {content.type === 'image' && content.content.url && (
                  <img 
                    src={content.content.url} 
                    alt={content.content.caption || ''} 
                    className="w-full h-auto rounded-lg my-4"
                  />
                )}
              </div>
            ))}
          </div>
        ))}
        
        {blogPost.faqs && blogPost.faqs.length > 0 && (
          <div className="mt-12 bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {blogPost.faqs.map((faq: any, index: number) => (
                <div key={faq.id || index}>
                  <h3 className="text-xl font-medium mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <header className="w-full">
        <Navbar />
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-3xl">
        <Button asChild variant="outline" className="mb-6">
          <Link to="/blog" className="inline-flex items-center mb-8 text-[#E98A23] hover:underline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Link>
        </Button>
        
        <div className="blog-content-container">
          {loading ? (
            <div className="space-y-6">
              <Skeleton className="h-8 w-3/4 mb-2" />
              <div className="flex items-center mb-6">
                <Skeleton className="h-4 w-24 mr-4" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-64 w-full mb-6" />
              <div className="space-y-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-700 mb-4">{error}</h3>
              <p className="text-gray-500 mb-6">The requested blog post could not be found or loaded.</p>
              <Button 
                asChild
                className="bg-[#E98A23] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
              >
                <Link to="/blog">
                  Return to Blog
                </Link>
              </Button>
            </div>
          ) : (
            renderContent()
          )}
        </div>
      </main>
    </div>
  );
};

export default BlogPost;
