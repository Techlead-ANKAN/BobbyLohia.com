# 🎯 Simple Caption Template Generator

## How to Use This:
1. Look at each image in your `public/images/` folder
2. Find the matching template below
3. Copy the code to your `portfolio.js`

## 📸 Common Wildlife Photo Templates

### **ELEPHANTS**
```javascript
// For elephant photos:
title: "Elephant Herd",
description: "Elephants in the savanna",
category: "Wildlife",

// OR if drinking:
title: "Elephants Drinking Water",
description: "Elephants drinking at watering hole",
category: "Wildlife",

// OR if walking:
title: "Elephant Walking", 
description: "Elephant walking across grassland",
category: "Wildlife",
```

### **TIGERS**
```javascript
// For tiger photos:
title: "Tiger Resting",
description: "Tiger resting in shade",
category: "Wildlife",

// OR if drinking:
title: "Tiger Drinking Water",
description: "Tiger drinking from river",
category: "Wildlife",

// OR if walking:
title: "Tiger in Forest",
description: "Tiger walking through forest",
category: "Wildlife",
```

### **LIONS**
```javascript
// For lion photos:
title: "Lion Portrait",
description: "Lion looking at camera",
category: "Wildlife",

// OR if pride:
title: "Lion Pride",
description: "Lions resting together",
category: "Wildlife",

// OR if hunting:
title: "Lion Hunting",
description: "Lion stalking prey",
category: "Wildlife",
```

### **LEOPARDS**
```javascript
// For leopard photos:
title: "Leopard in Tree",
description: "Leopard resting on branch",
category: "Wildlife",

// OR if on ground:
title: "Leopard Walking",
description: "Leopard walking through grass",
category: "Wildlife",
```

### **CHEETAHS**
```javascript
title: "Cheetah Running",
description: "Cheetah at full speed",
category: "Wildlife",

// OR if resting:
title: "Cheetah Resting",
description: "Cheetah lying in grass",
category: "Wildlife",
```

### **BIRDS**
```javascript
// For bird photos:
title: "Eagle Flying",
description: "Eagle soaring in sky",
category: "Birds",

// OR if perched:
title: "Bird on Branch",
description: "Bird perched on tree",
category: "Birds",

// OR if water bird:
title: "Heron by Water",
description: "Heron standing in water",
category: "Birds",
```

### **LANDSCAPES**
```javascript
// For landscape photos:
title: "African Sunset",
description: "Sunset over savanna",
category: "Landscape",

// OR if mountain:
title: "Mountain View",
description: "Mountains in morning light",
category: "Landscape",

// OR if tree:
title: "Acacia Tree",
description: "Lone acacia tree",
category: "Landscape",
```

### **ANTELOPES/GAZELLES**
```javascript
title: "Gazelle Grazing",
description: "Gazelle feeding on grass",
category: "Wildlife",

// OR if running:
title: "Antelope Running",
description: "Antelope running from predator",
category: "Wildlife",
```

### **RHINOS/HIPPOS**
```javascript
title: "Rhino in Mud",
description: "Rhino wallowing in mud",
category: "Wildlife",

title: "Hippo in Water",
description: "Hippo emerging from water",
category: "Wildlife",
```

## 🔄 **How to Apply These:**

1. **Look at your photo**: `WildlifeAlbumFiles00.jpg`
2. **Identify the animal/scene**: Is it an elephant? Tiger? Landscape?
3. **Choose template above**: Pick the one that matches
4. **Update portfolio.js**: Replace the caption for that ID number

## 📝 **Example Update in portfolio.js:**

```javascript
// If WildlifeAlbumFiles00.jpg shows elephants:
{
  id: 1,
  title: "Elephant Herd",
  description: "Elephants in the savanna",
  category: "Wildlife",
  location: "Kenya",
  year: "2024",
  image: "/images/WildlifeAlbumFiles00.jpg",
  thumbnail: "/images/WildlifeAlbumFiles00.jpg"
}
```

## ⚡ **Quick Process:**
1. Open `public/images/` folder
2. Look at each `WildlifeAlbumFiles##.jpg`  
3. Match with template above
4. Update corresponding ID in `portfolio.js`
5. Build and deploy: `npm run build`

This way you get **simple, accurate captions** that match exactly what's in each photo!