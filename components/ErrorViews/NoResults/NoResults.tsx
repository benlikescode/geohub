/* eslint-disable @next/next/no-img-element */
import React, { FC } from 'react'

import { StyledNoResults } from './'

type Props = {
  message: string
}

const NoResults: FC<Props> = ({ message }) => {
  return (
    <StyledNoResults>
      <img
        src="https://ouch-cdn2.icons8.com/7ouKWLmWN1-WhDpK28kH-TnrGhfKQEz3GZvo7zr7VsM/rs:fit:256:256/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvNzY4/LzFkYjE2MmU4LTM5/NDQtNDhhMS04ZGJh/LTc0ZDc1MGYxN2E2/Yy5zdmc.png"
        alt=""
      />
      <h2>Woah... you must have turned onto a street with no coverage</h2>
      <h3>{message}</h3>
    </StyledNoResults>
  )
}

export default NoResults
