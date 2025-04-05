'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

type ImageFallbackProps = Omit<ImageProps, 'onError'> & {
  fallbackSrc?: string;
};

export default function ImageFallback({
  src,
  alt,
  fallbackSrc = '/images/placeholder.jpg',
  ...rest
}: ImageFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      {...rest}
      src={imgSrc}
      alt={alt}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
} 