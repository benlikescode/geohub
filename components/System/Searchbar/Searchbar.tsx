import { SearchIcon } from '@heroicons/react/outline'
import { FC, useState } from 'react'
import { StyledSearchbar } from '.'
import { Icon } from '..'

type Props = {
  placeholder?: string
}

const Searchbar: FC<Props> = ({ placeholder }) => {
  const [input, setInput] = useState("")

  return (
    <StyledSearchbar>
      <Icon size={20} fill="var(--color2)">
        <SearchIcon />
      </Icon>
      <input 
        type="text" 
        placeholder={placeholder ? placeholder : 'Search players or maps'} 
        onChange={(e) => setInput(e.currentTarget.value)} 
      />
    </StyledSearchbar>
  )
}

export default Searchbar