// Meta Pixel typed helpers
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const fbq = (...args: unknown[]) => {
  if (typeof window.fbq === 'function') {
    window.fbq(...args);
  }
};

/** Fire when a visitor submits the contact form or clicks a WhatsApp button */
export const trackLead = () => {
  fbq('track', 'Lead');
};

/** Fire when a visitor clicks a pricing package CTA */
export const trackInitiateCheckout = (packageName: string, value: number) => {
  fbq('track', 'InitiateCheckout', {
    content_name: packageName,
    value,
    currency: 'GBP',
  });
};

/** Fire when a visitor views the pricing section */
export const trackViewContent = (contentName: string) => {
  fbq('track', 'ViewContent', {
    content_name: contentName,
    content_type: 'product',
  });
};
