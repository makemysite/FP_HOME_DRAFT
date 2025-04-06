
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ArrowRightIcon from "../ui/ArrowRightIcon";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  hero_image: string;
  created_at: string;
}

const BlogHighlights: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('id, slug, title, hero_image, created_at')
          .eq('published', true)
          .order('created_at', { ascending: false })
          .limit(5);
        
        if (error) {
          console.error('Error fetching blog posts:', error);
          return;
        }
        
        setBlogPosts(data || []);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <section
      id="blogs"
      className="w-full max-w-[1335px] flex flex-col items-center mt-[153px] max-md:max-w-full max-md:mt-10"
    >
      <div className="text-[rgba(233,138,35,1)] text-lg font-bold leading-none tracking-[1.8px] text-center uppercase">
        Blogs
      </div>
      <h2 className="text-[#170F49] text-center text-[50px] font-bold leading-[62px] w-[668px] mt-[27px] max-md:max-w-full max-md:text-[40px] max-md:leading-[55px]">
        Spend Less Time Managing and More Time Growing
      </h2>
      <Link href="/blog">
        <button className="bg-[rgba(245,246,251,1)] border w-[175px] max-w-full text-lg text-[rgba(7,15,24,1)] font-normal text-center mt-[71px] px-[33px] py-[19px] rounded-[56px] border-[rgba(233,138,35,1)] border-solid max-md:mt-10 max-md:px-5 hover:bg-[rgba(245,246,251,0.8)] transition-colors">
          View all Blogs
        </button>
      </Link>

      <div className="self-stretch flex flex-col items-center text-base font-medium mt-[47px] max-md:max-w-full max-md:mt-10">
        <div className="flex gap-[40px_60px] max-md:max-w-full max-md:flex-wrap max-md:justify-center">
          {loading ? (
            // Loading skeletons
            Array(5).fill(0).map((_, index) => (
              <article key={`skeleton-${index}`} className="flex flex-col w-[254px]">
                <div className="max-w-full w-[254px]">
                  <Skeleton className="w-full h-[203px] rounded-[10px]" />
                  <Skeleton className="w-full h-[24px] mt-5" />
                  <Skeleton className="w-[100px] h-[24px] mt-5" />
                </div>
              </article>
            ))
          ) : blogPosts.length > 0 ? (
            blogPosts.map((post) => (
              <article key={post.id} className="flex flex-col w-[254px]">
                <div className="max-w-full w-[254px] text-[#2D3748] leading-[25px]">
                  <img
                    src={post.hero_image || "https://cdn.builder.io/api/v1/image/assets/a720917f9ee741a78621d5e6666ab10a/6df54d197fcb93eba7de2f3bec60bd7d62d5c6df?placeholderIfAbsent=true"}
                    alt={post.title}
                    className="aspect-[1.25] object-contain w-full rounded-[10px]"
                  />
                  <h3 className="w-full mt-5 rounded-[0px_0px_0px_0px] max-md:pr-5">
                    {post.title}
                  </h3>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex items-center gap-[15px] text-[#E98A23] leading-loose mt-5 hover:text-[rgba(233,138,35,0.8)] transition-colors"
                >
                  <span className="self-stretch my-auto">Read More</span>
                  <ArrowRightIcon />
                </Link>
              </article>
            ))
          ) : (
            <div className="text-center w-full py-8 text-gray-500">
              No blog posts found. Create some blog posts to see them here.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogHighlights;
