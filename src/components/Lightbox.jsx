// import React, { useEffect, useState } from 'react';

// const Lightbox = ({ image, isOpen, onClose, onNext, onPrev, currentIndex, totalImages }) => {
//   const [imageLoaded, setImageLoaded] = useState(false);

//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//       setImageLoaded(false);
//     } else {
//       document.body.style.overflow = 'unset';
//     }

//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isOpen]);

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (!isOpen) return;
      
//       switch (e.key) {
//         case 'Escape':
//           onClose();
//           break;
//         case 'ArrowLeft':
//           onPrev();
//           break;
//         case 'ArrowRight':
//           onNext();
//           break;
//         default:
//           break;
//       }
//     };

//     window.addEventListener('keydown', handleKeyDown);
//     return () => window.removeEventListener('keydown', handleKeyDown);
//   }, [isOpen, onClose, onNext, onPrev]);

//   if (!isOpen || !image) return null;

//   return (
//     <div className="fixed inset-0 z-100 flex items-center justify-center overflow-hidden"
//          style={{
//            backgroundImage: 'url(/images/wall-texture.jpg)',
//            backgroundSize: 'cover',
//            backgroundPosition: 'center',
//            backgroundRepeat: 'no-repeat'
//          }}>
//       {/* Wall Texture Overlay for depth */}
//       <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      
//       {/* Background Overlay */}
//       <div 
//         className="absolute inset-0 bg-transparent cursor-pointer z-10"
//         onClick={onClose}
//       />

//       {/* Responsive Close Button - Positioned Below Navbar */}
//       <button
//         onClick={onClose}
//         className="fixed top-20 right-4 sm:top-24 sm:right-6 md:top-28 md:right-8 lg:top-32 lg:right-10 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/10 hover:bg-white/20 border-2 border-white/20 hover:border-white/40 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300 z-50 touch-manipulation shadow-lg hover:shadow-white/10 safe-area-inset-right safe-area-inset-top"
//         aria-label="Close"
//         title="Close (Press Esc)"
//       >
//         <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
//           <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//         </svg>
//       </button>

//       {/* Navigation Buttons - Fully Responsive Positioning */}
//       <button
//         onClick={onPrev}
//         className="fixed left-2 sm:left-4 md:left-6 lg:left-8 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-40 touch-manipulation safe-area-inset-left"
//         aria-label="Previous"
//       >
//         <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//         </svg>
//       </button>

//       <button
//         onClick={onNext}
//         className="fixed right-2 sm:right-4 md:right-6 lg:right-8 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-40 touch-manipulation safe-area-inset-right"
//         aria-label="Next"
//       >
//         <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//         </svg>
//       </button>

//       {/* Photo Frame Container */}
//       <div className="relative w-full h-full flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-4 sm:py-6 md:py-8 z-20">
//         {/* Photo Frame Wrapper */}
//         <div className="relative flex items-center justify-center" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          
//           {/* Realistic Dark Frame with Sharp Corners & Deep Beveling */}
//           <div className="relative p-4 sm:p-5 md:p-6 shadow-2xl"
//                style={{ 
//                  background: `
//                    linear-gradient(135deg, 
//                      #110B11 0%, #1A1216 15%, #0E090E 25%, #151015 35%, 
//                      #110B11 45%, #1C171C 55%, #110B11 65%, #0F0A0F 75%,
//                      #141014 85%, #110B11 95%, #0D080D 100%
//                    )
//                  `,
//                  boxShadow: `
//                    inset 0 0 0 1px #3A353A,
//                    inset 0 0 0 2px #050205,
//                    inset 0 0 0 4px #2A252A,
//                    inset 0 0 0 5px #0A050A,
//                    inset 4px 4px 16px rgba(0,0,0,0.9),
//                    inset -4px -4px 16px rgba(255,255,255,0.08),
//                    inset 8px 0 24px rgba(0,0,0,0.5),
//                    inset -8px 0 24px rgba(0,0,0,0.5),
//                    inset 0 8px 24px rgba(0,0,0,0.5),
//                    inset 0 -8px 24px rgba(255,255,255,0.03),
//                    0 0 0 2px #050205,
//                    0 16px 48px rgba(0,0,0,0.7),
//                    0 24px 72px rgba(0,0,0,0.5)
//                  `,
//                  border: '2px solid #050205',
//                  borderRadius: '0px',
//                  position: 'relative'
//                }}>
            
//             {/* Outer Beveled Edge */}
//             <div className="absolute -inset-2 border-4"
//                  style={{
//                    borderColor: '#3A353A #050205 #050205 #3A353A',
//                    borderRadius: '0px',
//                    boxShadow: `
//                      2px 2px 6px rgba(0,0,0,0.6),
//                      -2px -2px 6px rgba(255,255,255,0.03)
//                    `
//                  }}></div>
            
//             {/* Inner Beveled Groove */}
//             <div className="absolute inset-3 border-2"
//                  style={{
//                    borderColor: '#050205 #3A353A #3A353A #050205',
//                    borderRadius: '0px',
//                    boxShadow: `
//                      inset 2px 2px 8px rgba(255,255,255,0.05),
//                      inset -2px -2px 8px rgba(0,0,0,0.8)
//                    `
//                  }}></div>
            
//             {/* Deep Center Groove */}
//             <div className="absolute inset-6 border"
//                  style={{
//                    borderColor: '#0A050A #2A252A #2A252A #0A050A',
//                    borderRadius: '0px',
//                    boxShadow: `
//                      inset 1px 1px 4px rgba(255,255,255,0.02),
//                      inset -1px -1px 4px rgba(0,0,0,0.9)
//                    `
//                  }}></div>
            
//             {/* Inner White Matting - Reduced by 30% */}
//             <div className="bg-white p-5 sm:p-8 md:p-11 shadow-inner"
//                  style={{ 
//                    boxShadow: 'inset 0 0 30px rgba(0,0,0,0.1), inset 0 0 50px rgba(0,0,0,0.05)' 
//                  }}>
              
//               {/* Image Container */}
//               <div className="relative bg-white">
//                 {!imageLoaded && (
//                   <div className="absolute inset-0 flex items-center justify-center z-10">
//                     <div className="loading-dots">
//                       <div style={{ '--i': 0 }}></div>
//                       <div style={{ '--i': 1 }}></div>
//                       <div style={{ '--i': 2 }}></div>
//                     </div>
//                   </div>
//                 )}
                
//                 <img
//                   src={image.image}
//                   alt={image.alt || `${image.title || 'Wildlife photography'} - Professional nature photography by Bobby Lohia featuring ${image.category?.toLowerCase()} wildlife from ${image.location}`}
//                   title={image.title || `${image.category} Photography by Bobby Lohia - Professional Wildlife Photographer`}
//                   className={`lightbox-image block max-w-full object-contain mx-auto transition-all duration-500 ${
//                     imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
//                   }`}
//                   style={{ 
//                     maxHeight: 'calc(65vh - 100px)',
//                     maxWidth: 'calc(85vw - 150px)',
//                     minHeight: 'clamp(200px, 30vh, 400px)',
//                     userSelect: 'none',
//                     WebkitUserSelect: 'none'
//                   }}
//                   onLoad={() => setImageLoaded(true)}
//                   draggable="false"
//                   onContextMenu={(e) => e.preventDefault()}
//                   onDragStart={(e) => e.preventDefault()}
//                   onSelectStart={(e) => e.preventDefault()}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Image Info - Compact and Responsive */}
//         <div className={`mt-3 sm:mt-4 md:mt-6 text-center px-4 sm:px-6 max-w-4xl mx-auto transition-all duration-500 delay-300 ${
//           imageLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
//         }`}>
//           <p className="text-sm xs:text-base sm:text-lg text-black/70 mb-1">{image.location}</p>
          
//           {/* Image Counter - Compact */}
//           <div className="mt-2 sm:mt-3 text-xs xs:text-sm text-black/60">
//             {currentIndex + 1} of {totalImages}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Lightbox;








import React, { useEffect, useState } from 'react';

const Lightbox = ({ image, isOpen, onClose, onNext, onPrev, currentIndex, totalImages }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setImageLoaded(false);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrev();
          break;
        case 'ArrowRight':
          onNext();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || !image) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center overflow-hidden"
         style={{
           backgroundImage: 'url(/images/wall-texture.jpg)',
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundRepeat: 'no-repeat'
         }}>
      {/* Wall Texture Overlay for depth */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 bg-transparent cursor-pointer z-10"
        onClick={onClose}
      />

      {/* Responsive Close Button - Positioned Below Navbar */}
      <button
        onClick={onClose}
        className="fixed top-20 right-4 sm:top-24 sm:right-6 md:top-28 md:right-8 lg:top-32 lg:right-10 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/10 hover:bg-white/20 border-2 border-white/20 hover:border-white/40 rounded-full flex items-center justify-center text-white hover:scale-110 transition-all duration-300 z-50 touch-manipulation shadow-lg hover:shadow-white/10 safe-area-inset-right safe-area-inset-top"
        aria-label="Close"
        title="Close (Press Esc)"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Navigation Buttons - Fully Responsive Positioning */}
      <button
        onClick={onPrev}
        className="fixed left-2 sm:left-4 md:left-6 lg:left-8 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-40 touch-manipulation safe-area-inset-left"
        aria-label="Previous"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={onNext}
        className="fixed right-2 sm:right-4 md:right-6 lg:right-8 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-40 touch-manipulation safe-area-inset-right"
        aria-label="Next"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Photo Frame Container */}
      <div className="relative w-full h-full flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-4 sm:py-6 md:py-8 z-20">
        {/* Photo Frame Wrapper */}
        <div className="relative flex items-center justify-center" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          
          {/* Realistic Dark Frame with Sharp Corners & Deep Beveling */}
          <div className="relative p-4 sm:p-5 md:p-6 shadow-2xl"
               style={{ 
                 background: `
                   linear-gradient(135deg, 
                     #110B11 0%, #1A1216 15%, #0E090E 25%, #151015 35%, 
                     #110B11 45%, #1C171C 55%, #110B11 65%, #0F0A0F 75%,
                     #141014 85%, #110B11 95%, #0D080D 100%
                   )
                 `,
                 boxShadow: `
                   inset 0 0 0 1px #3A353A,
                   inset 0 0 0 2px #050205,
                   inset 0 0 0 4px #2A252A,
                   inset 0 0 0 5px #0A050A,
                   inset 4px 4px 16px rgba(0,0,0,0.9),
                   inset -4px -4px 16px rgba(255,255,255,0.08),
                   inset 8px 0 24px rgba(0,0,0,0.5),
                   inset -8px 0 24px rgba(0,0,0,0.5),
                   inset 0 8px 24px rgba(0,0,0,0.5),
                   inset 0 -8px 24px rgba(255,255,255,0.03),
                   0 0 0 2px #050205,
                   0 16px 48px rgba(0,0,0,0.7),
                   0 24px 72px rgba(0,0,0,0.5)
                 `,
                 border: '2px solid #050205',
                 borderRadius: '0px',
                 position: 'relative'
               }}>
            
            {/* Outer Beveled Edge */}
            <div className="absolute -inset-2 border-4"
                 style={{
                   borderColor: '#3A353A #050205 #050205 #3A353A',
                   borderRadius: '0px',
                   boxShadow: `
                     2px 2px 6px rgba(0,0,0,0.6),
                     -2px -2px 6px rgba(255,255,255,0.03)
                   `
                 }}></div>
            
            {/* Inner Beveled Groove */}
            <div className="absolute inset-3 border-2"
                 style={{
                   borderColor: '#050205 #3A353A #3A353A #050205',
                   borderRadius: '0px',
                   boxShadow: `
                     inset 2px 2px 8px rgba(255,255,255,0.05),
                     inset -2px -2px 8px rgba(0,0,0,0.8)
                   `
                 }}></div>
            
            {/* Deep Center Groove */}
            <div className="absolute inset-6 border"
                 style={{
                   borderColor: '#0A050A #2A252A #2A252A #0A050A',
                   borderRadius: '0px',
                   boxShadow: `
                     inset 1px 1px 4px rgba(255,255,255,0.02),
                     inset -1px -1px 4px rgba(0,0,0,0.9)
                   `
                 }}></div>
            
            {/* Inner White Matting - Reduced by 30% */}
            <div className="bg-white p-5 sm:p-8 md:p-11 shadow-inner"
                 style={{ 
                   boxShadow: 'inset 0 0 30px rgba(0,0,0,0.1), inset 0 0 50px rgba(0,0,0,0.05)' 
                 }}>
              
              {/* Image Container */}
              <div className="relative bg-white">
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="loading-dots">
                      <div style={{ '--i': 0 }}></div>
                      <div style={{ '--i': 1 }}></div>
                      <div style={{ '--i': 2 }}></div>
                    </div>
                  </div>
                )}
                
                <img
                  src={image.image}
                  alt={image.alt || `${image.title || 'Wildlife photography'} - Professional nature photography by Bobby Lohia featuring ${image.category?.toLowerCase()} wildlife from ${image.location}`}
                  title={image.title || `${image.category} Photography by Bobby Lohia - Professional Wildlife Photographer`}
                  className={`lightbox-image block max-w-full object-contain mx-auto transition-all duration-500 ${
                    imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                  style={{ 
                    maxHeight: 'calc(65vh - 100px)',
                    maxWidth: 'calc(85vw - 150px)',
                    minHeight: 'clamp(200px, 30vh, 400px)',
                    userSelect: 'none',
                    WebkitUserSelect: 'none'
                  }}
                  onLoad={() => setImageLoaded(true)}
                  draggable="false"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                  onSelectStart={(e) => e.preventDefault()}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Image Info - Compact and Responsive */}
        <div className={`mt-3 sm:mt-4 md:mt-6 text-center px-4 sm:px-6 max-w-4xl mx-auto transition-all duration-500 delay-300 ${
          imageLoaded ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
        }`}>
          <p className="text-sm xs:text-base sm:text-lg text-black/70 mb-1">{image.location}</p>
          
          {/* Image Counter - Compact */}
          <div className="mt-2 sm:mt-3 text-xs xs:text-sm text-black/60">
            {currentIndex + 1} of {totalImages}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lightbox;