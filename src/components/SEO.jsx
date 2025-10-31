import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = ({ 
  title = "Bobby Lohia - Professional Wildlife Photographer | Nature Photography India",
  description = "Bobby Lohia - Wildlife photographer from Kolkata, India with 15+ years capturing wildlife. Nature photography, conservation workshops.",
  keywords = "Bobby Lohia photographer, wildlife photography India, nature photographer Kolkata, tiger photos, wildlife conservation photography, nature photographer, photography workshops India, wildlife photographs, nature photography",
  image = "/images/WildlifeAlbumFiles39.jpg",
  url = "https://bobbylohia.com",
  type = "website",
  children
}) => {
  const location = useLocation();
  const fullUrl = `https://bobbylohia.com${location.pathname}`;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let tag = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, name);
        document.head.appendChild(tag);
      }
      
      tag.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', `https://bobbylohia.com${image}`, true);
    updateMetaTag('og:url', fullUrl, true);
    updateMetaTag('og:type', type, true);
    
    // Twitter tags
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', `https://bobbylohia.com${image}`);
    
    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);

  }, [title, description, keywords, image, fullUrl, type]);

  return children || null;
};

export default SEO;