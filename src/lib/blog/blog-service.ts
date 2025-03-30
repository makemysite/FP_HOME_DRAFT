
import EnhancedBlogEmbed from "./blogsmith-embed-enhanced";

class BlogService {
  private blogEmbed: EnhancedBlogEmbed | null = null;
  private activeContainers: Set<string> = new Set();
  
  constructor() {
    this.blogEmbed = new EnhancedBlogEmbed();
  }
  
  /**
   * Renders a blog list in the specified container
   */
  async renderBlogList(containerId: string): Promise<void> {
    if (!this.blogEmbed) return;
    
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
      
      // Perform the render operation with enhanced safety
      await this.blogEmbed.renderBlogList(containerId, {
        limit: 8,
        showDescription: true,
        showImage: true
      });
    } catch (error) {
      console.error("Error rendering blog list:", error);
      this.activeContainers.delete(containerId);
      throw error;
    }
  }
  
  /**
   * Renders a single blog post in the specified container
   */
  async renderBlogPost(containerId: string, slug: string): Promise<void> {
    if (!this.blogEmbed) return;
    
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
      
      // Perform the render operation with enhanced safety
      await this.blogEmbed.renderBlogPost(containerId, slug);
    } catch (error) {
      console.error("Error rendering blog post:", error);
      this.activeContainers.delete(containerId);
      throw error;
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
      if (!this.blogEmbed) return;
      
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
}

// Create a singleton instance
const blogService = new BlogService();
export default blogService;
