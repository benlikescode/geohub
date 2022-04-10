import { FC } from 'react';
import styled from 'styled-components'

const StyledMarker = styled.div`
  background-image: url('/images/markers/actualMarker.png');
  background-size: cover;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
`

const Marker = () => {
  return (
    <StyledMarker>
      <div>1</div>
    </StyledMarker>
  )
}

export default Marker