# 📸 How to Change Wildlife Photo Captions & Information

## 🎯 **Location of Image Data**

**All your wildlife photo captions, titles, descriptions, and locations are stored in:**
```
📁 src/data/portfolio.js
```

This **ONE FILE** controls all captions across:
- ✅ **Gallery page** (all 62 photos)
- ✅ **Albums page** (photo collections)
- ✅ **Featured Work** (homepage)
- ✅ **Lightbox displays** (popup view)

## 📋 **Current Caption Structure**

Each photo has these editable fields:
```javascript
{
  id: 1,
  title: "African Cheetah at Dawn",           ← Main caption title
  description: "A solitary cheetah surveying...", ← Detailed description
  category: "Wildlife",                        ← Photo category
  location: "Maasai Mara, Kenya",            ← Location caption
  year: "2024",                               ← Year taken
  image: "/images/WildlifeAlbumFiles00.jpg",  ← Image file
  thumbnail: "/images/WildlifeAlbumFiles00.jpg" ← Thumbnail
}
```

## 🔄 **How Captions Are Displayed**

### **Gallery Cards (Main View):**
- **Large Title**: `image.title` 
- **Location**: `image.location`
- **Category Badge**: `image.category`

### **Lightbox (Popup View):**
- **Main Title**: `image.title`
- **Full Description**: `image.description` 
- **Location & Year**: `image.location, image.year`

### **Homepage Featured Work:**
- Uses first 6 images from the portfolio.js array
- Same display format as gallery

## ✏️ **How to Change Captions**

### **Step 1: Open the Data File**
```
📁 BobbyLohia.com/src/data/portfolio.js
```

### **Step 2: Find the Photo to Edit**
Each photo is numbered by `id` and corresponds to:
- `id: 1` = `WildlifeAlbumFiles00.jpg`
- `id: 2` = `WildlifeAlbumFiles01.jpg`  
- `id: 3` = `WildlifeAlbumFiles02.jpg`
- ... and so on

### **Step 3: Edit the Fields**

**Example - Current Photo 1:**
```javascript
{
  id: 1,
  title: "African Cheetah at Dawn",
  description: "A solitary cheetah surveying the Kenyan savanna...",
  category: "Wildlife",
  location: "Maasai Mara, Kenya",
  year: "2024",
  image: "/images/WildlifeAlbumFiles00.jpg",
  thumbnail: "/images/WildlifeAlbumFiles00.jpg"
}
```

**Example - Your New Captions:**
```javascript
{
  id: 1,
  title: "Your New Photo Title",
  description: "Your detailed description of this amazing moment in nature...",
  category: "Wildlife", // or "Landscape", "Birds", etc.
  location: "Your Location, Country",
  year: "2024",
  image: "/images/WildlifeAlbumFiles00.jpg",
  thumbnail: "/images/WildlifeAlbumFiles00.jpg"
}
```

## 📝 **Caption Writing Guidelines**

### **Title (Main Caption):**
- **Length**: 2-8 words
- **Style**: Descriptive, engaging
- **Examples**: 
  - "Leopard's Majestic Rest"
  - "Morning Hunt"
  - "Elephant Family Bond"

### **Description (Detailed Caption):**
- **Length**: 1-3 sentences
- **Style**: Storytelling, emotional
- **Include**: Behavior, setting, feeling
- **Examples**:
  - "A magnificent leopard resting on an ancient baobab tree, its spotted coat perfectly camouflaged against the dappled sunlight filtering through the leaves."

### **Location:**
- **Format**: "Place, Country" or "Park Name, Country"
- **Examples**: 
  - "Ranthambore National Park, India"
  - "Maasai Mara, Kenya"
  - "Sundarbans, Bangladesh"

### **Category Options:**
- `"Wildlife"` - Animals in action
- `"Landscape"` - Nature scenes, scenery
- `"Birds"` - Avian photography
- `"Conservation"` - Environmental focus
- `"Portraits"` - Close-up animal shots

## 🚀 **Complete Workflow for Caption Updates**

### **Step 1: Backup Current Data**
```bash
# Make a copy of portfolio.js before editing
cp src/data/portfolio.js src/data/portfolio.js.backup
```

### **Step 2: Edit Captions**
1. **Open**: `src/data/portfolio.js`
2. **Find**: The photo by ID number
3. **Edit**: Title, description, location as needed
4. **Save**: The file

### **Step 3: Test Locally**
```bash
npm run dev
```
- **Visit**: `http://localhost:3000/gallery`
- **Check**: New captions display correctly
- **Test**: Lightbox popup captions

### **Step 4: Deploy Changes**
```bash
npm run build
```
- **Upload**: New `assets/` folder to Hostinger
- **Test**: Live website captions

## 🎯 **Example Mass Caption Update**

**If you want to change multiple photos at once:**

```javascript
// Find this in portfolio.js:
export const wildlifeImages = [
  {
    id: 1,
    title: "OLD TITLE 1",
    description: "OLD DESCRIPTION 1",
    location: "OLD LOCATION 1",
    // ... other fields
  },
  {
    id: 2,
    title: "OLD TITLE 2",
    description: "OLD DESCRIPTION 2", 
    location: "OLD LOCATION 2",
    // ... other fields
  },
  // ... 60 more photos
];
```

**Replace with your new captions:**
```javascript
export const wildlifeImages = [
  {
    id: 1,
    title: "Your New Title 1",
    description: "Your new amazing description for photo 1...",
    location: "Your Location 1, Country",
    // ... keep other fields same
  },
  {
    id: 2,
    title: "Your New Title 2",
    description: "Your new amazing description for photo 2...",
    location: "Your Location 2, Country", 
    // ... keep other fields same
  },
  // ... continue for all photos
];
```

## ⚠️ **Important Notes**

### **Don't Change These Fields:**
- ✅ **Keep**: `id`, `image`, `thumbnail` (file paths)
- ✅ **Keep**: `year` (unless incorrect)
- ✏️ **Edit**: `title`, `description`, `location`, `category`

### **File Structure Must Stay:**
- Images must stay as `/images/WildlifeAlbumFiles##.jpg`
- Don't change the image file names or paths
- Only edit the descriptive text fields

### **Categories Available:**
Use these exact category names:
- `"Wildlife"`
- `"Landscape"` 
- `"Birds"`
- `"Conservation"`
- `"Portraits"`

## 🔧 **Quick Caption Template**

**Copy this template for each photo:**
```javascript
{
  id: ##,
  title: "Your Photo Title",
  description: "Your detailed storytelling description capturing the moment, emotion, and setting of this incredible wildlife encounter.",
  category: "Wildlife", // or Landscape, Birds, etc.
  location: "Location Name, Country",
  year: "2024",
  image: "/images/WildlifeAlbumFiles##.jpg",
  thumbnail: "/images/WildlifeAlbumFiles##.jpg"
}
```

---

## 🎉 **Result After Changes**

Once you update the captions and deploy:
- ✅ **Gallery page**: Shows new titles and locations
- ✅ **Album pages**: Displays updated captions  
- ✅ **Homepage**: Featured work has new descriptions
- ✅ **Lightbox**: Popup shows full new descriptions
- ✅ **All devices**: Mobile and desktop see updates

**Your wildlife photography will tell the stories YOU want to tell!** 📸✨