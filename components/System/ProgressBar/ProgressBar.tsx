import { FC } from 'react'
import { StyledProgressBar } from '.'

type Props = {
  progress: number
}

const ProgressBar: FC<Props> = ({ progress }) => {

  const getBackgroundColor = () => {
    if (progress < 30) {
      return '#F87171'
    }
    else if (progress < 60) {
      return '#FCD34D'
    }
    else {
      return '#10B981'
    }
  }

  return (
    <StyledProgressBar progress={progress} backgroundColor={getBackgroundColor()}>
      <div className="progress"></div>
    </StyledProgressBar>
  )
}

export default ProgressBar
