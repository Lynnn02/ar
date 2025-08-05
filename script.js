// Main application logic
function startAR(modelType) {
    // Check if device supports AR
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('Your device does not support camera access. Please use a modern mobile browser.');
        return;
    }
    
    // Request camera permission
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            // Stop the stream immediately as AR.js will handle camera access
            stream.getTracks().forEach(track => track.stop());
            
            // Navigate to AR viewer with model parameter
            window.location.href = `ar-viewer.html?model=${modelType}`;
        })
        .catch(function(error) {
            console.error('Camera access denied:', error);
            alert('Camera access is required for AR functionality. Please allow camera access and try again.');
        });
}

// Check for device orientation support
function checkDeviceSupport() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (!isMobile) {
        showDesktopWarning();
    }
    
    // Check for WebGL support
    if (!window.WebGLRenderingContext) {
        alert('Your device does not support WebGL, which is required for AR functionality.');
        return false;
    }
    
    return true;
}

function showDesktopWarning() {
    const warningDiv = document.createElement('div');
    warningDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: #ff9800;
        color: white;
        padding: 10px;
        text-align: center;
        font-size: 14px;
        z-index: 1000;
    `;
    warningDiv.innerHTML = '⚠️ This AR experience is optimized for mobile devices. Please open on your smartphone for the best experience.';
    document.body.appendChild(warningDiv);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        warningDiv.style.display = 'none';
    }, 5000);
}

// Handle orientation changes
function handleOrientationChange() {
    // Force a small delay to allow the browser to adjust
    setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
    }, 100);
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    // Check device support
    checkDeviceSupport();
    
    // Handle orientation changes
    window.addEventListener('orientationchange', handleOrientationChange);
    
    // Add touch feedback to buttons
    const buttons = document.querySelectorAll('.ar-button');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
    
    // Prevent zoom on double tap
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Add loading animation
    addLoadingAnimation();
});

function addLoadingAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { opacity: 0.6; }
            50% { opacity: 1; }
            100% { opacity: 0.6; }
        }
        
        .ar-button:active {
            animation: pulse 0.3s ease-in-out;
        }
        
        .loading-spinner {
            border: 3px solid #f3f3f3;
            border-top: 3px solid #667eea;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            animation: spin 1s linear infinite;
            margin: 0 auto 10px;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

// Service Worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(error) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Error handling
window.addEventListener('error', function(event) {
    console.error('Application error:', event.error);
    
    // Show user-friendly error message
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(220, 53, 69, 0.9);
        color: white;
        padding: 20px;
        border-radius: 10px;
        text-align: center;
        z-index: 2000;
        max-width: 300px;
    `;
    errorDiv.innerHTML = `
        <h3>Oops! Something went wrong</h3>
        <p>Please refresh the page and try again.</p>
        <button onclick="location.reload()" style="
            background: white;
            color: #dc3545;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            margin-top: 10px;
            cursor: pointer;
        ">Refresh Page</button>
    `;
    document.body.appendChild(errorDiv);
    
    // Auto-hide after 10 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 10000);
});

// Performance monitoring
let performanceMetrics = {
    loadTime: 0,
    arInitTime: 0
};

window.addEventListener('load', function() {
    performanceMetrics.loadTime = performance.now();
    console.log(`Page loaded in ${performanceMetrics.loadTime.toFixed(2)}ms`);
});

// Export functions for global access
window.startAR = startAR;
