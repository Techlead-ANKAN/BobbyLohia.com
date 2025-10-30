import React, { useEffect } from 'react';

const ImageProtection = ({ children }) => {
  useEffect(() => {
    // Additional runtime protection
    const preventActions = (e) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    // Enhanced image protection
    const protectImages = () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        // Disable all interaction methods
        img.addEventListener('contextmenu', preventActions);
        img.addEventListener('dragstart', preventActions);
        img.addEventListener('selectstart', preventActions);
        img.addEventListener('mousedown', preventActions);
        img.addEventListener('touchstart', preventActions);
        
        // Set attributes
        img.setAttribute('draggable', 'false');
        img.setAttribute('unselectable', 'on');
        img.style.userSelect = 'none';
        img.style.webkitUserSelect = 'none';
        img.style.webkitTouchCallout = 'none';
        img.style.webkitUserDrag = 'none';
        img.style.pointerEvents = 'none';
        
        // Remove any download attributes
        img.removeAttribute('download');
      });
    };

    // Run protection on mount and DOM changes
    protectImages();
    
    // Observer for new images
    const observer = new MutationObserver(() => {
      setTimeout(protectImages, 100);
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Console protection
    const devtools = {
      open: false,
      orientation: null
    };

    const threshold = 160;

    setInterval(() => {
      if (window.outerHeight - window.innerHeight > threshold || 
          window.outerWidth - window.innerWidth > threshold) {
        if (!devtools.open) {
          devtools.open = true;
          console.clear();
          console.log('%c🚫 STOP!', 'color: red; font-size: 50px; font-weight: bold; text-shadow: 3px 3px 0 rgba(0,0,0,0.1);');
          console.log('%c⚠️ This is a browser security feature intended for developers only.', 'color: red; font-size: 16px;');
          console.log('%c📸 All images are protected by copyright law.', 'color: orange; font-size: 14px;');
          console.log('%c© 2024 Bobby Lohia Photography - All Rights Reserved', 'color: #333; font-size: 12px; font-weight: bold;');
        }
      } else {
        devtools.open = false;
      }
    }, 500);

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      onContextMenu={(e) => {
        // Only prevent context menu on images, not on buttons
        if (e.target.tagName === 'IMG') {
          e.preventDefault();
        }
      }}
      onSelectStart={(e) => {
        // Only prevent selection on images, not on buttons
        if (e.target.tagName === 'IMG') {
          e.preventDefault();
        }
      }}
      onDragStart={(e) => {
        // Only prevent drag on images, not on buttons
        if (e.target.tagName === 'IMG') {
          e.preventDefault();
        }
      }}
      style={{ userSelect: 'none', webkitUserSelect: 'none' }}
    >
      {children}
    </div>
  );
};

export default ImageProtection;