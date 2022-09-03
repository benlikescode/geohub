import { FC } from 'react'

import { StyledBingoItem } from './'

type Props = {
  index: number
  item: string
  handleClick: (index: number) => void
  isActive?: boolean
}

const BingoItem: FC<Props> = ({ index, item, handleClick, isActive }) => {
  return (
    <StyledBingoItem isActive={isActive}>
      <button onClick={() => handleClick(index)}>
        <span>{item}</span>
      </button>
    </StyledBingoItem>
  )
}

export default BingoItem
