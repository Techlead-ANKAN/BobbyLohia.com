// // utils/analytics.js
// import ReactGA from 'react-ga4';

// ReactGA.initialize("G-7C7GXZ465Y");

// export const trackPageView = (path) => {
//   ReactGA.send({ hitType: "pageview", page: path });
// };

// export const trackEvent = (action) => {
//   ReactGA.event({ action });
// };



// utils/analytics.js
import ReactGA from 'react-ga4';

// Initialize with your GA4 ID
ReactGA.initialize("G-7C7GXZ465Y");

export const trackPageView = (path) => {
  ReactGA.send({ 
    hitType: "pageview", 
    page: path 
  });
};

export const trackEvent = (action, category = 'User Interaction') => {
  ReactGA.event({
    category: category,
    action: action
  });
};