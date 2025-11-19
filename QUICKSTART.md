# Quick Start Guide

## Getting the Site Running

1. **Start a local server** (choose one method):

   **Python:**
   ```bash
   python -m http.server 8000
   ```

   **Node.js:**
   ```bash
   npx http-server -p 8000
   ```

   **PHP:**
   ```bash
   php -S localhost:8000
   ```

2. **Open in browser:**
   ```
   http://localhost:8000
   ```

## What You Need to Replace

### 1. Images (Priority: High)
Place these in `assets/images/`:
- `hero-image.webp` and `hero-image.jpg`
- `founder-1.jpg`, `founder-2.jpg` (founder portraits)
- `ceo-portrait.jpg`
- `facility-us.webp` and `facility-us.jpg`
- `facility-india.webp` and `facility-india.jpg`

### 2. Text Content (Priority: High)
Edit `index.html` and replace:
- Hero section title and description
- Company description
- Founder names, roles, bios, LinkedIn URLs
- Facility details (locations, certifications, capabilities)
- CEO message quote
- Product specifications

### 3. PDFs (Priority: Medium)
Place in `assets/pdfs/`:
- Company brochure
- Product spec sheets
- CEO letter (if downloadable)

Update download links in `scripts/modules/modal.js`

### 4. Logo (Priority: High)
Replace the SVG logo in the header section of `index.html`

### 5. Form Endpoints (Priority: Medium)
Update form submission URLs in `scripts/modules/forms.js`:
- Contact form endpoint
- Newsletter subscription endpoint

### 6. SEO & Meta (Priority: Medium)
Update in `index.html` `<head>`:
- Meta description
- Open Graph tags
- JSON-LD structured data (company info, contact details)

## Testing Checklist

- [ ] All images load correctly
- [ ] Navigation works (desktop & mobile)
- [ ] Accordion opens/closes with keyboard
- [ ] Modal opens/closes and traps focus
- [ ] Forms validate correctly
- [ ] Smooth scroll works for anchor links
- [ ] Mobile menu toggles properly
- [ ] All links work
- [ ] Page is responsive on mobile/tablet/desktop

## Browser Testing

Test in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Accessibility Testing

1. **Keyboard Navigation:**
   - Tab through all interactive elements
   - Test accordion with Arrow keys
   - Test modal with Tab and Escape

2. **Screen Reader:**
   - Test with NVDA/JAWS/VoiceOver
   - Verify ARIA labels are announced

3. **Color Contrast:**
   - Use WebAIM Contrast Checker
   - Ensure WCAG AA compliance

## Performance

Run Lighthouse audit:
- Performance: >90
- Accessibility: >90
- Best Practices: >90
- SEO: >90

## Need Help?

See `README.md` for detailed documentation.

