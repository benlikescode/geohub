import { FC, useEffect, useState } from 'react'
import { StyledProgressBar } from './'

type Props = {
  progress: number
  setProgressFinished?: (progressFinished: boolean) => void
}

const ProgressBar: FC<Props> = ({ progress, setProgressFinished }) => {
  const [currProgress, setCurrProgress] = useState(0)

  useEffect(() => {
    const animateDelay = setTimeout(() => {
      setCurrProgress(progress)
      setProgressFinished && setProgressFinished(true)
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
