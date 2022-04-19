import React, { FC } from 'react'
import { StyledCountrySelect } from '.'
import * as countries from '../../utils/constants/countries.json'

type Props = {
  onChange: (country: any) => void;
}

const CountrySelect: FC<Props> = ({ onChange }) => {
  return (
    <StyledCountrySelect>
      <select onChange={(e) => onChange(e.currentTarget.options[e.currentTarget.options.selectedIndex].getAttribute('data-key'))}>
        <option key={0} data-key="">All countries (default)</option>
        {countries.map((option, idx) => (
          <option key={idx + 1} data-key={option.code}>{option.name}</option>
        ))}
      </select>
      <span className="selectSuffix">
        <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" shapeRendering="geometricPrecision"><path d="M17 8.517L12 3 7 8.517M7 15.48l5 5.517 5-5.517"></path></svg>
      </span>
    </StyledCountrySelect>
  )
}

export default CountrySelect