import Image, { type ImageProps } from 'next/image'

export const Logo = ({
  className,
  ...props
}: Omit<ImageProps, 'src' | 'alt' | 'width' | 'height'>) => {
  return (
    <Image
      src="/Logo.jpg"
      alt="Al Ihsane — Centre Culturel et Cultuel Musulman de Colomiers"
      width={280}
      height={120}
      loading="lazy"
      className={className}
      {...props}
    />
  )
}
