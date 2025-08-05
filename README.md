# Airflow AR Viewer 📱

A clean, mobile-optimized AR web application for viewing 3D airflow models using markerless tracking.

## Features ✨

- **Markerless AR**: No markers needed - just point your camera at any flat surface
- **Dual Model Support**: Switch between normal and faulty airflow models
- **Mobile Optimized**: Responsive design for both portrait and landscape orientations
- **Touch Controls**: Intuitive pinch-to-zoom, drag-to-rotate, and tap-to-place
- **Clean UI**: Modern, minimalist design inspired by your reference image
- **Camera Access**: Automatic camera permission handling
- **Cross-Platform**: Works on iOS Safari and Android Chrome

## Models 📦

- `model.glb` - Normal airflow operation model
- `acc4.glb` - Faulty airflow diagnostic model

## Quick Start 🚀

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Server**
   ```bash
   npm start
   ```

3. **Open on Mobile Device**
   - Navigate to `http://your-ip:3000` on your mobile device
   - Allow camera access when prompted
   - Select either "Normal Airflow" or "Faulty Airflow"
   - Point camera at a flat surface to place the 3D model

## Development 🛠️

```bash
# Start with auto-reload
npm run dev

# Check server health
curl http://localhost:3000/health
```

## File Structure 📁

```
ar/
├── index.html          # Landing page with model selection
├── ar-viewer.html      # AR scene with 3D model rendering
├── styles.css          # Clean, mobile-first styling
├── script.js           # Main application logic
├── server.js           # Express server with AR optimizations
├── package.json        # Dependencies and scripts
├── model.glb           # Normal airflow 3D model
├── acc4.glb            # Faulty airflow 3D model
└── README.md           # This file
```

## AR Controls 🎮

### Touch Gestures
- **Single Finger Drag**: Rotate model
- **Pinch**: Zoom in/out
- **Tap**: Place model at surface

### Control Buttons
- **🏠 Reset**: Return model to default position
- **⊞ Ground**: Toggle ground plane visibility
- **ⓘ Info**: Toggle information panel
- **× Close**: Return to model selection

## Technical Details 🔧

### Technologies Used
- **A-Frame**: WebXR framework for 3D/AR experiences
- **AR.js**: Markerless AR tracking library
- **Express.js**: Web server with AR-optimized headers
- **WebGL**: Hardware-accelerated 3D rendering
- **MediaDevices API**: Camera access

### Browser Support
- ✅ iOS Safari 11.3+
- ✅ Android Chrome 67+
- ✅ Samsung Internet 7.2+
- ❌ Desktop browsers (mobile recommended)

### Performance Optimizations
- Efficient 3D model loading
- Touch gesture debouncing
- Automatic quality adjustment
- Memory management for long sessions

## Deployment 🌐

### Local Network Access
```bash
# Find your IP address
ipconfig  # Windows
ifconfig  # Mac/Linux

# Access from mobile: http://YOUR_IP:3000
```

### Production Deployment
- **HTTPS Required**: Camera access requires secure context
- **CORS Headers**: Configured for cross-origin GLB loading
- **Security Headers**: Optimized for WebXR functionality

### Recommended Hosting
- Netlify (with HTTPS)
- Vercel (with HTTPS)
- Firebase Hosting
- Any HTTPS-enabled static host

## Troubleshooting 🔍

### Common Issues

**Camera Access Denied**
- Ensure HTTPS in production
- Check browser permissions
- Try refreshing the page

**Model Not Loading**
- Verify GLB files are in root directory
- Check browser console for errors
- Ensure stable internet connection

**AR Not Working**
- Use supported mobile browser
- Ensure good lighting conditions
- Point camera at textured flat surface

**Performance Issues**
- Close other browser tabs
- Restart browser
- Check available device memory

### Debug Mode
Add `?debug=true` to URL for additional logging:
```
http://localhost:3000/ar?model=normal&debug=true
```

## Customization 🎨

### Adding New Models
1. Place `.glb` file in root directory
2. Update `ar-viewer.html` assets section
3. Add new button in `index.html`
4. Update `script.js` model loading logic

### Styling Changes
- Edit `styles.css` for UI modifications
- Modify color scheme in CSS variables
- Adjust button layouts and animations

### AR Scene Modifications
- Edit `ar-viewer.html` for 3D scene changes
- Adjust model scale, position, rotation
- Modify lighting and environment

## License 📄

MIT License - Feel free to use and modify for your projects.

## Support 💬

For issues or questions:
1. Check browser console for errors
2. Verify camera permissions
3. Test on different mobile devices
4. Ensure HTTPS in production

---

**Note**: This AR experience is optimized for mobile devices. Desktop browsers may have limited functionality.
