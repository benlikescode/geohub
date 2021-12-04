import styled from 'styled-components'

type StyledProps = {
  isActive: boolean
}

const StyledItem = styled.div<StyledProps>`
  border-radius: 50%;

  :hover {
    background-color: #292929;
  }
  
  
`

export default StyledItem
