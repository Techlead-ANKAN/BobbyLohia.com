// import React, { useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navigation from './components/Navigation';
// import Footer from './components/Footer';
// import MouseTracker from './components/MouseTracker';
// import ImageProtection from './components/ImageProtection';
// import Home from './pages/Home';
// import Gallery from './pages/Gallery';
// import Albums from './pages/Albums';
// import AlbumDetail from './pages/AlbumDetail';
// import Contact from './pages/Contact';
// import NotFound from './pages/NotFound';

// import { trackPageView } from './utils/analytics';
// import { useLocation } from 'react-router-dom';

// function App() {
//   useEffect(() => {
//     const originalTitle = document.title;
//     const awayMessages = [
//       "Missing the wild already? 🦁",
//       "Come back to explore nature! 📸",
//       "The wilderness awaits your return 🌿",
//       "Don't leave the safari behind! 🐅",
//       "Return to the wild side 🦅"
//     ];
    
//     const handleVisibilityChange = () => {
//       if (document.hidden) {
//         // User switched away from tab
//         const randomMessage = awayMessages[Math.floor(Math.random() * awayMessages.length)];
//         document.title = randomMessage;
//       } else {
//         // User returned to tab
//         document.title = originalTitle;
//       }
//     };

//     document.addEventListener('visibilitychange', handleVisibilityChange);
    
//     // Cleanup
//     return () => {
//       document.removeEventListener('visibilitychange', handleVisibilityChange);
//       document.title = originalTitle;
//     };

//     const location = useLocation();

//     useEffect(() => {
//     trackPageView(location.pathname);
//   }, [location]);

//   }, []);
//   return (
//     <ImageProtection>
//       <Router>
//         <div className="min-h-screen bg-black text-white">
//           <MouseTracker />
//           <Navigation />
//           <main className="relative z-10">
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/gallery" element={<Gallery />} />
//               <Route path="/albums" element={<Albums />} />
//               <Route path="/albums/:albumId" element={<AlbumDetail />} />
//               <Route path="/contact" element={<Contact />} />
//               <Route path="*" element={<NotFound />} />
//             </Routes>
//           </main>
//           <Footer />
//         </div>
//       </Router>
//     </ImageProtection>
//   );
// }

// export default App;



import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import MouseTracker from './components/MouseTracker';
import ImageProtection from './components/ImageProtection';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Albums from './pages/Albums';
import AlbumDetail from './pages/AlbumDetail';
import Contact from './pages/Contact';
import ProfessionalAdminPanel from './pages/AdminPanel_pro';
import NotFound from './pages/NotFound';
import { trackPageView } from './utils/analytics';

// Component to handle page tracking
function PageTracker() {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return null;
}

function App() {
  useEffect(() => {
    const originalTitle = document.title;
    const awayMessages = [
      "Missing the wild already? 🦁",
      "Come back to explore nature! 📸",
      "The wilderness awaits your return 🌿",
      "Don't leave the safari behind! 🐅",
      "Return to the wild side 🦅"
    ];
    
    const handleVisibilityChange = () => {
      if (document.hidden) {
        const randomMessage = awayMessages[Math.floor(Math.random() * awayMessages.length)];
        document.title = randomMessage;
      } else {
        document.title = originalTitle;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.title = originalTitle;
    };
  }, []);

  return (
    <Router>
      <PageTracker />
      <Routes>
        {/* Admin Panel - Completely Separate */}
        <Route path="/admin" element={<ProfessionalAdminPanel />} />
        
        {/* Main Website Routes */}
        <Route path="/*" element={
          <ImageProtection>
            <div className="min-h-screen bg-black text-white">
              <MouseTracker />
              <Navigation />
              <main className="relative z-10">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/albums" element={<Albums />} />
                  <Route path="/albums/:albumId" element={<AlbumDetail />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </ImageProtection>
        } />
      </Routes>
    </Router>
  );
}

export default App;