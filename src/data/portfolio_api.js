import ImageAPI from '../services/imageAPI';

// Static fallback data for when API is not available
const staticFallback = [
    {
        "id": 1,
        "title": "",
        "description": "",
        "alt": "",
        "category": "Landscape",
        "image": "/images/NEWUPDATED/LandscapeBLWebsite/Landscape1.jpg",
        "thumbnail": "/images/NEWUPDATED/LandscapeBLWebsite/Landscape1.jpg"
    },
    {
        "id": 2,
        "title": "",
        "description": "",
        "alt": "",
        "category": "Wildlife",
        "image": "/images/NEWUPDATED/WildLifeBLWebsite/Wildlife1.jpg",
        "thumbnail": "/images/NEWUPDATED/WildLifeBLWebsite/Wildlife1.jpg"
    }
    // Add more fallback images as needed
];

// Enhanced function to get images with API fallback
export const getWildlifeImages = async () => {
    try {
        const apiImages = await ImageAPI.getWildlifeImages();
        
        if (apiImages && apiImages.length > 0) {
            return apiImages.map(img => ({
                id: img.id,
                title: img.title || "",
                description: img.description || "",
                alt: img.alt || img.title || `Wildlife photography by Bobby Lohia`,
                category: img.category,
                image: ImageAPI.getImageUrl(img.image),
                thumbnail: ImageAPI.getImageUrl(img.thumbnail || img.image)
            }));
        } else {
            // Fallback to static images if API fails or returns empty
            console.log('Using static fallback for wildlife images');
            return staticFallback.filter(img => img.category === 'Wildlife');
        }
    } catch (error) {
        console.error('Error fetching wildlife images:', error);
        return staticFallback.filter(img => img.category === 'Wildlife');
    }
};

export const getLandscapeImages = async () => {
    try {
        const apiImages = await ImageAPI.getLandscapeImages();
        
        if (apiImages && apiImages.length > 0) {
            return apiImages.map(img => ({
                id: img.id,
                title: img.title || "",
                description: img.description || "",
                alt: img.alt || img.title || `Landscape photography by Bobby Lohia`,
                category: img.category,
                image: ImageAPI.getImageUrl(img.image),
                thumbnail: ImageAPI.getImageUrl(img.thumbnail || img.image)
            }));
        } else {
            // Fallback to static images if API fails or returns empty
            console.log('Using static fallback for landscape images');
            return staticFallback.filter(img => img.category === 'Landscape');
        }
    } catch (error) {
        console.error('Error fetching landscape images:', error);
        return staticFallback.filter(img => img.category === 'Landscape');
    }
};

export const getAllImages = async () => {
    try {
        const apiImages = await ImageAPI.getGalleryImages();
        
        if (apiImages && apiImages.length > 0) {
            return apiImages.map(img => ({
                id: img.id,
                title: img.title || "",
                description: img.description || "",
                alt: img.alt || img.title || `${img.category} photography by Bobby Lohia`,
                category: img.category,
                image: ImageAPI.getImageUrl(img.image),
                thumbnail: ImageAPI.getImageUrl(img.thumbnail || img.image)
            }));
        } else {
            // Fallback to static images if API fails or returns empty
            console.log('Using static fallback for all images');
            return staticFallback;
        }
    } catch (error) {
        console.error('Error fetching all images:', error);
        return staticFallback;
    }
};

// Legacy export for backward compatibility
export const wildlifeImages = staticFallback;

// Modern async exports
export { ImageAPI };