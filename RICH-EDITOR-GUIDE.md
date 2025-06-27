# Rich Editor Features Guide

This guide covers the new Tier 1 rich editor features that have been added to enhance your technical content creation experience.

## 🎯 Overview

The rich editor now includes four powerful new content blocks designed specifically for technical case studies, blogs, and documentation:

1. **Callouts** - Highlight important information with styled alert boxes
2. **Toggle Sections** - Create collapsible content areas
3. **Interactive Buttons** - Add call-to-action buttons with navigation
4. **Tabs** - Organize related content in tabbed interfaces

## 📝 Content Blocks

### 1. Callout Components

Perfect for highlighting important information, warnings, tips, and notes.

**Available Types:**
- `info` - Blue styling for general information
- `warning` - Yellow styling for warnings and cautions
- `success` - Green styling for positive messages
- `error` - Red styling for errors and critical issues
- `tip` - Purple styling for helpful tips
- `note` - Gray styling for general notes

**Features:**
- Optional title
- Rich text content support
- Dismissible option (users can close the callout)
- Responsive design with proper color contrast

**Use Cases:**
- API warnings and important notes
- Success stories and achievements
- Pro tips and best practices
- Error handling instructions

### 2. Toggle Sections

Great for organizing content that users can expand when needed.

**Available Styles:**
- `default` - Standard bordered container
- `bordered` - Enhanced border with shadow
- `minimal` - Clean, minimal styling

**Features:**
- Clickable title to expand/collapse
- Smooth animation transitions
- Default open/closed state
- Rich text content support
- Accessible keyboard navigation

**Use Cases:**
- "Show Code" examples
- FAQ sections
- Troubleshooting guides
- Advanced configuration options

### 3. Interactive Buttons

Add call-to-action buttons to guide readers to important resources.

**Button Variants:**
- `default` - Primary button styling
- `secondary` - Secondary button styling
- `outline` - Outlined button
- `ghost` - Minimal ghost button
- `destructive` - Red destructive button

**Button Sizes:**
- `sm` - Small button
- `default` - Standard size
- `lg` - Large button

**Features:**
- Link to pages, posts, or external URLs
- Full width option
- Alignment control (left, center, right)
- Automatic loading states
- Target control for external links

**Use Cases:**
- "View Live Demo" buttons
- "Download Source Code" links
- "Try It Now" call-to-actions
- Navigation to related content

### 4. Tabbed Content

Organize related content into tabs for better user experience.

**Tab Styles:**
- `default` - Standard tabs with borders
- `pills` - Pill-shaped tab buttons
- `underline` - Minimal tabs with underline

**Features:**
- Multiple tabs with rich content
- Optional icons from Lucide React
- Default active tab setting
- Responsive design
- Keyboard navigation support

**Use Cases:**
- Multi-language code examples
- Before/after comparisons
- Different framework implementations
- Step-by-step processes

## 🚀 How to Use

### In Sanity Studio

1. **Create/Edit a Post**: Go to your post editor in Sanity Studio
2. **Add Content Block**: Click the "+" button in the editor
3. **Select Block Type**: Choose from Callout, Toggle, Button, or Tabs
4. **Configure Settings**: Fill in the required fields and options
5. **Add Content**: Use the rich text editor for content areas
6. **Preview**: Use the preview to see how it will look

### Content Creation Tips

**For Technical Content:**
- Use **Callouts** for important warnings and tips
- Use **Toggles** for optional code examples and troubleshooting
- Use **Buttons** for demo links and source code
- Use **Tabs** for multi-language examples

**For Case Studies:**
- Use **Callouts** for key insights and results
- Use **Toggles** for detailed methodology
- Use **Buttons** for project links and demos
- Use **Tabs** for different phases or approaches

## 📊 Sample Data

Import the sample data to see all features in action:

```bash
npx sanity dataset import rich-editor-sample-data.ndjson
```

This creates a demo post showcasing all the new rich editor features with practical examples.

## 🎨 Styling

All components are fully styled with:
- **Dark/Light Mode Support** - Automatic theme switching
- **Responsive Design** - Works on all screen sizes
- **Accessibility** - Proper ARIA labels and keyboard navigation
- **Smooth Animations** - Professional transitions and interactions

## 🔧 Technical Details

### Dependencies Added
- Components use existing UI library (no new dependencies required)
- Lucide React icons for consistent iconography
- Framer Motion for smooth animations (when available)

### File Structure
```
sanity/schemas/blocks/content/
├── callout.ts          # Callout schema
├── toggle.ts           # Toggle schema
├── button.ts           # Button schema
└── tabs.ts             # Tabs schema

components/blocks/content/
├── callout.tsx         # Callout component
├── toggle.tsx          # Toggle component
├── button.tsx          # Button component
└── tabs.tsx            # Tabs component
```

### Integration
- All components are integrated into the Portable Text renderer
- Automatic type safety with TypeScript
- Consistent styling with your existing design system

## 🚀 What's Next?

**Tier 2 Features Coming Soon:**
- Enhanced tables with sorting
- Charts and data visualization
- Math equations with KaTeX
- Mermaid diagrams
- Social media embeds

**Tier 3 Advanced Features:**
- Live code editors
- Interactive demos
- Form embeds
- Advanced typography controls

## 💡 Best Practices

1. **Use Callouts Sparingly** - Too many can overwhelm readers
2. **Organize with Toggles** - Keep long content collapsible
3. **Strategic Button Placement** - Guide users to important actions
4. **Logical Tab Organization** - Group related content together
5. **Consistent Styling** - Stick to one style per content type

## 🐛 Troubleshooting

**Common Issues:**
- **Icons not showing in tabs**: Check icon name spelling (use Lucide React names)
- **Buttons not working**: Verify link configuration and URL format
- **Styling issues**: Ensure proper theme configuration
- **Content not rendering**: Check for proper content structure in Sanity

**Getting Help:**
- Check browser console for errors
- Verify Sanity schema is properly registered
- Ensure all components are imported correctly

---

This rich editor enhancement brings your technical content to life with interactive, engaging components that improve user experience and content organization.
