import { memo, useState } from 'react'

interface CloudinaryImgProps {
  publicId: string
  alt: string
  className?: string
  priority?: boolean
}

const CloudinaryImg = memo<CloudinaryImgProps>(({ publicId, alt, className, priority = false }) => {
  // Access environment variable directly now that types are fixed
  const cloudName = import.meta.env.VITE_CLOUD_NAME
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  
  if (!cloudName) {
    return (
      <div className={`flex items-center justify-center bg-bg-acc border border-border-main ${className}`}>
        <div className="text-center px-4">
          <p className="font-mono text-[10px] text-red-500 uppercase tracking-widest">CONFIG_ERR</p>
          <p className="font-mono text-[9px] text-text-muted">MISSING_ENV</p>
        </div>
      </div>
    )
  }

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-bg-acc border border-border-main ${className}`}>
        <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest">ASSET_OFFLINE</p>
      </div>
    )
  }

  const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,c_limit`

  const srcSet = `
    ${baseUrl},w_640/${publicId} 640w,
    ${baseUrl},w_960/${publicId} 960w,
    ${baseUrl},w_1280/${publicId} 1280w
  `

  return (
    <div className={`relative overflow-hidden bg-bg-acc ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-bg-acc animate-pulse z-0" />
      )}
      
      <img
        src={`${baseUrl},w_1280/${publicId}`}
        srcSet={srcSet}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-700 ease-in-out z-10 relative ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        width="1280"
        height="720"
      />
    </div>
  )
})

CloudinaryImg.displayName = 'CloudinaryImg'
export default CloudinaryImg