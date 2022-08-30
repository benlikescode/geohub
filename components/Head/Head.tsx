import React, { FC } from 'react'
import NextHead from 'next/head'

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
      <link rel="icon" sizes="192x192" href="/static/touch-icon.png" />
      <link rel="apple-touch-icon" href="/static/touch-icon.png" />
      <link rel="mask-icon" href="/static/favicon-mask.svg" color="#49B882" />
      <link rel="icon" href="/static/favicon.ico" />
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
