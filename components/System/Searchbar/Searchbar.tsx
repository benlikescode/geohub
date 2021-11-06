import { SearchIcon } from '@heroicons/react/outline'
import { FC, useState } from 'react'
import { StyledSearchbar } from '.'
import { Icon } from '..'
import { SearchResultType } from '../../../types'
import { SearchOverlayCard } from './SearchOverlayCard'

type Props = {
  placeholder?: string
}

const Searchbar: FC<Props> = ({ placeholder }) => {
  const [input, setInput] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  const results: SearchResultType[] = [
    {avatar: '/images/avatars/default1.png', label: 'Wonder Woman', link: '/user/123'},
    {avatar: '/images/avatars/default2.png', label: 'Wocam52', link: '/user/1234'},
    {avatar: '/images/avatars/default3.png', label: 'wowzers21', link: '/user/1235'},
    {avatar: '/images/avatars/default4.png', label: 'WisonsinPro69', link: '/user/1236'},
    {avatar: '/images/mapPreviews/worldMap.jpg', label: 'World', link: '/map/world'},
    {avatar: '/images/avatars/default5.png', label: 'Wonderful Map', link: '/map/123'},
  ]

  const closeSearchOverlay = () => {
    setIsFocused(false)
  }

  return (
    <StyledSearchbar isFocused={isFocused}>
      <div className="searchbarWrapper" onClick={() => setIsFocused(true)}>
        <Icon size={20} fill="var(--color2)">
          <SearchIcon />
        </Icon>
        <input 
          type="text" 
          placeholder={placeholder ? placeholder : 'Search players or maps'} 
          onChange={(e) => setInput(e.currentTarget.value)} 
        />
      </div>

      {isFocused && 
        <SearchOverlayCard close={closeSearchOverlay} results={results}/>
      }
    
    </StyledSearchbar>
  )
}

export default Searchbar