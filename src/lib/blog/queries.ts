
import { supabase } from "@/integrations/supabase/client";
import { getSlugVariations } from "./helpers";

// Get a single blog post by slug with improved slug matching
export async function getBlogPostBySlug(slug: string): Promise<any | null> {
  try {
    // Add a check for empty slug
    if (!slug) {
      console.error('No slug provided to getBlogPostBySlug');
      return null;
    }

    console.log(`Fetching blog post with slug: "${slug}"`);

    // Use the existing getSlugVariations helper function to get possible slug variations
    const slugVariations = getSlugVariations(slug);
    
    // Try each slug variation
    for (const attemptedSlug of slugVariations) {
      console.log(`Attempting to fetch with slug: "${attemptedSlug}"`);

      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          sections:blog_sections(
            *,
            content:section_content(*)
          ),
          faqs:blog_faqs(*)
        `)
        .eq('slug', attemptedSlug)
        .eq('published', true)
        .maybeSingle();

      if (error) {
        console.error(`Error fetching blog post with slug "${attemptedSlug}":`, error);
        continue;
      }

      if (data) {
        console.log('Successfully found blog post:', data.title);
        return transformBlogPostData(data);
      }
    }

    // If no post is found after trying all variations
    console.log(`No blog post found with any of these slugs:`, slugVariations);
    
    // Optionally log available blog posts to help with debugging
    const { data: allPosts, error: allPostsError } = await supabase
      .from('blog_posts')
      .select('slug, title')
      .eq('published', true)
      .limit(10);
      
    if (!allPostsError && allPosts) {
      console.log('Available blog posts:', allPosts.map(p => p.slug));
    } else if (allPostsError) {
      console.error('Error fetching available blog posts:', allPostsError);
    }
    
    return null;
  } catch (error) {
    console.error('Failed to get blog post by slug:', error);
    return null;
  }
}

// Enhanced transformer function to properly format the blog post data
export function transformBlogPostData(data: any): any {
  if (!data) return null;
  
  // Basic transformation with improved handling of nested content
  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    description: data.description,
    heroImage: data.hero_image,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    category: data.category,
    sections: data.sections?.map((section: any) => ({
      id: section.id,
      title: section.title,
      position: section.position,
      content: section.content?.map((item: any) => {
        // Handle different content structures
        if (item.type === 'text') {
          return {
            id: item.id,
            type: 'text',
            text: item.content?.text || item.text || ''
          };
        } else if (item.type === 'image') {
          return {
            id: item.id,
            type: 'image',
            src: item.content?.src || item.content?.url || item.src || '',
            alt: item.content?.alt || item.alt || '',
            caption: item.content?.caption || item.caption || ''
          };
        }
        // Return the original item if type is unknown
        return item;
      }).sort((a: any, b: any) => (a.position || 0) - (b.position || 0)) || []
    })).sort((a: any, b: any) => (a.position || 0) - (b.position || 0)) || [],
    conclusion: data.conclusion || '',
    faqs: data.faqs?.map((faq: any) => ({
      id: faq.id,
      question: faq.question || '',
      answer: faq.answer || ''
    })).sort((a: any, b: any) => (a.position || 0) - (b.position || 0)) || []
  };
}

// Get all published blog posts
export async function getAllBlogPosts(): Promise<any[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
    
    return data.map((post: any) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      description: post.description,
      heroImage: post.hero_image,
      createdAt: post.created_at,
      category: post.category
    }));
  } catch (error) {
    console.error('Failed to get all blog posts:', error);
    return [];
  }
}
