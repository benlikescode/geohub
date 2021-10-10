import { FC } from 'react'
import { StyledProgressBar } from '.'

type Props = {
  progress: number
}

const ProgressBar: FC<Props> = ({ progress }) => {

  const getBackgroundColor = () => {
    if (progress < 30) {
      return 'var(--lightRed)'
    }
    else if (progress < 60) {
      return 'var(--lightYellow)'
    }
    else {
      return 'var(--lightGreen)'
    }
  }

  return (
    <StyledProgressBar progress={progress} backgroundColor={getBackgroundColor()}>
      <div className="progress"></div>
    </StyledProgressBar>
  )
}

export default ProgressBar
