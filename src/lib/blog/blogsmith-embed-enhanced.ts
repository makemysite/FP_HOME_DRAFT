import BlogEmbed, { BlogEmbedOptions } from './blogsmith-embed';

/**
 * Enhanced version of BlogEmbed with additional safety features
 * for DOM operations and prevention of race conditions
 */
class EnhancedBlogEmbed extends BlogEmbed {
  // Create a local active containers set for tracking
  private enhancedActiveContainers: Set<string> = new Set();
  private containerRenderLocks: Map<string, boolean> = new Map();
  private pendingNodeOperations: Map<string, NodeJS.Timeout> = new Map();
  
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
   * Safely check if a DOM element exists and is in the document
   */
  private doesElementExist(containerId: string): boolean {
    try {
      const element = document.getElementById(containerId);
      return !!element && document.body.contains(element);
    } catch (error) {
      console.error(`Error checking if ${containerId} exists:`, error);
      return false;
    }
  }
  
  /**
   * Helper method to consistently normalize slugs across the application
   */
  private normalizeSlug(slug: string): string {
    // First remove any trailing slash if present
    let normalizedSlug = slug.endsWith('/') ? slug.slice(0, -1) : slug;
    
    // Then remove any leading /blog/ if present (for full path normalization)
    normalizedSlug = normalizedSlug.startsWith('/blog/') 
      ? normalizedSlug.replace('/blog/', '') 
      : normalizedSlug;
    
    console.log(`EnhancedBlogEmbed normalized slug: "${normalizedSlug}" from original: "${slug}"`);
    return normalizedSlug;
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
    
    // First check if container exists to avoid race conditions
    if (!this.doesElementExist(containerId)) {
      console.warn(`Container #${containerId} does not exist or is not in DOM, skipping render`);
      return;
    }
    
    // Set render lock for this container
    this.containerRenderLocks.set(containerId, true);
    
    try {
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
        // Update the loading UI before the actual operation starts
        const container = document.getElementById(containerId);
        if (container && document.body.contains(container)) {
          container.innerHTML = `
            <div class="blog-embed-loading text-center p-8">
              <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mb-3"></div>
              <p>Loading blog posts...</p>
            </div>
          `;
        }
        
        // Wait a moment for the loading UI to render
        await new Promise(resolve => setTimeout(resolve, 50));
        
        // Check again if the container still exists
        if (!this.doesElementExist(containerId)) {
          console.warn(`Container #${containerId} no longer exists, aborting render`);
          this.containerRenderLocks.set(containerId, false);
          return;
        }
        
        await super.renderBlogList(containerId, enhancedOptions);
      } catch (error) {
        console.error(`Error rendering blog list in container #${containerId}:`, error);
        this.enhancedActiveContainers.delete(containerId);
        
        // Attempt to show error message in container
        try {
          if (this.doesElementExist(containerId)) {
            const container = document.getElementById(containerId);
            if (container) {
              container.innerHTML = `<div class="blog-embed-error">Error loading blog posts. Please try again later.</div>`;
            }
          }
        } catch (displayError) {
          console.error(`Failed to display error message:`, displayError);
        }
        
        // Rethrow for higher-level handling
        throw error;
      }
    } finally {
      // Always release the render lock
      this.containerRenderLocks.set(containerId, false);
    }
  }
  
  async renderBlogPost(containerId: string, slug: string, options: BlogEmbedOptions = {}): Promise<void> {
    // Normalize the slug to handle both with and without trailing slash
    const normalizedSlug = this.normalizeSlug(slug);
    console.log(`EnhancedBlogEmbed: Using normalized slug "${normalizedSlug}" for rendering (original: "${slug}")`);
    
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
        // Always pass the normalized slug to the parent class method
        await super.renderBlogPost(containerId, normalizedSlug, enhancedOptions);
      } catch (error) {
        console.error(`Error rendering blog post in container #${containerId} for slug "${normalizedSlug}":`, error);
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
                  ? `The blog post "${normalizedSlug}" could not be found.` 
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
   * Clear any pending node operations for a container
   */
  private clearPendingOperations(containerId: string): void {
    if (this.pendingNodeOperations.has(containerId)) {
      const timeoutId = this.pendingNodeOperations.get(containerId);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      this.pendingNodeOperations.delete(containerId);
    }
  }
  
  /**
   * Enhanced container cleanup with additional safety checks and deferred processing
   * to prevent race conditions with React's DOM manipulation
   */
  cleanupContainer(containerId: string): void {
    // Remove from our enhanced tracking first
    this.enhancedActiveContainers.delete(containerId);
    
    // Clear any pending operations
    this.clearPendingOperations(containerId);
    
    try {
      // Check if container exists in DOM
      if (!this.doesElementExist(containerId)) {
        console.warn(`Container #${containerId} does not exist or is not in DOM, skipping cleanup`);
        this.containerRenderLocks.set(containerId, false);
        return;
      }
      
      // Use a safer approach - set innerHTML to empty string instead of DOM node removal
      try {
        const container = document.getElementById(containerId);
        if (container) {
          // Make a "safe" copy of children to avoid live collection issues
          const safeHtml = container.innerHTML;
          container.innerHTML = '';
        }
      } catch (error) {
        console.error(`Error clearing container ${containerId} with innerHTML:`, error);
      }
      
      // Call parent implementation in a deferred way to let React finish its current work
      const timeoutId = setTimeout(() => {
        try {
          // Double check the container still exists before calling parent cleanup
          if (this.doesElementExist(containerId)) {
            super.cleanupContainer(containerId);
          }
          this.pendingNodeOperations.delete(containerId);
        } catch (error) {
          console.error(`Error in deferred parent cleanup for container ${containerId}:`, error);
        }
      }, 0);
      
      this.pendingNodeOperations.set(containerId, timeoutId);
    } catch (error) {
      console.error(`Error in cleanup for container ${containerId}:`, error);
      // Always clear lock in case of error
      this.containerRenderLocks.set(containerId, false);
    }
  }
  
  cleanupAllContainers(): void {
    // Make a copy to avoid iteration issues
    const containers = Array.from(this.enhancedActiveContainers);
    
    // Clear our tracking first
    this.enhancedActiveContainers.clear();
    
    // Reset all render locks
    this.containerRenderLocks.clear();
    
    // Clear all pending operations
    containers.forEach(id => this.clearPendingOperations(id));
    this.pendingNodeOperations.clear();
    
    // Clean each container with enhanced safety
    containers.forEach(id => {
      try {
        if (this.doesElementExist(id)) {
          const container = document.getElementById(id);
          if (container) {
            // Safe approach - set innerHTML to empty string
            try {
              container.innerHTML = '';
            } catch (error) {
              console.error(`Error clearing container ${id} with innerHTML:`, error);
            }
          }
        } else {
          console.warn(`Container #${id} does not exist or is not in DOM, skipping cleanup`);
        }
      } catch (error) {
        console.error(`Error cleaning up container ${id}:`, error);
      }
    });
    
    // Also call parent cleanup in a deferred way
    setTimeout(() => {
      try {
        super.cleanupAllContainers();
      } catch (parentError) {
        console.error('Error in parent cleanupAllContainers:', parentError);
      }
    }, 0);
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
      // Clear all pending operations
      Array.from(this.pendingNodeOperations.keys()).forEach(id => {
        this.clearPendingOperations(id);
      });
      this.pendingNodeOperations.clear();
      
      // Clean up all containers first
      this.cleanupAllContainers();
      
      // Clear all locks
      this.containerRenderLocks.clear();
      this.enhancedActiveContainers.clear();
      
      // Call parent destroy in a deferred way
      setTimeout(() => {
        try {
          super.destroy();
        } catch (error) {
          console.error('Error in deferred parent destroy:', error);
        }
      }, 0);
    } catch (error) {
      console.error('Error destroying EnhancedBlogEmbed instance:', error);
    }
  }
}

export default EnhancedBlogEmbed;
