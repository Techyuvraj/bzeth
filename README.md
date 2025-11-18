# Bzeth - Biopharmaceutical Company Website

A polished, responsive one-page website for a biopharmaceutical company built with HTML5, CSS3, RequireJS, and jQuery.

## Project Structure

```
/
├── index.html              # Main HTML file
├── styles/
│   └── styles.css         # Main stylesheet (BEM methodology)
├── scripts/
│   ├── main.js            # RequireJS entry point
│   ├── require-config.js  # RequireJS configuration
│   └── modules/
│       ├── nav.js         # Navigation module (sticky header, mobile menu)
│       ├── accordion.js   # Accessible accordion component
│       ├── modal.js       # Modal dialog component
│       └── forms.js       # Form validation and submission
├── assets/
│   ├── images/            # Image assets (WebP + fallbacks)
│   ├── pdfs/              # PDF documents (brochures, spec sheets)
│   └── svgs/              # SVG icons and graphics
└── README.md              # This file
```

## Technology Stack

- **HTML5**: Semantic markup with ARIA attributes for accessibility
- **CSS3**: Custom properties (CSS variables), BEM methodology, responsive design
- **JavaScript**: RequireJS (AMD modules) + jQuery 3.7.1
- **No frameworks**: No React, Tailwind, or component frameworks

## Getting Started

### Prerequisites

- A local web server (Python, Node.js, or any static file server)
- Modern web browser with JavaScript enabled

### Running Locally

#### Option 1: Python HTTP Server
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Option 2: Node.js HTTP Server
```bash
# Install http-server globally
npm install -g http-server

# Run server
http-server -p 8000
```

#### Option 3: PHP Built-in Server
```bash
php -S localhost:8000
```

Then open your browser and navigate to `http://localhost:8000`

### Development Notes

- The site uses RequireJS to load jQuery from a CDN with a local fallback
- All JavaScript modules follow AMD (Asynchronous Module Definition) pattern
- CSS uses BEM (Block Element Modifier) naming convention
- Images should be provided in WebP format with JPG/PNG fallbacks

## Replacing Content from PPT

### Text Content

1. **Hero Section** (`#banner`):
   - Update `banner__title` (H1 tag)
   - Update `banner__lead` paragraph
   - Modify CTA button text if needed

2. **Company Section** (`#company`):
   - Replace `company__description` paragraph
   - Update stat card numbers and labels

3. **Founders Section** (`#founders`):
   - Replace founder card content:
     - Portrait images: `assets/images/founder-1.jpg`, `founder-2.jpg`
     - Names, roles, and bios
     - LinkedIn profile URLs

4. **Facilities Section** (`#facilities`):
   - Update facility images: `assets/images/facility-us.jpg`, `facility-india.jpg`
   - Replace location, certifications, capabilities, and capacity information

5. **CEO Message** (`#ceo-message`):
   - Update quote text
   - Replace CEO portrait: `assets/images/ceo-portrait.jpg`
   - Update CEO name and title

6. **Products Section** (`#products`):
   - Modify product accordion items
   - Update product specifications, dosage forms, storage info
   - Replace spec sheet PDFs in `assets/pdfs/`

### Images

Place all images in the `assets/images/` directory:

**Required Images:**
- `hero-image.webp` / `hero-image.jpg` - Hero section image
- `founder-1.jpg` - First founder portrait
- `founder-2.jpg` - Second founder portrait (if applicable)
- `ceo-portrait.jpg` - CEO portrait
- `facility-us.webp` / `facility-us.jpg` - US facility photo
- `facility-india.webp` / `facility-india.jpg` - India facility photo

**Image Requirements:**
- Provide WebP format for modern browsers
- Include JPG/PNG fallbacks
- Use `srcset` for responsive images (already implemented in HTML)
- Optimize images for web (compress, resize appropriately)
- Use `loading="lazy"` for below-the-fold images

### PDFs

Place PDF documents in the `assets/pdfs/` directory:

- Company brochure
- Product spec sheets
- CEO letter (if downloadable)
- Any other downloadable documents

Update download links in:
- `scripts/modules/modal.js` - Download brochure button
- `scripts/modules/modal.js` - Download letter button
- Product spec sheet download buttons

### Logo

Replace the SVG logo in the header:
- Update the `<svg>` element in `index.html` (`.header__logo-icon`)
- Or replace with an `<img>` tag pointing to `assets/images/logo.svg`

## Form Configuration

### Contact Form

The contact form is located in the modal (`#contact-modal`). To connect it to a backend:

1. Open `scripts/modules/forms.js`
2. Find the `initContactForm` method
3. Replace the demo `setTimeout` with actual AJAX call:

```javascript
$.ajax({
    url: '/api/contact', // Your endpoint
    method: 'POST',
    data: formData,
    success: function(response) {
        self.showFormMessage($message, 'success', 'Thank you! Your message has been sent successfully.');
        $form[0].reset();
    },
    error: function(xhr) {
        self.showFormMessage($message, 'error', 'Sorry, there was an error sending your message. Please try again.');
    },
    complete: function() {
        $submitBtn.prop('disabled', false).text(originalText);
    }
});
```

**Important:** Always validate and sanitize form inputs on the server side. The client-side validation is for UX only.

### Newsletter Form

Similar to contact form, update the `initNewsletterForm` method in `scripts/modules/forms.js` with your newsletter subscription endpoint.

## SEO Configuration

### Meta Tags

Update meta tags in `<head>` section of `index.html`:
- Page title
- Meta description
- Open Graph tags (for social sharing)
- Twitter Card tags

### JSON-LD Structured Data

Update the JSON-LD script in `index.html` with your actual:
- Company name
- Website URL
- Logo URL
- Contact information
- Social media profiles

### Product Structured Data

For better SEO, consider adding Product schema markup for each product in the Products section.

## Accessibility Features

- Semantic HTML5 elements
- ARIA attributes on interactive components
- Keyboard navigation support (Tab, Enter, Space, Arrow keys)
- Focus management and visible focus indicators
- Screen reader announcements via `aria-live` regions
- Alt text for all images
- Proper heading hierarchy (H1 → H2 → H3)
- Color contrast meets WCAG AA standards
- Reduced motion support via `prefers-reduced-motion`

### Testing Accessibility

1. **Keyboard Navigation:**
   - Tab through all interactive elements
   - Test accordion with Arrow keys
   - Test modal with Tab and Escape
   - Ensure focus is visible at all times

2. **Screen Reader:**
   - Test with NVDA (Windows), JAWS, or VoiceOver (Mac)
   - Verify all content is announced correctly
   - Check ARIA labels and roles

3. **Color Contrast:**
   - Use tools like WebAIM Contrast Checker
   - Ensure text meets WCAG AA standards (4.5:1 for normal text)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimization

### Images
- Use WebP format with fallbacks
- Implement lazy loading (`loading="lazy"` attribute)
- Use `srcset` for responsive images
- Compress images before adding to project

### CSS
- Minify CSS for production (use tools like cssnano, clean-css)
- Consider critical CSS inlining for above-the-fold content

### JavaScript
- RequireJS handles module loading efficiently
- jQuery loaded from CDN with local fallback
- Consider minifying JavaScript modules for production

### Lighthouse Targets
- Performance: >90
- Accessibility: >90
- Best Practices: >90
- SEO: >90

## Customization

### Colors

Update CSS variables in `styles/styles.css`:

```css
:root {
    --color-primary: #0E5A67;    /* Deep teal */
    --color-accent: #18A0B0;      /* Cyan */
    --color-secondary: #0B3B43;   /* Navy */
    --color-bg: #F8FAFB;          /* Off-white */
    --color-text: #0F1724;        /* Main text */
    --color-text-muted: #6B7280;  /* Muted text */
}
```

### Typography

Update font family in CSS variables:

```css
:root {
    --font-family: 'Inter', -apple-system, BlinkMacSystemFont, ...;
    --font-size-base: 18px;
}
```

### Spacing & Layout

Adjust container width and spacing:

```css
:root {
    --container-max-width: 1200px;
    --spacing-md: 2rem;
}
```

## Troubleshooting

### RequireJS/jQuery Not Loading

1. Check browser console for errors
2. Verify RequireJS CDN is accessible
3. Ensure jQuery fallback path is correct
4. Check network tab for failed requests

### Images Not Displaying

1. Verify image paths are correct
2. Check file names match exactly (case-sensitive)
3. Ensure images are in `assets/images/` directory
4. Check browser console for 404 errors

### Forms Not Submitting

1. Check browser console for JavaScript errors
2. Verify form endpoints are configured in `scripts/modules/forms.js`
3. Test form validation is working
4. Check network tab for AJAX requests

### Mobile Menu Not Working

1. Ensure viewport meta tag is present
2. Check CSS media queries are correct
3. Verify JavaScript is loading (check console)
4. Test on actual mobile device or browser dev tools

## License

This project is proprietary and confidential.

## Support

For questions or issues, please contact the development team.

---

**Last Updated:** 2024

