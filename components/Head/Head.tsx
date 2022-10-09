import NextHead from 'next/head'
import React, { FC } from 'react'

type Props = {
  title?: string
  description?: string
  ogUrl?: string
  ogImage?: string
}

const Head: FC<Props> = ({ title, description, ogUrl, ogImage }) => {
  const defaultTitle = 'GeoHub'
  const defaultDescription = 'A fun geography guessing game'
  const defaultOGURL = ''
  const defaultOGImage = ''

  return (
    <NextHead>
      <meta charSet="UTF-8" />
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#0e0e10" />

      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#9f00a7" />
      <meta name="theme-color" content="#ffffff" />

      <meta property="og:url" content={ogUrl || defaultOGURL} />
      <meta property="og:title" content={title || ''} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta name="twitter:site" content={ogUrl || defaultOGURL} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={ogImage || defaultOGImage} />
      <meta property="og:image" content={ogImage || defaultOGImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
    </NextHead>
  )
}

export default Head
