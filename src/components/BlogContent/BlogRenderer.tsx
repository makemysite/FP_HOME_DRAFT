
import { formatDate } from "@/lib/blog/helpers";
import TableOfContents from "./TableOfContents";
import FAQAccordion from "./FAQAccordion";
import ReactMarkdown from "react-markdown";

// Define types if not already defined elsewhere
interface BlogContent {
  id: string;
  type: string;
  text?: string;
  src?: string;
  alt?: string;
  caption?: string;
  content?: any; // Added to handle nested content objects
  level?: number; // For heading levels
}

interface BlogSection {
  id: string;
  title: string;
  content: BlogContent[];
}

interface BlogFAQ {
  id: string;
  question: string;
  answer: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description?: string;
  heroImage?: string;
  createdAt: string;
  updatedAt: string;
  sections: BlogSection[];
  conclusion?: string;
  faqs: BlogFAQ[];
}

interface BlogRendererProps {
  post: BlogPost;
}

const BlogRenderer = ({ post }: BlogRendererProps) => {
  // Render content based on type
  const renderContent = (content: BlogContent) => {
    if (!content) return null;
    
    if (content.type === "text") {
      // Use ReactMarkdown to render Markdown content
      return (
        <div className="prose max-w-none dark:prose-invert blog-post-content">
          <ReactMarkdown>{content.text || ""}</ReactMarkdown>
        </div>
      );
    } else if (content.type === "heading") {
      // Handle headings of different levels
      const level = content.level || 3; // Default to h3 if level not specified
      const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
      
      return (
        <HeadingTag className={`text-${level === 3 ? 'xl' : level === 4 ? 'lg' : 'md'} font-bold my-4`}>
          {content.text || ""}
        </HeadingTag>
      );
    } else if (content.type === "image") {
      // Check both content.src and content.content?.src/url for image source
      const imageSrc = content.src || content.content?.src || content.content?.url || "";
      const imageAlt = content.alt || content.content?.alt || "";
      const imageCaption = content.caption || content.content?.caption || "";
      
      return (
        <figure className="blog-embed-content-image my-6">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="mx-auto rounded-md max-w-full"
          />
          {imageCaption && (
            <figcaption className="text-center text-sm text-gray-500 mt-2">
              {imageCaption}
            </figcaption>
          )}
        </figure>
      );
    } else if (content.type === "list") {
      // Handle list content
      const listItems = content.content?.items || [];
      const isOrdered = content.content?.ordered === true;
      
      if (isOrdered) {
        return (
          <ol className="blog-post-content list-decimal pl-5 my-4">
            {listItems.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        );
      } else {
        return (
          <ul className="blog-post-content list-disc pl-5 my-4">
            {listItems.map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        );
      }
    }
    return null;
  };

  // Render sections with their content
  const renderSections = (sections: BlogSection[]) => {
    return sections.map((section) => {
      // Ensure content array exists and has items
      const sectionContent = section.content || [];
      
      return (
        <section key={section.id} id={section.id} className="mb-10">
          <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
          <div className="blog-content">
            {sectionContent.map((content) => (
              <div key={content.id}>{renderContent(content)}</div>
            ))}
          </div>
        </section>
      );
    });
  };

  // Render standalone content (content that's not part of a section)
  const renderStandaloneContent = (content: BlogContent[]) => {
    if (!content || content.length === 0) return null;
    
    return (
      <div className="blog-standalone-content mb-10">
        {content.map((item) => (
          <div key={item.id} className="mb-4">
            {renderContent(item)}
          </div>
        ))}
      </div>
    );
  };

  // Render conclusion
  const renderConclusion = () => {
    if (!post.conclusion) return null;
    
    return (
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
        <div className="blog-content prose max-w-none dark:prose-invert blog-post-content">
          <ReactMarkdown>{post.conclusion}</ReactMarkdown>
        </div>
      </section>
    );
  };

  // Check if post has standalone content
  const hasStandaloneContent = post.sections && post.sections.some(section => 
    !section.title && section.content && section.content.length > 0
  );

  // Filter sections into those with titles and those without
  const titledSections = post.sections ? post.sections.filter(section => section.title) : [];
  const untitledSections = post.sections ? post.sections.filter(section => !section.title) : [];
  
  // Combine all content from untitled sections
  const standaloneContent = untitledSections.reduce((acc: BlogContent[], section) => {
    if (section.content && section.content.length > 0) {
      acc.push(...section.content);
    }
    return acc;
  }, []);

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-500 mb-6">
          Published on {formatDate(post.createdAt)}
          {post.updatedAt !== post.createdAt && 
            ` • Updated on ${formatDate(post.updatedAt)}`}
        </p>
        
        {post.heroImage && (
          <img
            src={post.heroImage}
            alt={post.title}
            className="w-full h-auto object-cover rounded-lg mb-6"
          />
        )}
        
        {post.description && (
          <div className="text-lg text-gray-700 border-l-4 border-primary pl-4 py-2">
            {post.description}
          </div>
        )}
      </header>

      {/* Table of Contents - only show for titled sections */}
      {titledSections.length > 0 && (
        <TableOfContents sections={titledSections} />
      )}

      {/* Standalone Content (without section titles) */}
      {standaloneContent.length > 0 && renderStandaloneContent(standaloneContent)}

      {/* Main Content - Sections with titles */}
      <div className="blog-content-wrapper">
        {renderSections(titledSections)}
        {renderConclusion()}
        {post.faqs && post.faqs.length > 0 && <FAQAccordion faqs={post.faqs} />}
      </div>
    </article>
  );
};

export default BlogRenderer;
