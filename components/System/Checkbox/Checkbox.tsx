import { CheckIcon } from '@heroicons/react/outline'
import React, { FC, useState } from 'react'
import { StyledCheckbox } from '.'
import { Icon } from '..'
import { HiddenCheckbox } from './Checkbox.Styled'

type Props = {
  setChecked: any
  isDisabled?: boolean
}

const Checkbox: FC<Props> = ({ setChecked, isDisabled }) => {
  const [isChecked, setIsChecked] = useState(true)

  const onClick = () => {
    setIsChecked(!isChecked)
    setChecked(!isChecked) 
  }

  return (
    <StyledCheckbox onClick={() => onClick()}>
      <HiddenCheckbox />
      {isChecked &&
        <div className="checkIcon">
          <CheckIcon />
        </div>
      }   
    </StyledCheckbox>
  )
}

export default Checkbox