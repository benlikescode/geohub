import React, { FC, useState } from 'react'

import { CheckIcon } from '@heroicons/react/outline'

import { StyledCheckbox } from './'
import { HiddenCheckbox } from './Checkbox.Styled'

type Props = {
  isChecked: boolean
  setChecked: (isChecked: boolean) => void
  label: string
}

const Checkbox: FC<Props> = ({ isChecked, setChecked, label }) => {
  return (
    <StyledCheckbox onClick={() => setChecked(!isChecked)}>
      <div className="checkbox">
        {isChecked && (
          <div className="checkIcon">
            <CheckIcon />
          </div>
        )}
      </div>

      <label>{label}</label>
    </StyledCheckbox>
  )
}

export default Checkbox
