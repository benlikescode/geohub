import styled from 'styled-components'

type StyledProps = {}

const StyledSelectionMap = styled.div<StyledProps>`
  height: 100%;
  background-color: #222;
  flex: 3 1;
  position: relative;
  border-right: 2px solid #0e0e0e;

  .selection-map {
    height: calc(100% - 60px);
    width: 100%;
  }

  .cursor-pointer {
    cursor: pointer !important;
  }
`

export default StyledSelectionMap
