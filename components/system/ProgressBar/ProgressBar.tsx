import { FC, useEffect, useState } from 'react'
import { StyledProgressBar } from './'

type Props = {
  progress: number
}

const ProgressBar: FC<Props> = ({ progress }) => {
  const [currProgress, setCurrProgress] = useState(0)

  useEffect(() => {
    const animateDelay = setTimeout(() => {
      setCurrProgress(progress)
    }, 200)

    return () => clearTimeout(animateDelay)
  }, [])

  const getBackgroundColor = () => {
    if (progress === 100) {
      return 'var(--lightGreen)'
    }

    return 'var(--mediumPurple)'
  }

  return (
    <StyledProgressBar progress={currProgress} backgroundColor={getBackgroundColor()}>
      <div className="progress"></div>
    </StyledProgressBar>
  )
}

export default ProgressBar
