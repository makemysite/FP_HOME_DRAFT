
import BlogEmbed from './blogsmith-embed';

/**
 * Enhanced version of BlogEmbed with additional safety features
 */
class EnhancedBlogEmbed extends BlogEmbed {
  // Create a local active containers set for tracking
  private enhancedActiveContainers: Set<string> = new Set();
  
  /**
   * Override the base class render methods to use our enhanced container tracking
   */
  async renderBlogList(containerId: string, options: any = {}): Promise<void> {
    this.enhancedActiveContainers.add(containerId);
    try {
      await super.renderBlogList(containerId, options);
    } catch (error) {
      this.enhancedActiveContainers.delete(containerId);
      throw error;
    }
  }
  
  async renderBlogPost(containerId: string, slug: string): Promise<void> {
    this.enhancedActiveContainers.add(containerId);
    try {
      await super.renderBlogPost(containerId, slug);
    } catch (error) {
      this.enhancedActiveContainers.delete(containerId);
      throw error;
    }
  }
  
  /**
   * Override the container cleanup methods to ensure safe DOM operations
   */
  cleanupContainer(containerId: string): void {
    this.enhancedActiveContainers.delete(containerId);
    
    try {
      const container = document.getElementById(containerId);
      if (container) {
        // Safe approach to remove all child nodes
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
      }
      
      // Call super implementation
      super.cleanupContainer(containerId);
    } catch (error) {
      console.error(`Error cleaning up container ${containerId}:`, error);
    }
  }
  
  cleanupAllContainers(): void {
    // Make a copy to avoid iteration issues
    const containers = Array.from(this.enhancedActiveContainers);
    
    // Clear our tracking first
    this.enhancedActiveContainers.clear();
    
    // Clean each container
    containers.forEach(id => {
      try {
        const container = document.getElementById(id);
        if (container) {
          // Safe approach to remove all child nodes
          while (container.firstChild) {
            container.removeChild(container.firstChild);
          }
        }
      } catch (error) {
        console.error(`Error cleaning up container ${id}:`, error);
      }
    });
    
    // Call super implementation
    super.cleanupAllContainers();
  }
  
  /**
   * Check if a container is being tracked by our enhanced tracking
   */
  isEnhancedContainerActive(containerId: string): boolean {
    return this.enhancedActiveContainers.has(containerId);
  }
}

export default EnhancedBlogEmbed;
