import React, { FC, useState } from 'react'

import { CheckIcon } from '@heroicons/react/outline'

import { StyledCheckbox } from './'
import { HiddenCheckbox } from './Checkbox.Styled'

type Props = {
  isChecked: boolean;
  setChecked: (isChecked: boolean) => void;
}

const Checkbox: FC<Props> = ({ isChecked, setChecked }) => {
  return (
    <StyledCheckbox onClick={() => setChecked(!isChecked)}>
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