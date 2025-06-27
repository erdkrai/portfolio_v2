# Portfolio Gallery Guide - Enhanced Media Galleries

This guide covers the new Portfolio Gallery feature that brings Pinterest-style masonry layouts, professional lightbox functionality, and advanced filtering to your rich text editor.

## 🎯 Overview

The Portfolio Gallery is designed for creative professionals, agencies, and businesses who need to showcase their work beautifully. It provides:

- **Pinterest-style masonry layouts** that adapt to different image sizes
- **Professional lightbox** with full-screen viewing and navigation
- **Category filtering** for organized content presentation
- **Multiple layout options** (masonry, grid, carousel, justified)
- **Responsive design** that works on all devices
- **Performance optimized** with lazy loading and image optimization

## 📝 Features

### 1. Layout Options

**Masonry Layout (Default)**
- Pinterest-style staggered grid
- Adapts to different image sizes naturally
- Perfect for portfolios with varying content

**Grid Layout**
- Consistent sizing across all items
- Perfect for product showcases
- Professional, uniform appearance

**Carousel Layout**
- Horizontal scrolling gallery
- Great for featured work
- Touch/swipe support on mobile

**Justified Layout**
- Justified rows with consistent spacing
- Balanced visual presentation
- Optimal use of available space

### 2. Hover Effects

**Overlay Effect**
- Details appear on hover with gradient overlay
- Action buttons for viewing and external links
- Professional, interactive experience

**Scale Effect**
- Image scales up with shadow on hover
- Clean, modern interaction
- Subtle but engaging

**Fade Zoom Effect**
- Gentle zoom with opacity change
- Elegant, minimal interaction
- Perfect for sophisticated designs

**None**
- Clean, minimal interaction
- Focus purely on content
- Accessibility-friendly

### 3. Lightbox Functionality

**Professional Viewing Experience**
- Full-screen image display
- Smooth transitions and animations
- High-quality image rendering

**Navigation Controls**
- Previous/Next buttons
- Keyboard navigation (arrow keys, escape)
- Image counter display
- Touch/swipe support for mobile

**Additional Features**
- Download functionality
- External link integration
- Project details overlay
- Loading states and error handling

### 4. Category Filtering

**Organization**
- Filter by project categories
- Real-time filtering with smooth transitions
- Item count display for each category

**Built-in Categories**
- Web Design
- Mobile App
- Branding
- Photography
- Illustration
- UI/UX
- Print Design
- Custom categories supported

### 5. Responsive Design

**Adaptive Columns**
- Mobile: 1-2 columns
- Tablet: 2-3 columns
- Desktop: 3-4 columns
- Large screens: Up to 6 columns

**Performance Features**
- Lazy loading for images
- Progressive image enhancement
- Optimized bundle splitting
- CDN-ready image optimization

## 🚀 How to Use

### In Sanity Studio

1. **Create/Edit a Post**: Go to your post editor in Sanity Studio
2. **Add Portfolio Gallery**: Click the "+" button and select "Portfolio Gallery"
3. **Configure Settings**: 
   - Choose layout style (masonry, grid, carousel, justified)
   - Set number of columns (auto or fixed)
   - Configure spacing (tight, normal, relaxed, loose)
   - Enable/disable lightbox and category filtering
   - Select hover effect style

4. **Add Gallery Items**:
   - Upload images with hotspot support
   - Add titles and descriptions
   - Set categories for filtering
   - Add external links to projects
   - Mark featured items for special treatment

5. **Preview**: Use the preview to see how it will look

### Configuration Options

#### Layout Settings
```typescript
layout: "masonry" | "grid" | "carousel" | "justified"
columns: "auto" | "2" | "3" | "4" | "5" | "6"
spacing: "tight" | "normal" | "relaxed" | "loose"
aspectRatio: "auto" | "square" | "landscape" | "portrait"
```

#### Interaction Settings
```typescript
enableLightbox: boolean
enableCategories: boolean
hoverEffect: "overlay" | "scale" | "fade-zoom" | "none"
```

#### Gallery Item Properties
```typescript
{
  image: SanityImage
  alt: string
  title?: string
  description?: string
  category?: string
  link?: {
    linkType: "internal" | "external"
    externalUrl?: string
    openInNewTab?: boolean
  }
  featured?: boolean
}
```

## 📊 Sample Data

Import the sample data to see the Portfolio Gallery in action:

```bash
npx sanity dataset import portfolio-gallery-sample-data.ndjson
```

This creates a comprehensive demo post showcasing:
- Masonry layout with category filtering
- Grid layout for product showcase
- Carousel layout for featured projects
- All hover effects and interactions

## 🎨 Styling

### Design Principles
- **Modern & Clean**: Minimal borders with subtle shadows
- **Pinterest-inspired**: Natural masonry layouts
- **Professional**: Sophisticated hover effects and transitions
- **Accessible**: Proper ARIA labels and keyboard navigation
- **Responsive**: Seamless experience across all devices

### Theme Integration
- Automatic dark/light mode support
- Consistent with existing design system
- Customizable spacing and colors
- Smooth animations and transitions

## 🔧 Technical Implementation

### File Structure
```
sanity/schemas/blocks/content/
└── portfolio-gallery.ts          # Schema definition

components/blocks/content/
├── portfolio-gallery.tsx         # Main component
└── gallery-shared/
    ├── lightbox.tsx              # Full-screen viewer
    ├── masonry-grid.tsx          # Pinterest-style layout
    ├── gallery-item.tsx          # Individual item component
    └── loading-skeleton.tsx      # Loading states
```

### Key Features
- **TypeScript**: Full type safety throughout
- **Performance**: Lazy loading and image optimization
- **Accessibility**: Screen reader support and keyboard navigation
- **SEO**: Proper image alt tags and semantic markup
- **Mobile**: Touch gestures and responsive design

## 🚀 What's Next

### Phase 2: Video Integration (Coming Soon)
- YouTube/Vimeo embed support
- Direct video upload capability
- Mixed media galleries
- Custom video player with controls

### Phase 3: Advanced Gallery Types
- Product galleries with e-commerce features
- Before/after comparison galleries
- Enhanced interactions (zoom, gestures)
- Advanced filtering and search

### Phase 4: Performance & Polish
- Advanced lazy loading strategies
- Social sharing integration
- Bulk operations in Studio
- Enhanced accessibility features

## 💡 Best Practices

### Content Organization
1. **Use Categories Wisely** - Group related work for easy filtering
2. **Optimize Images** - Use appropriate sizes and formats
3. **Write Good Alt Text** - Essential for accessibility
4. **Featured Items** - Highlight your best work strategically
5. **Consistent Descriptions** - Maintain professional tone

### Performance Tips
1. **Image Optimization** - Use WebP/AVIF when possible
2. **Reasonable Gallery Size** - Consider pagination for 50+ items
3. **Category Balance** - Distribute items across categories evenly
4. **Mobile Testing** - Always test on mobile devices
5. **Loading States** - Ensure smooth user experience

### Design Guidelines
1. **Layout Choice** - Masonry for varied content, grid for consistency
2. **Hover Effects** - Match your brand personality
3. **Spacing** - Use consistent spacing throughout
4. **Color Harmony** - Ensure images work well together
5. **Call-to-Actions** - Include clear project links

## 🐛 Troubleshooting

**Common Issues:**
- **Images not loading**: Check image URLs and permissions
- **Layout issues**: Verify responsive breakpoints
- **Lightbox not opening**: Ensure enableLightbox is true
- **Categories not filtering**: Check category names match exactly
- **Performance issues**: Consider reducing image sizes

**Getting Help:**
- Check browser console for errors
- Verify Sanity schema is properly registered
- Ensure all components are imported correctly
- Test with sample data first

---

The Portfolio Gallery brings professional-grade image showcasing to your content management system. Perfect for portfolios, case studies, product showcases, and any visual storytelling needs.
