
# Blog Integration Package

This package allows you to easily integrate the blog functionality from your existing Lovable project into another website.

## Installation

1. Copy the entire `blog-integration` folder to your website's public directory.
2. Add a container div with an ID (e.g., `blog-container`) to the page where you want to display blog posts.
3. Include the `BlogEmbed.js` script in your HTML page.

## Usage

### Basic Integration

Add the following code to your HTML page:

```html
<!-- Container for the blog content -->
<div id="blog-container"></div>

<!-- Include the blog embed script -->
<script src="/blog-integration/BlogEmbed.js"></script>
<script>
  // Initialize the blog embed client
  window.BlogEmbed.configure({
    apiUrl: 'https://emdldcecqgrdgronpcoc.supabase.co/rest/v1',
    apiKey: 'YOUR_SUPABASE_API_KEY',
    containerId: 'blog-container',
    baseRoute: '/blog-integration'  // Path to where you placed the blog-integration folder
  });
  
  // Get the current URL path
  const currentPath = window.location.pathname;
  
  // If we're on a blog post page (e.g., /blog/my-blog-post/)
  if (currentPath.match(/\/blog\/([^\/]+)/)) {
    // Extract the slug from the URL
    const pathParts = currentPath.split('/');
    const blogIndex = pathParts.indexOf('blog');
    const slug = blogIndex >= 0 && blogIndex + 1 < pathParts.length ? pathParts[blogIndex + 1] : null;
    
    if (slug) {
      // Load the specific blog post
      window.BlogEmbed.loadPost(slug);
    }
  }
</script>
```

### Configuration Options

The `BlogEmbed.configure()` method accepts the following options:

- `apiUrl` (required): The URL of your Supabase REST API.
- `apiKey` (required): Your Supabase API key.
- `containerId` (default: 'blog-container'): The ID of the HTML element where the blog content will be rendered.
- `baseRoute` (default: '/blog'): The base route for blog-related URLs and assets.

### API Methods

- `BlogEmbed.configure(options)`: Configure the blog embed client.
- `BlogEmbed.loadPost(slug)`: Load and render a specific blog post by its slug.
- `BlogEmbed.loadPosts()`: (Coming soon) Load and render a list of blog posts.

## Customization

### Styling

The blog embed script includes its own CSS styles, but you can customize the appearance by adding your own CSS rules to override the default styles.

### Templates

You can modify the HTML structure of the blog components by editing the React components in the `BlogEmbed.js` file.

## Troubleshooting

- If the blog content doesn't load, check the browser console for errors.
- Ensure that your Supabase API key has the necessary permissions to access the blog data.
- Verify that the container element with the specified ID exists in the HTML.

## License

This package is provided as-is without any warranty. Use at your own risk.
