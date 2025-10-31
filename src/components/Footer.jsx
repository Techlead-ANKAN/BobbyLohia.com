// import React from 'react';
// import { Link } from 'react-router-dom';

// const Footer = () => {
//   return (
//     <footer className="relative overflow-hidden bg-black text-white border-t border-white/10">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-12">
          
//           <div className="sm:col-span-2 lg:col-span-2">
//             <h3 className="text-2xl sm:text-3xl font-mangro font-bold text-white mb-4 sm:mb-6">
//               Bobby Lohia
//             </h3>
//             <p className="text-white/70 font-mangro mb-6 sm:mb-8 max-w-md leading-relaxed text-sm sm:text-base">
//               Wildlife photographer with over 15 years of experience capturing 
//               the raw beauty and intimate moments of nature across multiple continents.
//             </p>
//             {/* <div className="flex space-x-3 sm:space-x-4">
//               <a
//                 href="#"
//                 className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center text-white 
//                          hover:bg-white/20 hover:scale-110 transition-all duration-500 touch-manipulation"
//                 aria-label="Instagram"
//               >
//                 <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
//                 </svg>
//               </a>
//               <a
//                 href="#"
//                 className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center text-white 
//                          hover:bg-white/20 hover:scale-110 transition-all duration-500 touch-manipulation"
//                 aria-label="Twitter"
//               >
//                 <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
//                 </svg>
//               </a>
//               <a
//                 href="#"
//                 className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center text-white 
//                          hover:bg-white/20 hover:scale-110 transition-all duration-500 touch-manipulation"
//                 aria-label="LinkedIn"
//               >
//                 <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
//                 </svg>
//               </a>
//             </div> */}
//           </div>

//           <div>
//             <h4 className="text-lg sm:text-xl font-mangro font-bold text-white mb-4 sm:mb-6">
//               Navigation
//             </h4>
//             <ul className="space-y-2 sm:space-y-3">
//               <li>
//                 <Link to="/" className="text-white/70 hover:text-white font-mangro transition-all duration-300 hover:translate-x-1 inline-block text-sm sm:text-base touch-manipulation">
//                   Home
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/gallery" className="text-white/70 hover:text-white font-mangro transition-all duration-300 hover:translate-x-1 inline-block text-sm sm:text-base touch-manipulation">
//                   Gallery
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/albums" className="text-white/70 hover:text-white font-mangro transition-all duration-300 hover:translate-x-1 inline-block text-sm sm:text-base touch-manipulation">
//                   Albums
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/contact" className="text-white/70 hover:text-white font-mangro transition-all duration-300 hover:translate-x-1 inline-block text-sm sm:text-base touch-manipulation">
//                   Contact
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           <div>
//             <h4 className="text-lg sm:text-xl font-mangro font-bold text-white mb-4 sm:mb-6">
//               Get In Touch
//             </h4>
//             <div className="space-y-2 sm:space-y-3">
//               <a href="mailto:plohia@yahoo.com" className="block text-white/70 hover:text-white font-mangro transition-colors duration-300 text-sm sm:text-base break-words touch-manipulation">
//                 bobbylohia@gmail.com
//               </a>
//               <a href="tel:+919831255000" className="block text-white/70 hover:text-white font-mangro transition-colors duration-300 text-sm sm:text-base touch-manipulation">
//                 +91 70038 42077
//               </a>
//               <p className="text-white/70 font-mangro text-sm sm:text-base">Kolkata, India</p>
//             </div>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-t border-white/10">
//           <div className="text-center">
//             <div className="text-3xl font-mangro font-bold text-white mb-2">15+</div>
//             <div className="text-sm text-white/60 font-mangro">Years Experience</div>
//           </div>
//           <div className="text-center">
//             <div className="text-3xl font-mangro font-bold text-white mb-2">50+</div>
//             <div className="text-sm text-white/60 font-mangro">Countries Visited</div>
//           </div>
//           <div className="text-center">
//             <div className="text-3xl font-mangro font-bold text-white mb-2">10000+</div>
//             <div className="text-sm text-white/60 font-mangro">Photos Captured</div>
//           </div>
//         </div>

//         {/* Copyright */}
//         <div className="text-center pt-8 border-t border-white/10">
//           <p className="text-white/60 font-mangro">
//             &copy; {new Date().getFullYear()} Bobby Lohia | Documenting Wildlife Responsibly - All Rights Reserved
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React from 'react';
import { Link } from 'react-router-dom';

// Social Card Component - You can save this as a separate file: SocialCard.js
const SocialCard = () => {
  return (
    <div className="social-card">
      <div className="card flex gap-3 sm:gap-4">
        <a href="https://www.instagram.com/bobbylohiakol?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="social-container bg-white/10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg transition-all duration-300 hover:scale-110">
          <svg className="social-svg w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
          </svg>
        </a>
        <a href="https://www.facebook.com/share/18oJVg9DUh/" className="social-container bg-white/10 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg transition-all duration-300 hover:scale-110">
          <svg className="social-svg w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 16 16">
            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
          </svg>
        </a>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-12">
          
          <div className="sm:col-span-2 lg:col-span-2">
            <h3 className="text-2xl sm:text-3xl font-mangro font-bold text-white mb-4 sm:mb-6">
              Bobby Lohia
            </h3>
            <p className="text-white/70 font-mangro mb-6 sm:mb-8 max-w-md leading-relaxed text-sm sm:text-base">
              Wildlife photographer with over 15 years of experience capturing 
              the raw beauty and intimate moments of nature across multiple continents.
            </p>
            {/* Social Media Icons */}
            <SocialCard />
          </div>

          <div>
            <h4 className="text-lg sm:text-xl font-mangro font-bold text-white mb-4 sm:mb-6">
              Navigation
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link to="/" className="text-white/70 hover:text-white font-mangro transition-all duration-300 hover:translate-x-1 inline-block text-sm sm:text-base touch-manipulation">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-white/70 hover:text-white font-mangro transition-all duration-300 hover:translate-x-1 inline-block text-sm sm:text-base touch-manipulation">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/albums" className="text-white/70 hover:text-white font-mangro transition-all duration-300 hover:translate-x-1 inline-block text-sm sm:text-base touch-manipulation">
                  Albums
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-white font-mangro transition-all duration-300 hover:translate-x-1 inline-block text-sm sm:text-base touch-manipulation">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg sm:text-xl font-mangro font-bold text-white mb-4 sm:mb-6">
              Get In Touch
            </h4>
            <div className="space-y-2 sm:space-y-3">
              <a href="mailto:bobbylohia@gmail.com" className="block text-white/70 hover:text-white font-mangro transition-colors duration-300 text-sm sm:text-base break-words touch-manipulation">
                bobbylohia@gmail.com
              </a>
              <a href="tel:+917003842077" className="block text-white/70 hover:text-white font-mangro transition-colors duration-300 text-sm sm:text-base touch-manipulation">
                +91 70038 42077
              </a>
              <p className="text-white/70 font-mangro text-sm sm:text-base">Kolkata, India</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-t border-white/10">
          <div className="text-center">
            <div className="text-3xl font-mangro font-bold text-white mb-2">15+</div>
            <div className="text-sm text-white/60 font-mangro">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-mangro font-bold text-white mb-2">50+</div>
            <div className="text-sm text-white/60 font-mangro">Countries Visited</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-mangro font-bold text-white mb-2">10000+</div>
            <div className="text-sm text-white/60 font-mangro">Photos Captured</div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-8 border-t border-white/10">
          <p className="text-white/60 font-mangro">
            &copy; {new Date().getFullYear()} Bobby Lohia | Documenting Wildlife Responsibly - All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;