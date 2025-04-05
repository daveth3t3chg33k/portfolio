'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';

type ProjectImageFallbackProps = Omit<ImageProps, 'onError'> & {
  title: string;
  bgClass?: string;
};

// Function to generate a consistent color based on project title
const getColorClass = (title: string) => {
  const colorClasses = [
    'from-purple-500/40 to-blue-500/40',
    'from-emerald-500/40 to-teal-500/40',
    'from-pink-500/40 to-red-500/40',
    'from-blue-500/40 to-indigo-500/40',
    'from-amber-500/40 to-orange-500/40',
    'from-indigo-500/40 to-violet-500/40',
  ];
  
  // Generate a number based on the title to select a consistent color
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const index = Math.abs(hash) % colorClasses.length;
  return colorClasses[index];
};

export default function ProjectImageFallback({
  src,
  alt,
  title,
  bgClass,
  ...rest
}: ProjectImageFallbackProps) {
  const [imgSrc, setImgSrc] = useState<string | null>(src as string);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  const colorClass = bgClass || getColorClass(title);
  
  return (
    <>
      {(hasError || !imgSrc) ? (
        <div className={`w-full h-full flex items-center justify-center bg-gradient-to-r ${colorClass}`}>
          <div className="text-center p-4">
            <div className="font-bold text-xl text-white mb-2">{title}</div>
            <div className="text-white/70 text-sm">Project Preview</div>
          </div>
        </div>
      ) : (
        <Image
          {...rest}
          src={imgSrc}
          alt={alt}
          onError={() => {
            setImgSrc(null);
            setHasError(true);
          }}
          onLoad={() => setIsLoading(false)}
          className={`w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        />
      )}
      
      {isLoading && !hasError && imgSrc && (
        <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-r ${colorClass}`}>
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </>
  );
} 