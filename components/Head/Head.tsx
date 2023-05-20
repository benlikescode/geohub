import NextHead from 'next/head'
import { FC } from 'react'

type Props = {
  title?: string
  description?: string
  ogUrl?: string
  ogImage?: string
}

const Head: FC<Props> = ({ title, description, ogUrl, ogImage }) => {
  const defaultTitle = 'GeoHub'
  const defaultDescription = 'A fun geography guessing game'
  const defaultOGURL = 'https://geohub.vercel.app/'
  const defaultOGImage = '/images/og-image.png'

  return (
    <NextHead>
      <meta charSet="utf-8" />
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="var(--background1)" />

      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#9f00a7" />

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

export default Head
