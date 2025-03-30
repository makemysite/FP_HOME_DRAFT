
import BlogEmbed, { BlogEmbedOptions } from './blogsmith-embed';

/**
 * Enhanced version of BlogEmbed with additional safety features
 * for DOM operations and prevention of race conditions
 */
class EnhancedBlogEmbed extends BlogEmbed {
  // Create a local active containers set for tracking
  private enhancedActiveContainers: Set<string> = new Set();
  private containerRenderLocks: Map<string, boolean> = new Map();
  
  constructor() {
    // Initialize the base class with enhanced configuration
    super({
      debug: true,
      domCheckInterval: 500, // Check DOM every 500ms
      errorHandler: (error) => {
        console.error('BlogEmbed Enhanced Error:', error);
        // We'll handle errors at this level so they don't bubble up and crash the app
      }
    });
  }
  
  /**
   * Override the base class render methods to use our enhanced container tracking
   * with additional race condition prevention
   */
  async renderBlogList(containerId: string, options: BlogEmbedOptions = {}): Promise<void> {
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
        this.containerRenderLocks.set(containerId, false);
        return;
      }
      
      this.enhancedActiveContainers.add(containerId);
      
      // Add enhanced options for better error handling and resilience
      const enhancedOptions = {
        ...options,
        retryOnFailure: true,
        retryAttempts: 3,
        retryDelay: 1000,
        fallbackContent: options.fallbackContent || 'No blog posts available at the moment. Please try again later.'
      };
      
      try {
        await super.renderBlogList(containerId, enhancedOptions);
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
      }
    } finally {
      // Always release the render lock
      this.containerRenderLocks.set(containerId, false);
    }
  }
  
  async renderBlogPost(containerId: string, slug: string, options: BlogEmbedOptions = {}): Promise<void> {
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
        this.containerRenderLocks.set(containerId, false);
        return;
      }
      
      this.enhancedActiveContainers.add(containerId);
      
      // Add enhanced options for better error handling and resilience
      const enhancedOptions = {
        ...options,
        retryOnFailure: true,
        retryAttempts: 3,
        retryDelay: 1000,
        fallbackContent: options.fallbackContent || `We couldn't find the blog post you're looking for.`
      };
      
      try {
        await super.renderBlogPost(containerId, slug, enhancedOptions);
      } catch (error) {
        console.error(`Error rendering blog post in container #${containerId}:`, error);
        this.enhancedActiveContainers.delete(containerId);
        
        // Attempt to show error message in container
        try {
          const container = document.getElementById(containerId);
          if (container && document.body.contains(container)) {
            // Check if error indicates post not found
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            const isNotFound = errorMessage.includes('not found');
            
            container.innerHTML = `
              <div class="blog-embed-error">
                ${isNotFound 
                  ? `The blog post "${slug}" could not be found.` 
                  : 'Error loading blog post. Please try again later.'}
              </div>
            `;
          }
        } catch (displayError) {
          console.error(`Failed to display error message:`, displayError);
        }
        
        // Re-throw the error so the caller can handle it appropriately
        // This is important for navigation in case of 404s
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
      
      // Also call the parent implementation for proper tracking there
      super.cleanupContainer(containerId);
    } catch (error) {
      console.error(`Error in cleanup for container ${containerId}:`, error);
      // Always clear lock in case of error
      this.containerRenderLocks.set(containerId, false);
      
      // Still try to call parent cleanup
      try {
        super.cleanupContainer(containerId);
      } catch (parentError) {
        console.error(`Error in parent cleanup for container ${containerId}:`, parentError);
      }
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
    
    // Also call parent cleanup for proper cleanup there
    try {
      super.cleanupAllContainers();
    } catch (parentError) {
      console.error('Error in parent cleanupAllContainers:', parentError);
    }
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
  
  /**
   * Enhanced destroy method to ensure all resources are properly cleaned up
   */
  destroy(): void {
    try {
      // Clean up all containers first
      this.cleanupAllContainers();
      
      // Clear all locks
      this.containerRenderLocks.clear();
      this.enhancedActiveContainers.clear();
      
      // Call parent destroy
      super.destroy();
    } catch (error) {
      console.error('Error destroying EnhancedBlogEmbed instance:', error);
      
      // Still try to call parent destroy
      try {
        super.destroy();
      } catch (parentError) {
        console.error('Error in parent destroy:', parentError);
      }
    }
  }
}

export default EnhancedBlogEmbed;
