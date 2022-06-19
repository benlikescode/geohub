import { FC, useEffect, useState } from 'react'
import { StyledProgressBar } from '.'

type Props = {
  progress: number
}

const ProgressBar: FC<Props> = ({ progress }) => {
  const [currProgress, setCurrProgress] = useState(0)

  useEffect(() => {
    const animateDelay = setTimeout(() => setCurrProgress(progress), 500)

    return () => clearTimeout(animateDelay)
  }, [])

  const getBackgroundColor = () => {
    if (progress < 30) {
      return 'var(--lightRed)'
    } else if (progress < 60) {
      return 'var(--lightYellow)'
    } else {
      return 'var(--lightGreen)'
    }
  }

  return (
    <StyledProgressBar progress={currProgress} backgroundColor={getBackgroundColor()}>
      <div className="progress"></div>
    </StyledProgressBar>
  )
}

export default ProgressBar
