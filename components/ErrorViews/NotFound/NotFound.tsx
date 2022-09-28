/* eslint-disable @next/next/no-img-element */
import React, { FC } from 'react'

import { StyledNotFound } from './'

type Props = {}

const NotFound: FC<Props> = ({}) => {
  return (
    <StyledNotFound>
      <div className="no-results-container">
        <img
          src="https://ouch-cdn2.icons8.com/7ouKWLmWN1-WhDpK28kH-TnrGhfKQEz3GZvo7zr7VsM/rs:fit:256:256/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvNzY4/LzFkYjE2MmU4LTM5/NDQtNDhhMS04ZGJh/LTc0ZDc1MGYxN2E2/Yy5zdmc.png"
          alt=""
        />
        <h2>404 - Page Not Found</h2>
        <h3>Hmm... this page is not on our map.</h3>
      </div>
    </StyledNotFound>
  )
}

export default NotFound
