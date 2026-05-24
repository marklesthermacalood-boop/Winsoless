# Win Soles Website - Modular Architecture

## Project Structure

The website has been refactored from a monolithic HTML file into a modular, maintainable architecture:

```
Win Soles/
├── index.html          # HTML structure and imports
├── css/
│   └── style.css       # Global styles and custom CSS
├── js/
│   ├── data.js         # Product data and constants (SNEAKERS, BRANDS, etc.)
│   ├── utils.js        # Utility functions (DOM helpers, formatters, card generators)
│   ├── views.js        # Page view templates and state management
│   ├── filters.js      # Browse page filtering logic
│   └── app.js          # Main application logic and routing
├── Brand Logo Images/  # Brand logo assets
└── Product Images/     # Product image assets
```

## File Descriptions

### `index.html`
- Clean HTML structure with header, footer, and main app container
- External CSS and JavaScript imports only
- Minimal inline Tailwind configuration
- Script loading order ensures proper dependency resolution

### `css/style.css`
- Custom styles and utility classes
- Global resets and animations
- Form element styling

### `js/data.js`
- **SNEAKERS** array: 12 product objects with all pricing and image data
- **BRANDS** array: List of brand names
- **BRAND_LOGOS** object: Brand logo file mappings
- **SIZES** and **sizeMatrix** arrays: Available shoe sizes

### `js/utils.js`
- **$() / $$()**  : DOM query helpers
- **fmt()**: Currency formatter for PHP
- **debounce()**: Debounce utility for search input
- **sneakerSVG()**: Generate product image or placeholder SVG
- **card()**: Build product card HTML
- **field()**: Build form input HTML
- **accordion()**: Build accordion component

### `js/views.js`
- **views.home**: Home page with featured product, brands, and trending section
- **views.about**: Company information and team section
- **views.browse**: Browse page with filters and product grid
- **views.product**: Single product detail page with size selection and pricing
- **views.login / views.signup**: Authentication page templates
- **views.sell**: Seller information page
- **State objects**: `browseState`, `productState`, featured product state

### `js/filters.js`
- **renderFilters()**: Generate filter UI (brand, size, price range, collections)
- **applyFilters()**: Filter and sort products based on user selections
- **wireFilters()**: Attach event listeners to filter controls

### `js/app.js`
- **wireSearch()**: Search input functionality
- **wireProduct()**: Size selection interactions
- **wireFeaturedProduct()**: Rotate featured product every 4 seconds
- **navigate()**: Main router and view renderer
- Global click handler for navigation links
- App initialization

## Data Flow

1. **User opens site** → `app.js` calls `navigate('home')`
2. **Route handler** → Loads view template from `views.js`
3. **View renders** → Uses data from `data.js` and utilities from `utils.js`
4. **User interacts** → Event listeners wire up page-specific logic:
   - Browse: `wireFilters()` + `applyFilters()` from `filters.js`
   - Product: `wireProduct()` from `app.js`
   - Home: `wireFeaturedProduct()` from `app.js`

## Maintenance Guide

### Adding a New Product
1. Edit `js/data.js`
2. Add new object to `SNEAKERS` array with required properties:
   ```javascript
   { 
     id, brand, model, colorway, lowestAsk, lastSale, highestBid, 
     changeAbs, changePct, releaseDate, retail, sku, hue, image 
   }
   ```

### Updating Styles
- Modify `css/style.css` for custom CSS
- Tailwind classes are loaded via CDN in `index.html`

### Adding a New Page
1. Create view function in `js/views.js`: `views.newpage = () => {...}`
2. Add navigation link with `data-nav="newpage"` attribute
3. Add event handling in `app.js` if needed
4. Update router as necessary

### Updating Filter Options
- Edit `renderFilters()` in `js/filters.js`
- Modify collections, price ranges, or size options

## Key Features

✓ **Single Page Application** - Client-side routing with smooth transitions  
✓ **Search Functionality** - Real-time product search with debouncing  
✓ **Advanced Filtering** - Brand, size, price, and collection filters  
✓ **Responsive Design** - Mobile-first with Tailwind CSS  
✓ **Currency Formatting** - PHP peso formatting for all prices  
✓ **Featured Product Rotation** - Auto-cycling carousel on home page

## Browser Support

Works on all modern browsers (Chrome, Firefox, Safari, Edge) that support:
- ES6+ JavaScript
- CSS Grid & Flexbox
- Tailwind CSS 3+

## Scope & Limitations

Win Soles is a polished client-side prototype for a deadstock sneaker marketplace. It is built to showcase the buyer/seller journey, pricing data, brand discovery, and authentication messaging, but it is not yet a full ecommerce platform.

### What the website can do now
- Present a branded homepage with featured product highlights, trending sneaker collections, and popular brands
- Render a live-style browse page with searchable products, brand filters, size filters, and price-based filtering
- Show product detail pages with pricing, size selection, and sneaker authentication messaging
- Provide dedicated informational pages for selling, about the company, and marketplace trust messaging
- Offer responsive navigation with a mobile menu and mobile-friendly filter interactions
- Simulate signup/login account flows and provide a simple seller onboarding concept
- Support a mock listing submission flow in-browser and a “listing pending review” success page

### What it does not do yet
- It is entirely static and client-side: product data is hardcoded in `js/data.js` with no backend or live inventory updates
- Authentication is mocked and does not connect to a secure backend user service
- There is no real checkout, payment processing, order fulfillment, or shipping integration
- The sell flow is simulated; it does not support actual marketplace transactions, seller dashboards, or order management
- Search and filters work only against the current static dataset, with no pagination, server-side search, or scalable collection support
- There is no persistent user profile, order history, saved favorites, or buyer/seller messaging

## Notes

- All data is currently client-side (hardcoded). For production, replace with API calls.
- Authentication is mocked. Implement actual auth system for production.
- Search and filters operate only on static dataset. Consider server-side search for scale.
