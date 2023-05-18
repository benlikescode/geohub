import { FC } from 'react'
import { Searchbar } from '@components/System'
import { StyledSearchPopup } from './'

type Props = {
  close: () => void
}

const SearchPopup: FC<Props> = ({ close }) => {
  return (
    <StyledSearchPopup>
      <div className="layerContainer">
        <div className="modal">
          <div className="modalBody">
            <Searchbar />
          </div>
        </div>
        <div className="backdrop" onClick={() => close()} />
      </div>
    </StyledSearchPopup>
  )
}

export default SearchPopup
