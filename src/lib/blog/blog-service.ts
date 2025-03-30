
import EnhancedBlogEmbed from "./blogsmith-embed-enhanced";
import { BlogEmbedOptions } from "./blogsmith-embed";

class BlogService {
  private blogEmbed: EnhancedBlogEmbed | null = null;
  private activeContainers: Set<string> = new Set();
  private isInitialized: boolean = false;
  
  constructor() {
    try {
      this.initializeBlogEmbed();
    } catch (error) {
      console.error("Error initializing BlogService:", error);
    }
  }
  
  /**
   * Safely initializes the blog embed instance with additional error handling
   */
  private initializeBlogEmbed(): void {
    try {
      if (!this.isInitialized) {
        this.blogEmbed = new EnhancedBlogEmbed();
        this.isInitialized = true;
        console.log("BlogService: Successfully initialized EnhancedBlogEmbed");
      }
    } catch (error) {
      console.error("Error creating EnhancedBlogEmbed instance:", error);
      this.isInitialized = false;
      this.blogEmbed = null;
      // We won't rethrow the error here to prevent app crashes
    }
  }
  
  /**
   * Ensures the blog embed instance exists, initializing it if needed
   */
  private ensureBlogEmbed(): boolean {
    if (!this.blogEmbed) {
      try {
        this.initializeBlogEmbed();
      } catch (error) {
        console.error("Failed to initialize BlogEmbed:", error);
        return false;
      }
    }
    return !!this.blogEmbed;
  }
  
  /**
   * Renders a blog list in the specified container with enhanced error handling
   */
  async renderBlogList(containerId: string, options: BlogEmbedOptions = {}): Promise<void> {
    if (!this.ensureBlogEmbed() || !this.blogEmbed) {
      console.error("BlogEmbed not available, cannot render blog list");
      this.displayFallbackContent(containerId, "Unable to load blog content. Please try again later.");
      return;
    }
    
    // First validate the container exists in DOM with double checking
    const container = document.getElementById(containerId);
    if (!container || !document.body.contains(container)) {
      console.warn(`Container #${containerId} does not exist or is not in DOM, skipping render`);
      return;
    }
    
    try {
      // Remove container from tracking if it was previously tracked
      if (this.isContainerActive(containerId)) {
        this.cleanupContainer(containerId);
      }
      
      // Add to tracking
      this.activeContainers.add(containerId);
      
      // Set default options
      const defaultOptions = {
        limit: 8,
        showDescription: true,
        showImage: true,
        retryOnFailure: true,
        retryAttempts: 3,
        retryDelay: 1000,
        fallbackContent: "No blog posts available at the moment. Please try again later."
      };
      
      // Merge with user options
      const mergedOptions = { ...defaultOptions, ...options };
      
      // Perform the render operation with enhanced safety
      await this.blogEmbed.renderBlogList(containerId, mergedOptions);
    } catch (error) {
      console.error("Error rendering blog list:", error);
      this.activeContainers.delete(containerId);
      
      // Display fallback content on error
      this.displayFallbackContent(containerId, "Error loading blog content. Please try again later.");
    }
  }
  
  /**
   * Renders a single blog post in the specified container with enhanced error handling
   */
  async renderBlogPost(containerId: string, slug: string, options: BlogEmbedOptions = {}): Promise<void> {
    if (!this.ensureBlogEmbed() || !this.blogEmbed) {
      console.error("BlogEmbed not available, cannot render blog post");
      this.displayFallbackContent(containerId, "Unable to load blog content. Please try again later.");
      return;
    }
    
    // First validate the container exists in DOM with double checking
    const container = document.getElementById(containerId);
    if (!container || !document.body.contains(container)) {
      console.warn(`Container #${containerId} does not exist or is not in DOM, skipping render`);
      return;
    }
    
    try {
      // Remove container from tracking if it was previously tracked
      if (this.isContainerActive(containerId)) {
        this.cleanupContainer(containerId);
      }
      
      // Add to tracking
      this.activeContainers.add(containerId);
      
      // Set default options
      const defaultOptions = {
        retryOnFailure: true,
        retryAttempts: 3,
        retryDelay: 1000,
        fallbackContent: `We couldn't find the blog post "${slug}".`
      };
      
      // Merge with user options
      const mergedOptions = { ...defaultOptions, ...options };
      
      // Perform the render operation with enhanced safety
      await this.blogEmbed.renderBlogPost(containerId, slug, mergedOptions);
    } catch (error) {
      console.error("Error rendering blog post:", error);
      this.activeContainers.delete(containerId);
      
      // Check if error is a "not found" error
      const errorMessage = error instanceof Error ? error.message : String(error);
      const isNotFound = errorMessage.includes("not found");
      
      if (isNotFound) {
        this.displayFallbackContent(containerId, `Blog post "${slug}" not found`);
        throw error; // Re-throw for 404 handling
      } else {
        this.displayFallbackContent(containerId, "Error loading blog post. Please try again later.");
      }
    }
  }
  
  /**
   * Displays fallback content in a container when errors occur
   */
  private displayFallbackContent(containerId: string, message: string): void {
    try {
      const container = document.getElementById(containerId);
      if (container && document.body.contains(container)) {
        container.innerHTML = `
          <div class="blog-embed-error">
            <p>${message}</p>
          </div>
        `;
      }
    } catch (error) {
      console.error(`Error displaying fallback content in container ${containerId}:`, error);
    }
  }
  
  /**
   * Safely cleans up a container's DOM content with additional checks
   */
  cleanupContainer(containerId: string): void {
    try {
      // First remove from tracking
      this.activeContainers.delete(containerId);
      
      // Make sure we have a BlogEmbed instance
      if (!this.blogEmbed) {
        console.warn("No BlogEmbed instance available for cleanup");
        return;
      }
      
      // Check if container exists and is in the DOM before cleanup
      const container = document.getElementById(containerId);
      if (!container) {
        console.warn(`Container #${containerId} does not exist, skipping cleanup`);
        return;
      }
      
      if (!document.body.contains(container)) {
        console.warn(`Container #${containerId} is not in DOM, skipping cleanup`);
        return;
      }
      
      // Then clean up the DOM content using the enhanced class
      this.blogEmbed.cleanupContainer(containerId);
    } catch (error) {
      console.error(`Error cleaning up container ${containerId}:`, error);
    }
  }
  
  /**
   * Check if a container is being tracked
   */
  isContainerActive(containerId: string): boolean {
    return this.activeContainers.has(containerId);
  }
  
  /**
   * Clean up all containers with safer approach
   */
  cleanupAllContainers(): void {
    try {
      // Make a copy of the set to avoid iteration issues during deletion
      const containers = Array.from(this.activeContainers);
      
      // Clear our tracking set first
      this.activeContainers.clear();
      
      // Also tell the BlogEmbed instance to clean up if it exists
      if (this.blogEmbed) {
        // Instead of cleaning all at once, clean each individually with checks
        containers.forEach(id => {
          try {
            const container = document.getElementById(id);
            if (container && document.body.contains(container)) {
              this.blogEmbed?.cleanupContainer(id);
            } else {
              console.warn(`Container #${id} does not exist or is not in DOM during cleanup`);
            }
          } catch (containerError) {
            console.error(`Error cleaning up container ${id}:`, containerError);
          }
        });
      }
    } catch (error) {
      console.error(`Error in cleanupAllContainers:`, error);
    }
  }
  
  /**
   * Reinitialize the service if needed
   */
  reinitialize(): void {
    try {
      // Clean up existing resources
      this.cleanupAllContainers();
      
      if (this.blogEmbed) {
        try {
          this.blogEmbed.destroy();
        } catch (error) {
          console.error("Error destroying existing BlogEmbed instance:", error);
        }
      }
      
      // Reset state
      this.blogEmbed = null;
      this.isInitialized = false;
      this.activeContainers.clear();
      
      // Create a new instance
      this.initializeBlogEmbed();
    } catch (error) {
      console.error("Error reinitializing BlogService:", error);
    }
  }
}

// Create a singleton instance
const blogService = new BlogService();
export default blogService;
