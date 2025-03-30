
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
    
    try {
      // Remove container from tracking if it was previously tracked
      if (this.isContainerActive(containerId)) {
        this.cleanupContainer(containerId);
      }
      
      // Add to tracking
      this.activeContainers.add(containerId);
      
      // Perform the render operation
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
    
    try {
      // Remove container from tracking if it was previously tracked
      if (this.isContainerActive(containerId)) {
        this.cleanupContainer(containerId);
      }
      
      // Add to tracking
      this.activeContainers.add(containerId);
      
      // Perform the render operation
      await this.blogEmbed.renderBlogPost(containerId, slug);
    } catch (error) {
      console.error("Error rendering blog post:", error);
      this.activeContainers.delete(containerId);
      throw error;
    }
  }
  
  /**
   * Safely cleans up a container's DOM content
   */
  cleanupContainer(containerId: string): void {
    try {
      // First remove from tracking
      this.activeContainers.delete(containerId);
      
      // Make sure we have a BlogEmbed instance
      if (!this.blogEmbed) return;
      
      // Then clean up the DOM content using the enhanced class
      const container = document.getElementById(containerId);
      if (container) {
        // First check if the element is actually in the DOM
        if (document.body.contains(container)) {
          // Using a safer approach than innerHTML = ''
          while (container.firstChild) {
            container.removeChild(container.firstChild);
          }
        }
      }
      
      // Also tell the BlogEmbed instance to clean up
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
   * Clean up all containers
   */
  cleanupAllContainers(): void {
    // Make a copy of the set to avoid iteration issues during deletion
    const containers = Array.from(this.activeContainers);
    
    // Clear our tracking set
    this.activeContainers.clear();
    
    // Clean each container
    containers.forEach(id => {
      try {
        const container = document.getElementById(id);
        if (container && document.body.contains(container)) {
          // Using a safer approach
          while (container.firstChild) {
            container.removeChild(container.firstChild);
          }
        }
      } catch (error) {
        console.error(`Error cleaning up container ${id}:`, error);
      }
    });
    
    // Also tell the BlogEmbed instance to clean up
    if (this.blogEmbed) {
      this.blogEmbed.cleanupAllContainers();
    }
  }
}

// Create a singleton instance
const blogService = new BlogService();
export default blogService;
