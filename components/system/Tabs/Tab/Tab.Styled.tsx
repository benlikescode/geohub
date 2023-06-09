import styled from 'styled-components'

type StyledProps = {
  isActive?: boolean
}

const StyledTab = styled.div<StyledProps>`
  cursor: pointer;
  line-height: 1.8;
  margin: 0px;
  padding: 8px 12px;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ isActive }) => (isActive ? '#fff' : '#737373')};
  border-bottom: ${({ isActive }) => (isActive ? '2px solid #fff' : '2px solid transparent')};
  margin-bottom: -1px;

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
