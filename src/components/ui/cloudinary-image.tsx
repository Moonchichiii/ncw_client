import { memo, useState } from "react";

interface CloudinaryImgProps {
  publicId: string;
  alt: string;
  className?: string | undefined;
  priority?: boolean | undefined;
  sizes?: string | undefined;
}

const WIDTHS = [240, 400, 640, 828, 1080, 1280];
const FALLBACK_WIDTH = WIDTHS[WIDTHS.length - 1];
const TRANSFORMS = "f_auto,q_auto:eco,c_fill";

function imgAttrs(priority: boolean) {
  return priority
    ? ({ loading: "eager", decoding: "sync", fetchPriority: "high" } as const)
    : ({
        loading: "lazy",
        decoding: "async",
        fetchPriority: "auto",
      } as const);
}

function Placeholder({
  className,
  label,
  sublabel,
}: {
  className?: string | undefined;
  label: string;
  sublabel?: string | undefined;
}) {
  return (
    <div
      className={`flex items-center justify-center border border-edge bg-surface-accent ${className}`}
    >
      <div className="px-4 text-center">
        <p className="font-mono text-[10px] uppercase tracking-widest text-content-faint">
          {label}
        </p>
        {sublabel && (
          <p className="font-mono text-[9px] text-content-faint">
            {sublabel}
          </p>
        )}
      </div>
    </div>
  );
}

const CloudinaryImg = memo<CloudinaryImgProps>(
  ({
    publicId,
    alt,
    className,
    priority = false,
    sizes = "(max-width: 768px) 100vw, 360px",
  }) => {
    const cloudName = import.meta.env.VITE_CLOUD_NAME;
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    if (!cloudName) {
      return (
        <Placeholder
          className={className}
          label="CONFIG_ERR"
          sublabel="MISSING_ENV"
        />
      );
    }

    if (hasError) {
      return (
        <Placeholder className={className} label="ASSET_OFFLINE" />
      );
    }

    const base = `https://res.cloudinary.com/${cloudName}/image/upload`;

    const srcSet = WIDTHS.map(
      (w) => `${base}/${TRANSFORMS},w_${w}/${publicId} ${w}w`,
    ).join(", ");

    return (
      <div
        className={`relative overflow-hidden bg-surface-accent ${className}`}
      >
        {!isLoaded && (
          <div className="absolute inset-0 z-0 animate-pulse bg-surface-accent" />
        )}

        <img
          src={`${base}/${TRANSFORMS},w_${FALLBACK_WIDTH}/${publicId}`}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          {...imgAttrs(priority)}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`relative z-10 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          width={FALLBACK_WIDTH}
          height={720}
        />
      </div>
    );
  },
);

CloudinaryImg.displayName = "CloudinaryImg";
export default CloudinaryImg;