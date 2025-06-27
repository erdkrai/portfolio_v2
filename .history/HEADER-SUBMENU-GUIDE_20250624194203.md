# Header Submenu Implementation Guide

This guide explains how to add and configure submenu items (dropdown navigation) in the header navigation.

## Overview

The header navigation now supports multi-level navigation with dropdown submenus. This allows you to organize navigation items hierarchically, making it easier for users to find specific pages or sections.

## Features

### Desktop Navigation
- **Hover-activated dropdowns**: Submenus appear when hovering over parent navigation items
- **Smooth animations**: Dropdowns fade in/out with smooth transitions
- **Visual indicators**: Chevron icons indicate items with submenus
- **Rich content**: Support for descriptions under submenu items
- **Responsive positioning**: Dropdowns are properly positioned and styled

### Mobile Navigation
- **Expandable sections**: Tap to expand/collapse submenu items
- **Accordion-style**: Clean accordion interface for mobile devices
- **Touch-friendly**: Large touch targets for mobile interaction
- **Nested structure**: Clear visual hierarchy with indentation

## Schema Configuration

### Navigation Link Structure

Each navigation link can now include submenu items:

```typescript
{
  label: "Services",           // Main navigation label
  href: "",                   // Leave empty for items with submenus
  target: false,              // Open in new tab
  submenuItems: [             // Array of submenu items
    {
      label: "Web Development",
      href: "/services/web-development",
      target: false,
      description: "Custom websites and web applications"
    }
  ]
}
```

### Key Fields

- **label**: The text displayed for the navigation item
- **href**: URL for the navigation item (leave empty if it has submenu items)
- **target**: Whether to open links in a new tab
- **submenuItems**: Array of submenu items
  - **label**: Submenu item text
  - **href**: Submenu item URL (required)
  - **target**: Open in new tab option
  - **description**: Optional description text shown below the label

## Content Management

### Adding Submenu Items

1. **Navigate to Header Settings** in Sanity Studio
2. **Go to Navigation tab**
3. **Edit or add a Navigation Link**
4. **Add Submenu Items**:
   - Click "Add item" in the Submenu Items section
   - Fill in the label, URL, and optional description
   - Set target if the link should open in a new tab
   - Repeat for additional submenu items

### Best Practices

#### Content Organization
- **Group related pages** under logical parent categories
- **Use clear, descriptive labels** for both main items and submenu items
- **Add helpful descriptions** to clarify what each submenu item contains
- **Limit submenu depth** to one level for better usability

#### Navigation Structure
- **Keep main navigation simple** with 5-7 top-level items
- **Use submenus for secondary pages** that don't need top-level visibility
- **Consider user journey** when organizing menu structure
- **Test on mobile devices** to ensure good user experience

## Sample Data

Import the sample data to see submenu functionality in action:

```bash
npx sanity dataset import header-submenu-sample-data.ndjson
```

This sample includes:
- **Services** submenu with Web Development, Mobile Apps, UI/UX Design, and Consulting
- **Portfolio** submenu with Recent Projects, Web Projects, Mobile Projects, and Design Work
- Regular navigation items for Home, Blog, About, and Contact

## Technical Implementation

### Component Structure

The submenu functionality is implemented across several components:

1. **Header Schema** (`sanity/schemas/documents/header.ts`)
   - Defines the submenu structure in Sanity
   - Includes validation and preview configuration

2. **Header Query** (`sanity/queries/header.ts`)
   - Fetches navigation data including submenu items
   - Includes all necessary fields for rendering

3. **Desktop Navigation** (`components/header/desktop-nav.tsx`)
   - Hover-activated dropdown menus
   - Smooth animations and transitions
   - Proper accessibility attributes

4. **Mobile Navigation** (`components/header/mobile-nav.tsx`)
   - Expandable accordion-style navigation
   - Touch-friendly interface
   - Nested structure with visual hierarchy

### Styling Features

- **Consistent theming** with your site's design system
- **Responsive design** that works on all screen sizes
- **Smooth animations** for better user experience
- **Accessibility support** with proper ARIA attributes
- **Dark/light mode compatibility**

## Customization Options

### Visual Customization

You can customize the appearance by modifying the CSS classes in the navigation components:

- **Dropdown width**: Adjust the `w-64` class in desktop navigation
- **Animation timing**: Modify transition duration classes
- **Colors and spacing**: Update background, text, and padding classes
- **Mobile layout**: Adjust spacing and typography in mobile navigation

### Behavioral Customization

- **Hover vs Click**: Desktop navigation uses hover by default, but can be changed to click
- **Animation speed**: Adjust transition durations for faster/slower animations
- **Mobile breakpoint**: Configure when mobile navigation appears
- **Auto-close behavior**: Customize when dropdowns close automatically

## Accessibility

The submenu implementation includes proper accessibility features:

- **ARIA attributes** for screen readers
- **Keyboard navigation** support
- **Focus management** for dropdown interactions
- **Semantic HTML** structure
- **High contrast** support for better visibility

## Troubleshooting

### Common Issues

1. **Submenu not appearing**
   - Check that submenuItems array has content
   - Verify the navigation query includes submenu fields
   - Ensure proper hover/click event handling

2. **Mobile navigation not expanding**
   - Check that click handlers are properly attached
   - Verify state management for expanded items
   - Test touch events on actual mobile devices

3. **Styling issues**
   - Verify CSS classes are properly applied
   - Check for conflicting styles
   - Test in different browsers and screen sizes

### Performance Considerations

- **Lazy loading**: Submenu content is only rendered when needed
- **Efficient state management**: Minimal re-renders on interaction
- **Optimized animations**: Hardware-accelerated CSS transitions
- **Mobile optimization**: Touch-friendly interactions without delays

## Future Enhancements

Potential improvements for the submenu system:

- **Multi-level nesting**: Support for deeper menu hierarchies
- **Mega menus**: Large dropdown menus with rich content
- **Icons**: Support for icons in navigation items
- **Search integration**: Quick search within navigation
- **Analytics**: Track navigation usage patterns
