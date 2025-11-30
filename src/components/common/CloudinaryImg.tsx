import { memo } from 'react'

interface CloudinaryImgProps {
  publicId: string
  alt: string
  className?: string
  width?: number
  height?: number
}

const CloudinaryImg = memo<CloudinaryImgProps>(({ publicId, alt, className }) => {
  const cloudName = import.meta.env.VITE_CLOUD_NAME
  
  if (!cloudName) {
    // eslint-disable-next-line no-console
    console.error('Cloudinary Cloud Name is missing in .env file')
    return null
  }

  // Base URL for image optimization
  // f_auto: auto format (webp/avif)
  // q_auto: auto quality
  // c_limit: resize but don't crop if not needed
  const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,c_limit`

  // Generate responsive variants
  const srcSet = `
    ${baseUrl},w_640/${publicId} 640w,
    ${baseUrl},w_960/${publicId} 960w,
    ${baseUrl},w_1280/${publicId} 1280w,
    ${baseUrl},w_1600/${publicId} 1600w
  `

  return (
    <img
      src={`${baseUrl},w_1280/${publicId}`} // Fallback
      srcSet={srcSet}
      // Sizes logic: 
      // - Mobile: 100% width
      // - Tablet: 50% width
      // - Desktop: 33% width
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      alt={alt}
      className={className}
      loading="lazy"
      width="1280"
      height="720"
    />
  )
})

CloudinaryImg.displayName = 'CloudinaryImg'
export default CloudinaryImg