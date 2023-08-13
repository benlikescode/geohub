import styled from 'styled-components'

const StyledResultMap = styled.div`
  height: calc(100vh - 250px);

  .map {
    height: 100%;
    width: 100%;
    position: relative;
  }

  .map-skeleton {
    height: calc(100vh - 300px);
    background-color: #999999;
    opacity: 0.08;
  }

  img[src$='#custom_marker'] {
    border: 2px solid #fff !important;
    border-radius: 50% !important;
  }
`

export default StyledResultMap
