'use client';

import { useEffect } from 'react';

interface ClientMetadataProps {
  title?: string;
  description?: string;
}

export default function ClientMetadata({ title, description }: ClientMetadataProps) {
  useEffect(() => {
    // Update title
    if (title) {
      document.title = `${title} | Lodenn Studio`;
    }

    // Update or create meta description
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');

      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }

      metaDescription.setAttribute('content', description);
    }
  }, [title, description]);

  return null;
}
