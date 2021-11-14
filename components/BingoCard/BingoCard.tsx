import { FC, useEffect, useState } from 'react'
import { StyledBingoCard } from '.'
import { BingoItem } from './BingoItem'

type Props = {
  bingoItems: string[]
  isVisible?: boolean
  foundItems: number[]
  setFoundItems: any
}

const BingoCard: FC<Props> = ({ bingoItems, isVisible, foundItems, setFoundItems }) => {

  const handleItemClick = (index: number) => {
    if (index !== 4) {
      if (foundItems.includes(index)) {
        const remove = foundItems.filter(item => item !== index)
        setFoundItems(remove)
      }
      else {
        setFoundItems(foundItems.concat(index)) 
      }  
    }  
  }

  useEffect(() => {
    if (hasWon()) {
      alert("You Won!")
    }

  }, [foundItems])

  const hasWon = () => {
    let won = false

    winners.forEach((winner) => {
      if (winner.every(w => foundItems.includes(w))) {
        won = true
      }
    })

    return won
  }

  const winners = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  return (
    <StyledBingoCard isVisible={isVisible}>
      <div className="card">
        <div className="lettersWrapper">
          <div className="bingoLetter">
            <span>G</span>
          </div>
          <div className="bingoLetter">
            <span>E</span>
          </div>
          <div className="bingoLetter">
            <span>O</span>
          </div> 
        </div>
         
        <div className="grid">
          {bingoItems.map((item, idx) => (
            <BingoItem 
              key={idx}
              index={idx} 
              item={item} 
              handleClick={handleItemClick}
              isActive={foundItems.includes(idx)}
            />                       
          ))}
        </div>
      </div>
    </StyledBingoCard>
  )
}

export default BingoCard
