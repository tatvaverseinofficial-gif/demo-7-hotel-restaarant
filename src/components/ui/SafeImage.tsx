"use client";

import Image from "next/image";
import { useState } from "react";
import { cn, getImageUrl } from "@/lib/utils";

interface SafeImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export function SafeImage({
  src,
  alt,
  fill,
  width,
  height,
  className,
  priority,
  sizes,
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(getImageUrl(src));
  const [hasError, setHasError] = useState(false);

  const fallback = "/images/placeholder.svg";

  if (hasError) {
    return (
      <div
        className={cn(
          "bg-warm-beige flex items-center justify-center",
          fill && "absolute inset-0",
          className
        )}
        style={!fill ? { width, height } : undefined}
      >
        <span className="text-champagne text-sm font-serif">{alt}</span>
      </div>
    );
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      className={className}
      priority={priority}
      sizes={sizes}
      onError={() => {
        if (imgSrc.endsWith(".jpg")) {
          setImgSrc(imgSrc.replace(/\.jpg$/, ".svg"));
        } else if (imgSrc !== fallback) {
          setImgSrc(fallback);
        } else {
          setHasError(true);
        }
      }}
    />
  );
}
