
# FieldPromax Admin Dashboard

This is a separate admin dashboard application for FieldPromax that can be deployed independently from the main website.

## Development

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

The admin panel will be available at http://localhost:3001

## Building for Production

To build the admin dashboard for production:

```bash
npm run build
```

This will generate optimized production files in the `dist` directory.

## Deployment

The admin dashboard is designed to be deployed as a separate application on a different domain or subdomain from the main website.

### Deployment Options:

1. **Subdomain Deployment**: Deploy to admin.yourdomain.com
2. **Path-based Deployment**: Deploy to yourdomain.com/admin (may require additional configuration)
3. **Separate Domain**: Deploy to a completely different domain

### Deployment Instructions:

1. Run `npm run build` to generate the production build
2. Deploy the contents of the `dist` directory to your preferred hosting provider
3. Configure your hosting provider to handle SPA routing (all routes should redirect to index.html)

## Authentication

The admin dashboard uses Supabase authentication and requires admin privileges to access. Users must:

1. Have a valid Supabase account
2. Be granted admin privileges in the database (admin_users table)

## Security Considerations

- This admin dashboard should be deployed with HTTPS enabled
- Consider implementing additional security measures like IP restrictions
- Regularly audit the admin_users table to ensure only authorized personnel have access
