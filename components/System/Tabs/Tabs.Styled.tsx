import styled from 'styled-components'

type StyledProps = {}

const StyledTabs = styled.div<StyledProps>`
  display: flex;
  align-items: center;
  gap: 30px;
  position: relative;

  /*
  &:before {
    content: '';
    border-radius: 2px;
    bottom: 0px;
    margin: 0px;
    position: absolute;
    width: inherit;
    left: 8px;
    right: 8px;
    height: 2px;
    background-color: #222;
  }
  */
`

export default StyledTabs
