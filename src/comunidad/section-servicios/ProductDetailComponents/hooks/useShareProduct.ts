import { useState, useRef, useEffect } from 'react';
import { type Product } from '../../../ServiciosSection';

export const useShareProduct = (product: Product) => {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const shareTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined); // Cambio aquí

  useEffect(() => {
    return () => {
      if (shareTimeoutRef.current) {
        clearTimeout(shareTimeoutRef.current);
      }
    };
  }, []);

  const handleShare = async () => {
    const productUrl = `${window.location.origin}${window.location.pathname}#product-${product.id}`;
    const shareText = `Mira este producto de la Cooperativa San Juan Tahitic: ${product.name} - ${product.description}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: shareText,
          url: productUrl,
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(`${shareText}\n${productUrl}`);
        setCopiedToClipboard(true);
        
        if (shareTimeoutRef.current) {
          clearTimeout(shareTimeoutRef.current);
        }
        shareTimeoutRef.current = setTimeout(() => {
          setCopiedToClipboard(false);
        }, 2000);
      } else {
        copyToClipboardFallback(`${shareText}\n${productUrl}`);
      }
    } catch (error) {
      console.log('Error al compartir:', error);
      copyToClipboardFallback(`${shareText}\n${productUrl}`);
    }
    
    setShowShareOptions(false);
  };

  const copyToClipboardFallback = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopiedToClipboard(true);
      
      if (shareTimeoutRef.current) {
        clearTimeout(shareTimeoutRef.current);
      }
      shareTimeoutRef.current = setTimeout(() => {
        setCopiedToClipboard(false);
      }, 2000);
    } catch (err) {
      console.error('Fallback: Error al copiar al portapapeles', err);
    }
    document.body.removeChild(textArea);
  };

  const shareOnSocialMedia = (platform: string) => {
    const productUrl = encodeURIComponent(`${window.location.origin}${window.location.pathname}#product-${product.id}`);
    const shareText = encodeURIComponent(`Mira este producto de la Cooperativa San Juan Tahitic: ${product.name}`);
    
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${productUrl}&quote=${shareText}`,
      twitter: `https://twitter.com/intent/tweet?text=${shareText}&url=${productUrl}`,
      whatsapp: `https://wa.me/?text=${shareText}%20${productUrl}`,
      telegram: `https://t.me/share/url?url=${productUrl}&text=${shareText}`,
    };

    const url = urls[platform as keyof typeof urls];
    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }
    
    setShowShareOptions(false);
  };

  return {
    showShareOptions,
    setShowShareOptions,
    copiedToClipboard,
    setCopiedToClipboard,
    handleShare,
    shareOnSocialMedia
  };
};