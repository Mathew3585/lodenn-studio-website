# Lodenn Studio Website

Official website for Lodenn Studio and Aetheris game.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Image Optimization**: Next.js Image component

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
website/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   └── games/aetheris/    # Aetheris game page
├── components/            # Reusable React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ContactForm.tsx
│   ├── ImageGallery.tsx
│   └── TeamMember.tsx
├── public/               # Static assets
│   └── images/          # Images and graphics
└── tailwind.config.ts   # Tailwind CSS configuration
```

## Configuration

### Contact Form

The contact form uses [Formspree](https://formspree.io/) for form handling. To set it up:

1. Sign up at [https://formspree.io/](https://formspree.io/)
2. Create a new form
3. Copy your form ID
4. Update `components/ContactForm.tsx` line 26:
   - Replace `YOUR_FORM_ID` with your actual Formspree form ID

### Video Trailer

To update the Aetheris trailer video:

1. Upload your video to YouTube
2. Get the video ID from the URL (e.g., `dQw4w9WgXcQ` from `https://youtube.com/watch?v=dQw4w9WgXcQ`)
3. Update `app/games/aetheris/page.tsx` line 64
4. Replace the placeholder video ID with your actual video ID

### Social Media Links

Update social media links in:
- `components/Footer.tsx` (lines 15-46)
- `app/contact/page.tsx` (lines 16-63)

Replace the placeholder URLs with your actual social media profiles.

### Team Members

To add team members:

1. Open `app/about/page.tsx`
2. Add new team member objects to the `teamMembers` array (line 18)
3. Optionally add team member photos to `public/images/team/`

Example:
```typescript
{
  name: 'Jane Doe',
  role: 'Artist & Animator',
  bio: 'Creating stunning visuals for Aetheris.',
  avatar: '/images/team/jane.jpg', // Optional
},
```

### Adding New Games

The site structure supports multiple games. To add a new game:

1. Create a new directory: `app/games/[game-name]/`
2. Create `page.tsx` in that directory
3. Follow the structure of `app/games/aetheris/page.tsx`
4. Add images to `public/images/[game-name]/`
5. Update navigation in `components/Header.tsx` if needed

## Color Scheme

The site uses colors from the Lodenn Studio logo and Aetheris artwork:

- **Primary Orange**: `#FF6B1A`
- **Sky Blue**: `#5BA4D4`
- **Nature Green**: `#7BC74D`
- **Sand Beige**: `#E8D5B7`

These are configured in `tailwind.config.ts` and can be used as Tailwind classes:
- `text-primary`, `bg-primary` (orange)
- `text-sky-light`, `bg-sky-light` (blue)
- `text-nature-green`, `bg-nature-green` (green)
- `text-sand-light`, `bg-sand-light` (beige)

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will auto-detect Next.js and configure build settings
4. Deploy!

### Other Platforms

The site can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS
- Digital Ocean
- etc.

Build command: `npm run build`
Output directory: `.next`

## SEO & Metadata

Each page has custom metadata configured for SEO. Update the `metadata` object in each page file to customize:
- Page title
- Description
- Open Graph tags
- Keywords

## Performance

- Images are automatically optimized by Next.js
- Lazy loading for images
- Code splitting by route
- Tailwind CSS purges unused styles in production

## Support

For issues or questions, contact Lodenn Studio through the website contact form or social media.

## License

© 2025 Lodenn Studio. All rights reserved.
