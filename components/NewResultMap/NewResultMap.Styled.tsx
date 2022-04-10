import styled from 'styled-components'
import 'mapbox-gl/dist/mapbox-gl.css'

type StyledProps = {
  userAvatar: string;
}

const StyledNewResultMap = styled.div<StyledProps>`
  height: calc(100vh - 300px);

  .resultMap {
    height: calc(100vh - 300px);
    width: 100%;
  }

  .guessMarker {
    background-image: ${({ userAvatar }) => `url(/images/markers/${userAvatar}.png)`};
    background-size: cover;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    cursor: pointer;
  }

  .actualMarker {
    background-image: url('/images/markers/actualMarker.png');
    background-size: cover;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    cursor: pointer;
  }
`

export default StyledNewResultMap