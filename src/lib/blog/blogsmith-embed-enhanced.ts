
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
   * This is the critical method we need to fix to resolve DOM NotFoundError
   */
  cleanupContainer(containerId: string): void {
    // Remove from our enhanced tracking first
    this.enhancedActiveContainers.delete(containerId);
    
    try {
      // Get container with additional exist check
      const container = document.getElementById(containerId);
      
      // If container exists and is in the DOM
      if (container && document.body.contains(container)) {
        // Use a safer approach - set innerHTML to empty string first
        try {
          container.innerHTML = '';
        } catch (error) {
          console.error(`Error clearing container ${containerId} with innerHTML:`, error);
          
          // Fallback: try to remove children individually with safety checks
          try {
            let child = container.firstChild;
            while (child && document.body.contains(container)) {
              // Store the next sibling before removing the current child
              const nextSibling = child.nextSibling;
              try {
                // Check if child is still a child of container before removing
                if (child.parentNode === container) {
                  container.removeChild(child);
                }
              } catch (childError) {
                console.error(`Error removing individual child:`, childError);
                // Break to avoid infinite loop
                break;
              }
              // Move to next sibling
              child = nextSibling;
            }
          } catch (fallbackError) {
            console.error(`Fallback child removal failed:`, fallbackError);
          }
        }
      } else {
        console.warn(`Container #${containerId} does not exist or is not in DOM, skipping cleanup`);
      }
      
      // Remove render lock in any case
      this.containerRenderLocks.set(containerId, false);
    } catch (error) {
      console.error(`Error in cleanup for container ${containerId}:`, error);
      // Always clear lock in case of error
      this.containerRenderLocks.set(containerId, false);
    }
    
    // Note: we're explicitly NOT calling super.cleanupContainer() here
    // to avoid potential DOM errors in the parent implementation
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
          // Safe approach - set innerHTML to empty string
          try {
            container.innerHTML = '';
          } catch (error) {
            console.error(`Error clearing container ${id} with innerHTML:`, error);
            
            // Fallback: try to remove children individually with safety checks
            try {
              let child = container.firstChild;
              while (child && document.body.contains(container)) {
                // Store the next sibling before removing the current child
                const nextSibling = child.nextSibling;
                try {
                  // Check if child is still a child of container before removing
                  if (child.parentNode === container) {
                    container.removeChild(child);
                  }
                } catch (childError) {
                  console.error(`Error removing individual child:`, childError);
                  // Break to avoid infinite loop
                  break;
                }
                // Move to next sibling
                child = nextSibling;
              }
            } catch (fallbackError) {
              console.error(`Fallback child removal failed:`, fallbackError);
            }
          }
        } else {
          console.warn(`Container #${id} does not exist or is not in DOM, skipping cleanup`);
        }
      } catch (error) {
        console.error(`Error cleaning up container ${id}:`, error);
      }
    });
    
    // We don't need to call super if we've already cleaned everything
    // This prevents double cleanup attempts and potential DOM errors
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
