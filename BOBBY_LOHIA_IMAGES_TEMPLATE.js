// Template for adding Bobby Lohia's 61 wildlife photographs
// Replace the URLs with actual image paths and update the details

export const bobbyLohiaImages = [
  // Wildlife Category - Lions
  {
    id: 101,
    title: "Majestic Lion Portrait",
    description: "A powerful male lion gazing across the savanna, embodying the spirit of African wildlife.",
    category: "Wildlife",
    location: "Maasai Mara, Kenya",
    year: "2024",
    image: "/images/bobby-lohia/lion-portrait-01.jpg", // Replace with actual path
    thumbnail: "/images/bobby-lohia/thumbs/lion-portrait-01.jpg"
  },
  {
    id: 102,
    title: "Lioness Hunt",
    description: "A focused lioness stalking through golden grass during the early morning hunt.",
    category: "Wildlife",
    location: "Serengeti, Tanzania",
    year: "2024",
    image: "/images/bobby-lohia/lioness-hunt-01.jpg",
    thumbnail: "/images/bobby-lohia/thumbs/lioness-hunt-01.jpg"
  },

  // Wildlife Category - Elephants
  {
    id: 103,
    title: "Elephant Family Journey",
    description: "A family of elephants crossing the dusty plains, showcasing the strong bonds between generations.",
    category: "Wildlife",
    location: "Amboseli National Park, Kenya",
    year: "2024",
    image: "/images/bobby-lohia/elephant-family-01.jpg",
    thumbnail: "/images/bobby-lohia/thumbs/elephant-family-01.jpg"
  },
  {
    id: 104,
    title: "Baby Elephant Playfulness",
    description: "A young elephant calf playing in the mud, displaying the joy and innocence of youth.",
    category: "Wildlife",
    location: "Tsavo National Park, Kenya",
    year: "2024",
    image: "/images/bobby-lohia/baby-elephant-01.jpg",
    thumbnail: "/images/bobby-lohia/thumbs/baby-elephant-01.jpg"
  },

  // Wildlife Category - Leopards
  {
    id: 105,
    title: "Leopard in Golden Light",
    description: "A magnificent leopard resting on a tree branch during the golden hour.",
    category: "Wildlife",
    location: "Kruger National Park, South Africa",
    year: "2023",
    image: "/images/bobby-lohia/leopard-golden-01.jpg",
    thumbnail: "/images/bobby-lohia/thumbs/leopard-golden-01.jpg"
  },

  // Birds Category
  {
    id: 106,
    title: "African Fish Eagle",
    description: "The national bird of Kenya captured in its natural habitat by the lake.",
    category: "Birds",
    location: "Lake Naivasha, Kenya",
    year: "2024",
    image: "/images/bobby-lohia/fish-eagle-01.jpg",
    thumbnail: "/images/bobby-lohia/thumbs/fish-eagle-01.jpg"
  },
  {
    id: 107,
    title: "Flamingo Gathering",
    description: "Thousands of flamingos creating a pink spectacle at the alkaline lake.",
    category: "Birds",
    location: "Lake Nakuru, Kenya",
    year: "2024",
    image: "/images/bobby-lohia/flamingo-gathering-01.jpg",
    thumbnail: "/images/bobby-lohia/thumbs/flamingo-gathering-01.jpg"
  },

  // Landscape Category
  {
    id: 108,
    title: "Sunrise Over Kilimanjaro",
    description: "The magnificent Mount Kilimanjaro bathed in the soft light of dawn.",
    category: "Landscape",
    location: "Amboseli, Kenya",
    year: "2024",
    image: "/images/bobby-lohia/kilimanjaro-sunrise-01.jpg",
    thumbnail: "/images/bobby-lohia/thumbs/kilimanjaro-sunrise-01.jpg"
  },
  {
    id: 109,
    title: "Savanna Storm",
    description: "Dramatic storm clouds gathering over the vast African savanna.",
    category: "Landscape",
    location: "Maasai Mara, Kenya",
    year: "2024",
    image: "/images/bobby-lohia/savanna-storm-01.jpg",
    thumbnail: "/images/bobby-lohia/thumbs/savanna-storm-01.jpg"
  },

  // Macro Category
  {
    id: 110,
    title: "Butterfly Wing Detail",
    description: "Intricate patterns on a butterfly wing showcasing nature's incredible artistry.",
    category: "Macro",
    location: "Arabuko Sokoke Forest, Kenya",
    year: "2024",
    image: "/images/bobby-lohia/butterfly-wing-01.jpg",
    thumbnail: "/images/bobby-lohia/thumbs/butterfly-wing-01.jpg"
  },

  // Continue adding more images...
  // You would add 51 more entries following this pattern
  // Make sure each has a unique ID (101-161 for example)
  // Update all the image paths to match your actual file structure
  // Include diverse categories: Wildlife, Birds, Landscape, Macro
  // Add authentic locations where Bobby Lohia has photographed
  // Use realistic years (2020-2024)
];

// Instructions for implementation:
// 1. Replace the wildlifeImages array in portfolio.js with this expanded array
// 2. Update all image URLs to point to your actual image files
// 3. Ensure you have both full-size and thumbnail versions of each image
// 4. Organize images in categories for better filtering
// 5. Update the photoAlbums arrays to reference the new images

// Recommended folder structure:
// public/images/bobby-lohia/
//   ├── full-size images (800x600 or larger)
//   └── thumbs/
//       └── thumbnail images (400x300)

// Example of how to update portfolio.js:
// export const wildlifeImages = bobbyLohiaImages;