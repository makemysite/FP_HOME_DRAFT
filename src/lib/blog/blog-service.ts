
import BlogEmbed from "./blogsmith-embed";

class BlogService {
  private blogEmbed: BlogEmbed | null = null;
  private activeContainers: Set<string> = new Set();
  
  constructor() {
    this.blogEmbed = new BlogEmbed();
  }
  
  /**
   * Renders a blog list in the specified container
   */
  async renderBlogList(containerId: string): Promise<void> {
    if (!this.blogEmbed) return;
    
    try {
      this.activeContainers.add(containerId);
      await this.blogEmbed.renderBlogList(containerId, {
        limit: 8,
        showDescription: true,
        showImage: true
      });
    } catch (error) {
      console.error("Error rendering blog list:", error);
      throw error;
    }
  }
  
  /**
   * Renders a single blog post in the specified container
   */
  async renderBlogPost(containerId: string, slug: string): Promise<void> {
    if (!this.blogEmbed) return;
    
    try {
      this.activeContainers.add(containerId);
      await this.blogEmbed.renderBlogPost(containerId, slug);
    } catch (error) {
      console.error("Error rendering blog post:", error);
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
      
      // Then clean up the actual DOM content
      const container = document.getElementById(containerId);
      if (container) {
        // Using a safer approach than innerHTML = ''
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
      }
      
      // Also tell the BlogEmbed instance to clean up if it exists
      if (this.blogEmbed) {
        this.blogEmbed.cleanupContainer(containerId);
      }
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
    containers.forEach(id => this.cleanupContainer(id));
    
    // Also tell the BlogEmbed instance to clean up
    if (this.blogEmbed) {
      this.blogEmbed.cleanupAllContainers();
    }
  }
}

// Create a singleton instance
const blogService = new BlogService();
export default blogService;
