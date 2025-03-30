
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
    // First check if container exists to avoid race conditions
    const containerExists = document.getElementById(containerId);
    if (!containerExists) {
      console.warn(`Container #${containerId} does not exist, skipping render`);
      return;
    }
    
    this.enhancedActiveContainers.add(containerId);
    try {
      await super.renderBlogList(containerId, options);
    } catch (error) {
      this.enhancedActiveContainers.delete(containerId);
      throw error;
    }
  }
  
  async renderBlogPost(containerId: string, slug: string): Promise<void> {
    // First check if container exists to avoid race conditions
    const containerExists = document.getElementById(containerId);
    if (!containerExists) {
      console.warn(`Container #${containerId} does not exist, skipping render`);
      return;
    }
    
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
      if (container && document.body.contains(container)) {
        // Safe approach to remove all child nodes - check if parent exists first
        while (container.firstChild && document.body.contains(container)) {
          container.removeChild(container.firstChild);
        }
      }
      
      // Call super implementation only if it's safe
      if (document.getElementById(containerId)) {
        super.cleanupContainer(containerId);
      }
    } catch (error) {
      console.error(`Error cleaning up container ${containerId}:`, error);
    }
  }
  
  cleanupAllContainers(): void {
    // Make a copy to avoid iteration issues
    const containers = Array.from(this.enhancedActiveContainers);
    
    // Clear our tracking first
    this.enhancedActiveContainers.clear();
    
    // Clean each container with enhanced safety
    containers.forEach(id => {
      try {
        const container = document.getElementById(id);
        if (container && document.body.contains(container)) {
          // Safe approach - check parent node existence before each removal
          while (container.firstChild && document.body.contains(container)) {
            container.removeChild(container.firstChild);
          }
        }
      } catch (error) {
        console.error(`Error cleaning up container ${id}:`, error);
      }
    });
    
    // We don't need to call super if we've already cleaned everything
    // This prevents double cleanup attempts
    // super.cleanupAllContainers();
  }
  
  /**
   * Check if a container is being tracked by our enhanced tracking
   */
  isEnhancedContainerActive(containerId: string): boolean {
    return this.enhancedActiveContainers.has(containerId);
  }
}

export default EnhancedBlogEmbed;
