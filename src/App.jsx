import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import MouseTracker from './components/MouseTracker';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Albums from './pages/Albums';
import AlbumDetail from './pages/AlbumDetail';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

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
        // User switched away from tab
        const randomMessage = awayMessages[Math.floor(Math.random() * awayMessages.length)];
        document.title = randomMessage;
      } else {
        // User returned to tab
        document.title = originalTitle;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.title = originalTitle;
    };
  }, []);
  return (
    <Router>
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
    </Router>
  );
}

export default App;
