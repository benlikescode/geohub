import Image from 'next/image'
import { FC } from 'react'
import { StyledNotFound } from './'

type Props = {
  title?: string
  message?: string
}

const NotFound: FC<Props> = ({ title, message }) => {
  return (
    <StyledNotFound>
      <div className="no-results-container">
        <Image src="/images/not-found.png" height={250} width={250} alt="Cartoon man holding a map" />

        <h2>{title || `404 - Page Not Found`}</h2>
        <h3>{message || `Hmm... this page is not on our map.`}</h3>
      </div>
    </StyledNotFound>
  )
}

export default NotFound
