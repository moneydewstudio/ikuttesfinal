
import { useEffect } from 'react';

interface AdSenseProps {
  client: string;
  slot: string;
  style?: React.CSSProperties;
}

export default function AdSense({ client, slot, style = {} }: AdSenseProps) {
  useEffect(() => {
    try {
      // Load AdSense script dynamically
      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.setAttribute('data-ad-client', client);
      document.head.appendChild(script);

      // Initialize ads
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error('Error loading AdSense:', error);
    }
  }, [client]);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block', ...style }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
