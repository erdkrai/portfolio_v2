# CMS-Configurable Auto-Scroll Carousel Guide

## Overview
Your carousels now have fully CMS-configurable auto-scroll functionality that allows content editors to control automatic slide advancement, timing, and user interaction behaviors through the Sanity Studio.

## 🎯 Features Implemented

### **Auto-Scroll Settings**
- **Enable/Disable**: Toggle auto-scroll on/off for each carousel
- **Scroll Interval**: Choose timing from 2-10 seconds between slides
- **Pause on Hover**: Auto-pause when users hover over carousel
- **Stop on Interaction**: Permanently stop auto-scroll after manual navigation

### **Carousel Types Enhanced**
- **Carousel 1 (Images)**: Auto-scroll for image galleries
- **Carousel 2 (Testimonials)**: Auto-scroll for testimonial rotations

### **User Experience Features**
- **Infinite Loop**: Automatically returns to first slide after last slide
- **Smooth Transitions**: Professional slide transitions with proper timing
- **Accessibility Maintained**: Screen readers and keyboard navigation preserved
- **Performance Optimized**: Efficient timers with proper cleanup

## 🚀 How to Use

### **1. Access Sanity Studio**
- Go to `http://localhost:3001/studio`
- Edit any page with carousel blocks
- Look for "Auto-Scroll Settings" section (collapsible)

### **2. Configure Auto-Scroll**
**Enable Auto-Scroll:**
- Toggle "Enable Auto-Scroll" to activate automatic slide advancement

**Set Scroll Interval:**
- Choose timing between slides:
  - **0.5 seconds**: Ultra-fast, high-energy content
  - **1 second**: Very fast, dynamic presentations
  - **1.5 seconds**: Fast-paced, attention-grabbing
  - **2 seconds**: Quick rotation (default for images)
  - **2.5 seconds**: Balanced speed (default for testimonials)
  - **3 seconds**: Moderate pace for most content
  - **4 seconds**: Slower, good for detailed content

**Pause on Hover:**
- **Enabled (default)**: Auto-scroll pauses when user hovers
- **Disabled**: Continues scrolling even when hovering

**Stop on Manual Navigation:**
- **Disabled (default)**: Resumes auto-scroll after user interaction
- **Enabled**: Permanently stops auto-scroll after user manually navigates

## 🎨 Configuration Examples

### **Marketing/Hero Carousel**
```
✅ Enable Auto-Scroll: true
✅ Interval: 4 seconds
✅ Pause on Hover: true
✅ Stop on Interaction: false
```
*Perfect for hero sections with engaging visuals*

### **Testimonials Carousel**
```
✅ Enable Auto-Scroll: true
✅ Interval: 6 seconds
✅ Pause on Hover: true
✅ Stop on Interaction: false
```
*Gives users time to read testimonials*

### **Product Gallery**
```
✅ Enable Auto-Scroll: true
✅ Interval: 3 seconds
✅ Pause on Hover: true
✅ Stop on Interaction: true
```
*Stops when users want to examine products*

### **Background Slideshow**
```
✅ Enable Auto-Scroll: true
✅ Interval: 8 seconds
✅ Pause on Hover: false
✅ Stop on Interaction: false
```
*Continuous background rotation*

## 🔧 Technical Implementation

### **Components Enhanced**
- `components/blocks/carousel/carousel-1.tsx` - Image carousel with auto-scroll
- `components/blocks/carousel/carousel-2.tsx` - Testimonial carousel with auto-scroll
- `components/hooks/use-auto-scroll.tsx` - Auto-scroll logic hook

### **Schema Updates**
- `sanity/schemas/blocks/carousel/carousel-1.ts` - Auto-scroll settings
- `sanity/schemas/blocks/carousel/carousel-2.ts` - Auto-scroll settings

### **Query Updates**
- `sanity/queries/carousel/carousel-1.ts` - Fetch auto-scroll config
- `sanity/queries/carousel/carousel-2.ts` - Fetch auto-scroll config

### **Auto-Scroll Logic**
```typescript
// Intelligent auto-scroll behavior
- Respects user hover states
- Handles manual interaction preferences
- Infinite loop with smooth transitions
- Proper cleanup on component unmount
- Performance optimized with useCallback
```

## 🎯 User Interaction Behaviors

### **Hover Behavior (when enabled)**
- **Mouse Enter**: Auto-scroll pauses immediately
- **Mouse Leave**: Auto-scroll resumes from current position
- **Touch Devices**: Automatically handled for mobile users

### **Manual Navigation**
- **Arrow Buttons**: Users can manually navigate slides
- **Dot Indicators**: Click to jump to specific slides
- **Keyboard**: Arrow keys work for accessibility

### **Stop on Interaction (when enabled)**
- **Manual Navigation**: Permanently stops auto-scroll
- **User Intent**: Respects user's desire to control navigation
- **One-Time Stop**: Cannot be re-enabled without page refresh

## 📊 Sample Data

Import sample carousel configurations:
```bash
npx sanity dataset import carousel-auto-scroll-sample.ndjson
```

This includes:
- **Image Carousel**: 4-second auto-scroll with hover pause
- **Testimonial Carousel**: 5-second auto-scroll with hover pause

## 🎨 Best Practices

### **Timing Guidelines**
- **2-3 seconds**: Dynamic, attention-grabbing content
- **4-5 seconds**: Standard content, good balance
- **6-8 seconds**: Text-heavy content, testimonials
- **8-10 seconds**: Detailed content requiring reading time

### **User Experience**
- **Always enable "Pause on Hover"** for better UX
- **Use "Stop on Interaction"** for product galleries
- **Avoid very fast intervals** (under 3 seconds) for text content
- **Consider accessibility** - some users need more time

### **Content Types**
- **Images**: 3-4 seconds works well
- **Testimonials**: 5-6 seconds for reading
- **Product Features**: 4-5 seconds with stop on interaction
- **Background Slides**: 6-8 seconds for ambient effect

## 🚀 Benefits

✅ **Complete CMS Control**: Manage auto-scroll without code changes  
✅ **User-Friendly**: Respects user interactions and preferences  
✅ **Performance Optimized**: Efficient timers with proper cleanup  
✅ **Accessibility Maintained**: Screen readers and keyboard navigation  
✅ **Mobile Friendly**: Touch-friendly with proper pause behaviors  
✅ **Professional Behaviors**: Infinite loop, smooth transitions  
✅ **Flexible Configuration**: 7 timing options + behavior controls  
✅ **Content-Aware**: Different defaults for different carousel types  

## 🔄 Advanced Features

### **Infinite Loop**
- Automatically cycles from last slide back to first
- Smooth transition without jarring jumps
- Maintains user orientation

### **Smart Pause Logic**
- Pauses during hover for better readability
- Resumes seamlessly when hover ends
- Handles multiple interaction types

### **Performance Optimization**
- Efficient interval management
- Proper cleanup prevents memory leaks
- Uses React hooks best practices

Your carousels now provide a professional, user-friendly auto-scroll experience that's completely manageable through the CMS!
