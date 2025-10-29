import React from 'react';

const ImageSchema = ({ image, photographer = "Bobby Lohia" }) => {
  if (!image) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "name": image.title || "Wildlife Photography",
    "description": image.description || `Professional wildlife photography by ${photographer}`,
    "url": `https://bobbylohia.com${image.image}`,
    "contentUrl": `https://bobbylohia.com${image.image}`,
    "thumbnailUrl": `https://bobbylohia.com${image.thumbnail || image.image}`,
    "author": {
      "@type": "Person",
      "name": photographer,
      "url": "https://bobbylohia.com"
    },
    "creator": {
      "@type": "Person", 
      "name": photographer
    },
    "copyrightHolder": {
      "@type": "Person",
      "name": photographer
    },
    "license": "https://bobbylohia.com/license",
    "acquireLicensePage": "https://bobbylohia.com/contact",
    "datePublished": "2025-10-29",
    "uploadDate": "2025-10-29",
    "keywords": `${image.category?.toLowerCase()} photography, wildlife photography, nature photography, ${photographer}, ${image.location}`,
    "locationCreated": {
      "@type": "Place",
      "name": image.location || "Wildlife Location"
    },
    "about": {
      "@type": "Thing",
      "name": image.category || "Wildlife"
    },
    "genre": ["Photography", "Wildlife Photography", "Nature Photography"],
    "inLanguage": "en",
    "isFamilyFriendly": true,
    "encodingFormat": "image/jpeg"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  );
};

export const GallerySchema = ({ images, photographer = "Bobby Lohia" }) => {
  if (!images || !Array.isArray(images)) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": `${photographer} Wildlife Photography Gallery`,
    "description": `Professional wildlife and nature photography gallery by ${photographer} featuring stunning images from around the world`,
    "url": "https://bobbylohia.com/gallery",
    "author": {
      "@type": "Person",
      "name": photographer,
      "url": "https://bobbylohia.com"
    },
    "numberOfItems": images.length,
    "associatedMedia": images.slice(0, 10).map(image => ({
      "@type": "ImageObject",
      "name": image.title || "Wildlife Photography",
      "url": `https://bobbylohia.com${image.image}`,
      "thumbnailUrl": `https://bobbylohia.com${image.thumbnail || image.image}`,
      "description": image.description || `Professional wildlife photography by ${photographer}`
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  );
};

export default ImageSchema;