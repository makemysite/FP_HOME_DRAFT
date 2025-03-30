
import BlogEmbed from './blogsmith-embed';

// Add this method to the BlogEmbed class to make container operations safer
BlogEmbed.prototype.safelyUpdateContainer = function(container: HTMLElement | null, content: string, containerId: string): boolean {
  if (!container) {
    // Container not available, remove from tracking
    this.activeContainers.delete(containerId);
    return false;
  }
  
  try {
    // Extra check to ensure the container is still in the DOM
    if (!document.body.contains(container)) {
      console.warn(`Container #${containerId} is no longer in the DOM, aborting update`);
      this.activeContainers.delete(containerId);
      return false;
    }
    
    // Using a temporary document fragment for safer DOM manipulation
    const fragment = document.createDocumentFragment();
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = content;
    
    // Clear the container first using a safe approach
    while (container.firstChild) {
      container.firstChild.remove();
    }
    
    // Move nodes from temp div to fragment
    while (tempDiv.firstChild) {
      fragment.appendChild(tempDiv.firstChild);
    }
    
    // Append fragment to container (single DOM operation)
    container.appendChild(fragment);
    
    return true;
  } catch (error) {
    console.error(`Error updating container ${containerId} content:`, error);
    this.activeContainers.delete(containerId);
    return false;
  }
};

export default BlogEmbed;
