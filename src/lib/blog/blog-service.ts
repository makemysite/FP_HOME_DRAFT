import EnhancedBlogEmbed from "./blogsmith-embed-enhanced";
import { BlogEmbedOptions } from "./blogsmith-embed";

class BlogService {
  private blogEmbed: EnhancedBlogEmbed | null = null;
  private activeContainers: Set<string> = new Set();
  private isInitialized: boolean = false;
  private unmounting: boolean = false;
  private initializationAttempts: number = 0;
  private readonly MAX_INIT_ATTEMPTS = 3;
  
  constructor() {
    try {
      console.log("Initializing BlogService");
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
      if (!this.isInitialized && !this.unmounting && this.initializationAttempts < this.MAX_INIT_ATTEMPTS) {
        this.initializationAttempts++;
        console.log(`Creating new EnhancedBlogEmbed instance (attempt ${this.initializationAttempts})`);
        
        // Reset state before initialization
        if (this.blogEmbed) {
          try {
            this.blogEmbed.destroy();
          } catch (error) {
            console.error("Error destroying previous BlogEmbed instance:", error);
          }
          this.blogEmbed = null;
        }
        
        this.blogEmbed = new EnhancedBlogEmbed();
        this.isInitialized = true;
        console.log("BlogService: Successfully initialized EnhancedBlogEmbed");
      }
    } catch (error) {
      console.error("Error creating EnhancedBlogEmbed instance:", error);
      this.isInitialized = false;
      this.blogEmbed = null;
      
      // Try to reinitialize after a delay if we haven't exceeded max attempts
      if (this.initializationAttempts < this.MAX_INIT_ATTEMPTS) {
        console.log(`Will retry initialization in 1 second (attempt ${this.initializationAttempts + 1} of ${this.MAX_INIT_ATTEMPTS})`);
        setTimeout(() => this.initializeBlogEmbed(), 1000);
      }
    }
  }
  
  /**
   * Ensures the blog embed instance exists, initializing it if needed
   */
  private ensureBlogEmbed(): boolean {
    if (this.unmounting) {
      console.warn("BlogService: Cannot ensure blog embed during unmounting");
      return false;
    }
    
    if (!this.blogEmbed) {
      console.log("BlogEmbed instance not found, initializing");
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
    console.log(`BlogService: Rendering blog list in container ${containerId}`);
    
    if (this.unmounting) {
      console.warn("BlogService: Cannot render during unmounting process");
      return;
    }
    
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
        console.log(`Container ${containerId} already active, cleaning up first`);
        this.cleanupContainer(containerId);
      }
      
      // Add to tracking
      this.activeContainers.add(containerId);
      console.log(`Added container ${containerId} to active tracking`);
      
      // Set default options
      const defaultOptions = {
        limit: 12,
        showDescription: true,
        showImage: true,
        retryOnFailure: true,
        retryAttempts: 3,
        retryDelay: 1000,
        fallbackContent: "No blog posts available at the moment. Please try again later."
      };
      
      // Merge with user options
      const mergedOptions = { ...defaultOptions, ...options };
      
      // Clear any existing content first
      try {
        if (container.querySelector('.blog-embed-loading')) {
          // Keep a minimal loading message while we load the real content
          container.innerHTML = `
            <div class="blog-embed-loading text-center p-8">
              <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mb-3"></div>
              <p>Loading blog content...</p>
            </div>
          `;
        }
      } catch (innerError) {
        console.error("Error updating loading content:", innerError);
      }
      
      // Perform the render operation with enhanced safety
      console.log("Calling EnhancedBlogEmbed.renderBlogList with options:", mergedOptions);
      try {
        await this.blogEmbed.renderBlogList(containerId, mergedOptions);
        console.log(`Blog list rendering completed for container ${containerId}`);
      } catch (renderError) {
        console.error("Error in EnhancedBlogEmbed.renderBlogList:", renderError);
        // We'll handle this in the outer catch block
        throw renderError;
      }
    } catch (error) {
      console.error("Error rendering blog list:", error);
      this.activeContainers.delete(containerId);
      
      // Display fallback content on error
      this.displayFallbackContent(containerId, "Error loading blog content. Please try again later.");
      
      // Rethrow to allow parent error handling
      throw error;
    }
  }
  
  /**
   * Renders a single blog post in the specified container with enhanced error handling
   */
  async renderBlogPost(containerId: string, slug: string, options: BlogEmbedOptions = {}): Promise<void> {
    console.log(`BlogService: Rendering blog post with slug "${slug}" in container ${containerId}`);
    
    if (this.unmounting) {
      console.warn("BlogService: Cannot render during unmounting process");
      return;
    }
    
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
        console.log(`Container ${containerId} already active, cleaning up first`);
        this.cleanupContainer(containerId);
      }
      
      // Add to tracking
      this.activeContainers.add(containerId);
      console.log(`Added container ${containerId} to active tracking`);
      
      // Set default options
      const defaultOptions = {
        retryOnFailure: true,
        retryAttempts: 3,
        retryDelay: 1000,
        fallbackContent: `We couldn't find the blog post "${slug}".`
      };
      
      // Merge with user options
      const mergedOptions = { ...defaultOptions, ...options };
      
      // Clear any existing content first
      try {
        if (container.querySelector('.blog-embed-loading')) {
          // Keep a minimal loading message while we load the real content
          container.innerHTML = `
            <div class="blog-embed-loading text-center p-8">
              <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mb-3"></div>
              <p>Loading blog post...</p>
            </div>
          `;
        }
      } catch (innerError) {
        console.error("Error updating loading content:", innerError);
      }
      
      // Perform the render operation with enhanced safety
      console.log("Calling EnhancedBlogEmbed.renderBlogPost with options:", mergedOptions);
      try {
        await this.blogEmbed.renderBlogPost(containerId, slug, mergedOptions);
        console.log(`Blog post rendering completed for slug "${slug}" in container ${containerId}`);
      } catch (renderError) {
        console.error("Error in EnhancedBlogEmbed.renderBlogPost:", renderError);
        // We'll handle this in the outer catch block
        throw renderError;
      }
    } catch (error) {
      console.error("Error rendering blog post:", error);
      this.activeContainers.delete(containerId);
      
      // Check if error is a "not found" error
      const errorMessage = error instanceof Error ? error.message : String(error);
      const isNotFound = errorMessage.includes("not found");
      
      if (isNotFound) {
        console.log(`Blog post "${slug}" not found`);
        this.displayFallbackContent(containerId, `Blog post "${slug}" not found`);
        throw error; // Re-throw for 404 handling
      } else {
        this.displayFallbackContent(containerId, "Error loading blog post. Please try again later.");
        throw error; // Re-throw for general error handling
      }
    }
  }
  
  /**
   * Displays fallback content in a container when errors occur
   */
  private displayFallbackContent(containerId: string, message: string): void {
    try {
      console.log(`Displaying fallback content in container ${containerId}: "${message}"`);
      if (this.unmounting) return;
      
      const container = document.getElementById(containerId);
      if (container && document.body.contains(container)) {
        container.innerHTML = `
          <div class="blog-embed-error p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-lg font-medium">${message}</p>
            <button onclick="window.location.reload()" class="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 transition-colors">
              Refresh page
            </button>
          </div>
        `;
      }
    } catch (error) {
      console.error(`Error displaying fallback content in container ${containerId}:`, error);
    }
  }
  
  /**
   * Safely cleans up a container's DOM content with additional checks
   * Uses safer innerHTML emptying to prevent DOM node removal issues
   */
  cleanupContainer(containerId: string): void {
    try {
      console.log(`Cleaning up container ${containerId}`);
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
      
      // First empty container with innerHTML for safety
      try {
        console.log(`Setting innerHTML to empty for container ${containerId}`);
        container.innerHTML = '';
      } catch (innerError) {
        console.error(`Error clearing container ${containerId} with innerHTML:`, innerError);
      }
      
      // Then call enhanced cleanup on a short timeout to prevent race conditions
      setTimeout(() => {
        if (!this.unmounting && this.blogEmbed) {
          try {
            console.log(`Calling enhanced cleanup for container ${containerId}`);
            this.blogEmbed.cleanupContainer(containerId);
          } catch (cleanupError) {
            console.error(`Delayed cleanup error for container ${containerId}:`, cleanupError);
          }
        }
      }, 50);
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
   * Check if we're in the unmounting process
   */
  isUnmounting(): boolean {
    return this.unmounting;
  }
  
  /**
   * Clean up all containers with safer approach
   */
  cleanupAllContainers(): void {
    try {
      console.log("Cleaning up all containers");
      // Set unmounting flag to prevent further operations
      this.unmounting = true;
      
      // Make a copy of the set to avoid iteration issues during deletion
      const containers = Array.from(this.activeContainers);
      
      // Clear our tracking set first
      this.activeContainers.clear();
      
      // First clear all container inner HTML
      containers.forEach(id => {
        try {
          const container = document.getElementById(id);
          if (container && document.body.contains(container)) {
            console.log(`Setting innerHTML to empty for container ${id}`);
            container.innerHTML = '';
          }
        } catch (innerError) {
          console.error(`Error clearing container ${id}:`, innerError);
        }
      });
      
      // Also tell the BlogEmbed instance to clean up if it exists
      if (this.blogEmbed) {
        setTimeout(() => {
          try {
            console.log("Calling enhanced cleanupAllContainers");
            this.blogEmbed?.cleanupAllContainers();
          } catch (cleanupError) {
            console.error("Error in delayed cleanupAllContainers:", cleanupError);
          }
        }, 50);
      }
    } catch (error) {
      console.error(`Error in cleanupAllContainers:`, error);
    }
  }
  
  /**
   * Set a flag to indicate that an unmount is in progress
   * This should be called before unmounting to prevent race conditions
   */
  prepareForUnmount(): void {
    console.log("Preparing for unmount");
    this.unmounting = true;
  }
  
  /**
   * Reinitialize the service if needed
   */
  reinitialize(): void {
    try {
      console.log("Reinitializing BlogService");
      // Reset unmounting flag
      this.unmounting = false;
      
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
      this.initializationAttempts = 0;
      
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
