import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleScroll = (id: string) => {
  console.log('Attempting to scroll to:', id);
  const element = document.getElementById(id);
  if (element) {
    console.log('Element found, scrolling...');
    element.scrollIntoView({ behavior: 'smooth' });
  } else {
    console.warn('Element not found with id:', id);
  }
};

export const handleWhatsAppRedirect = (message: string = "Hi, I'm interested in your website design service") => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/447000000000?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
};
