import React, { FC } from 'react'
import ReactDOM from 'react-dom';
import { StyledSearchPopup } from '.'
import { Searchbar } from '../System';

type Props = {
  close: () => void;
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