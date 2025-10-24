# Video Assets

Place your video files in this directory to use them as hero backgrounds.

## Required Videos

1. **water-rafting.mp4** - Water rafting adventure footage
2. **jungle-safari.mp4** - Jungle safari and wildlife footage  
3. **forest-camp.mp4** - Forest camping and nature footage

## Video Specifications

For best performance and quality:
- **Format**: MP4 (H.264 codec)
- **Resolution**: 1920x1080 (Full HD) or higher
- **Aspect Ratio**: 16:9
- **File Size**: Compress to under 10MB per video for fast loading
- **Duration**: 10-30 seconds (looping videos work best)
- **Framerate**: 24-30 fps

## Compression Tips

Use tools like HandBrake or FFmpeg to compress videos:

```bash
ffmpeg -i input.mp4 -vcodec h264 -acodec aac -b:v 2M -b:a 128k output.mp4
```

## Fallback Images

If videos are not found or fail to load, the hero section will automatically fall back to high-quality stock images.
