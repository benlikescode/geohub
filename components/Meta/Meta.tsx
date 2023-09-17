import NextHead from 'next/head'
import { FC } from 'react'

type Props = {
  title?: string
  description?: string
  ogUrl?: string
  ogImage?: string
}

const Meta: FC<Props> = ({ title, description, ogUrl, ogImage }) => {
  const defaultTitle = 'GeoHub'
  const defaultDescription =
    'GeoHub is a free to play geography game that tests your ability to recognize where you are in the world.'
  const defaultOGURL = 'https://www.geohub.gg'
  const defaultOGImage = '/og-image.png'

  return (
    <NextHead>
      <meta charSet="utf-8" />
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#0e0e0e" />

      <link rel="icon" href="/favicon.ico" sizes="32x32" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />

      <meta property="og:url" content={ogUrl || defaultOGURL} />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:site_name" content={title || defaultTitle} />
      <meta property="og:image" content={ogImage || defaultOGImage} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={description || defaultDescription} />

      <meta name="twitter:image" content={ogImage || defaultOGImage} />
      <meta name="twitter:url" content={ogUrl || defaultOGURL} />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
    </NextHead>
  )
}

export default Meta
