# Video File Instructions

To add your wildlife video to the Contact page hero section:

1. Place your video file in this `/public` directory
2. Name it something like `wildlife-hero.mp4` or `nature-background.mp4`
3. Update the video source path in `/src/pages/Contact.jsx` line ~105:
   ```jsx
   <source src="/your-video-filename.mp4" type="video/mp4" />
   ```

## Recommended Video Specifications:
- Format: MP4 (H.264)
- Resolution: 1920x1080 or higher
- Duration: 10-30 seconds (will loop automatically)
- File size: Under 10MB for optimal loading
- Content: Wildlife/nature scenes with smooth, slow motion if possible
- No audio needed (video will be muted)

## Video Guidelines:
- Choose footage with subtle movement (flowing water, gentle wind in trees, slow animal movements)
- Avoid jerky camera movements or quick cuts
- Ensure good contrast so white text remains readable
- Consider scenes with darker areas where text overlay will appear

The current fallback image is a beautiful forest landscape that will display while the video loads or if video is not supported.