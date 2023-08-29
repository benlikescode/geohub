import styled from 'styled-components'

type StyledProps = {
  isActive?: boolean
}

const StyledTab = styled.div<StyledProps>`
  cursor: pointer;
  line-height: 1.8;
  margin: 0px;
  padding: 4px;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ isActive }) => (isActive ? '#a7a7a7' : '#737373')};
  border-bottom: ${({ isActive }) => (isActive ? '2px solid #a7a7a7' : '2px solid transparent')};

  span {
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    user-select: none;
  }
`

export default StyledTab
