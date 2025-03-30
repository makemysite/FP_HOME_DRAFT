
import BlogEmbed from './blogsmith-embed';

/**
 * Enhanced version of BlogEmbed with additional safety features
 * for DOM operations and prevention of race conditions
 */
class EnhancedBlogEmbed extends BlogEmbed {
  // Create a local active containers set for tracking
  private enhancedActiveContainers: Set<string> = new Set();
  private containerRenderLocks: Map<string, boolean> = new Map();
  
  /**
   * Override the base class render methods to use our enhanced container tracking
   * with additional race condition prevention
   */
  async renderBlogList(containerId: string, options: any = {}): Promise<void> {
    // Check if there's already a rendering operation in progress for this container
    if (this.containerRenderLocks.get(containerId)) {
      console.warn(`Container #${containerId} is already being rendered, skipping this request`);
      return;
    }
    
    // Set render lock for this container
    this.containerRenderLocks.set(containerId, true);
    
    try {
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
        console.error(`Error rendering blog list in container #${containerId}:`, error);
        this.enhancedActiveContainers.delete(containerId);
        // Attempt to show error message in container
        try {
          const container = document.getElementById(containerId);
          if (container && document.body.contains(container)) {
            container.innerHTML = `<div class="blog-embed-error">Error loading blog posts. Please try again later.</div>`;
          }
        } catch (displayError) {
          console.error(`Failed to display error message:`, displayError);
        }
        throw error;
      }
    } finally {
      // Always release the render lock
      this.containerRenderLocks.set(containerId, false);
    }
  }
  
  async renderBlogPost(containerId: string, slug: string): Promise<void> {
    // Check if there's already a rendering operation in progress for this container
    if (this.containerRenderLocks.get(containerId)) {
      console.warn(`Container #${containerId} is already being rendered, skipping this request`);
      return;
    }
    
    // Set render lock for this container
    this.containerRenderLocks.set(containerId, true);
    
    try {
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
        console.error(`Error rendering blog post in container #${containerId}:`, error);
        this.enhancedActiveContainers.delete(containerId);
        // Attempt to show error message in container
        try {
          const container = document.getElementById(containerId);
          if (container && document.body.contains(container)) {
            container.innerHTML = `<div class="blog-embed-error">Error loading blog post. Please try again later.</div>`;
          }
        } catch (displayError) {
          console.error(`Failed to display error message:`, displayError);
        }
        throw error;
      }
    } finally {
      // Always release the render lock
      this.containerRenderLocks.set(containerId, false);
    }
  }
  
  /**
   * Enhanced container cleanup with additional safety checks
   */
  cleanupContainer(containerId: string): void {
    // Remove from our enhanced tracking
    this.enhancedActiveContainers.delete(containerId);
    
    try {
      const container = document.getElementById(containerId);
      
      // Additional check to ensure container exists and is in DOM
      if (container && document.body.contains(container)) {
        // Safe approach to remove all child nodes - check parent existence before each removal
        // Only attempt to remove children one by one while the parent exists
        while (container.firstChild && document.body.contains(container)) {
          try {
            container.removeChild(container.firstChild);
          } catch (error) {
            console.error(`Error removing child from container ${containerId}:`, error);
            break; // Break the loop if an error occurs to prevent infinite loops
          }
        }
        
        // Clear HTML as a fallback if all else fails
        try {
          if (document.body.contains(container)) {
            container.innerHTML = '';
          }
        } catch (error) {
          console.error(`Error clearing container ${containerId} innerHTML:`, error);
        }
      }
      
      // Remove render lock for this container
      this.containerRenderLocks.set(containerId, false);
      
      // Call super implementation only if it's safe
      if (document.getElementById(containerId) && document.body.contains(document.getElementById(containerId)!)) {
        try {
          super.cleanupContainer(containerId);
        } catch (error) {
          console.error(`Error in super.cleanupContainer for ${containerId}:`, error);
        }
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
    
    // Reset all render locks
    this.containerRenderLocks.clear();
    
    // Clean each container with enhanced safety
    containers.forEach(id => {
      try {
        const container = document.getElementById(id);
        if (container && document.body.contains(container)) {
          // Safe approach - check parent node existence before each removal
          try {
            // Clear container safely
            container.innerHTML = '';
          } catch (error) {
            console.error(`Error clearing container ${id} with innerHTML:`, error);
            
            // Fallback approach
            try {
              while (container.firstChild && document.body.contains(container)) {
                container.removeChild(container.firstChild);
              }
            } catch (fallbackError) {
              console.error(`Fallback cleanup failed for container ${id}:`, fallbackError);
            }
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
  
  /**
   * Check if a container is currently being rendered
   */
  isContainerLocked(containerId: string): boolean {
    return !!this.containerRenderLocks.get(containerId);
  }
}

export default EnhancedBlogEmbed;
