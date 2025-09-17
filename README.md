# Bobby Lohia Wildlife Photography Portfolio

A modern, elegant, and highly engaging portfolio website for Bobby Lohia, a senior wildlife photographer with over 15 years of professional experience. The website showcases his journey, best work, and provides an intuitive user experience that immediately conveys his expertise in wildlife photography.

## 🎯 Features

- **Modern Design**: Elegant, sleek, and minimalistic design with natural forest tones
- **Unique Navigation**: Right-side slide-in menu instead of traditional top navbar
- **Premium Typography**: Playfair Display and Lato fonts for a classy, premium feel
- **Responsive Layout**: Fully responsive design that works on all devices
- **Photo Gallery**: Grid layout with hover effects and lightbox view for enlarged images
- **Photo Albums**: Multiple curated albums with smooth animations
- **Contact Form**: Integrated with EmailJS for direct email communication
- **Performance Optimized**: Built with Vite for fast loading and optimal performance

## 🛠️ Tech Stack

- **Framework**: React.js with React Router for navigation
- **Styling**: Tailwind CSS with custom forest-themed color palette
- **Build Tool**: Vite
- **Email Service**: EmailJS for contact form functionality
- **Fonts**: Google Fonts (Playfair Display, Lato, Merriweather)

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/bobbylohia-com.git
cd bobbylohia-com
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 📧 EmailJS Setup

To enable the contact form functionality:

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create a new email service and template
3. Update the EmailJS configuration in `src/pages/Contact.jsx`:
   - Replace `YOUR_SERVICE_ID` with your EmailJS service ID
   - Replace `YOUR_TEMPLATE_ID` with your EmailJS template ID
   - Replace `YOUR_PUBLIC_KEY` with your EmailJS public key

## 🎨 Customization

### Colors

The website uses a custom forest-themed color palette defined in `tailwind.config.js`. You can customize the colors by modifying the theme configuration:

- **Forest**: Primary green tones
- **Earth**: Brown and beige tones
- **Sage**: Muted green-gray tones

### Content

Update the photographer's information and portfolio content in `src/data/portfolio.js`:

- Personal bio and experience
- Contact information
- Wildlife images and albums
- Awards and recognition

### Images

Replace the placeholder images with actual wildlife photography:

1. Add your images to the `public` directory or use external URLs
2. Update the image paths in `src/data/portfolio.js`
3. Ensure images are optimized for web use (WebP format recommended)

## 📱 Pages

- **Home**: Hero section, about, and featured work preview
- **Gallery**: Complete photo gallery with filtering and lightbox
- **Albums**: Curated photo collections with modal viewing
- **Contact**: Contact form and photographer information
- **404**: Custom not-found page with random wildlife image

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

### Project Structure

```
src/
  components/          # Reusable React components
    Navigation.jsx     # Right-side slide-in navigation
  pages/              # Page components
    Home.jsx          # Landing page
    Gallery.jsx       # Photo gallery with lightbox
    Albums.jsx        # Photo albums with modals
    Contact.jsx       # Contact form and info
    NotFound.jsx      # 404 page
  data/               # Data and content
    portfolio.js      # Photographer bio and portfolio data
  assets/             # Static assets
  App.jsx            # Main app component
  main.jsx           # Entry point
  index.css          # Global styles and Tailwind imports
```

## 🌟 Key Design Features

- **Forest Color Palette**: Natural greens, browns, and earth tones
- **Premium Typography**: Playfair Display for headings, Lato for body text
- **Smooth Animations**: Fade-in effects, hover transitions, and scale transforms
- **Professional Layout**: Clean, minimalistic design that highlights the photography
- **Mobile-First**: Responsive design that works beautifully on all devices

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📧 Contact

For questions about this website or wildlife photography services:

- Email: bobbylohia@gmail.com
- Phone: +1-234-567-8900

---

Built with ❤️ for wildlife conservation and photography+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
