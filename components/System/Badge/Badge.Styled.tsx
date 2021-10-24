import styled from 'styled-components'

type StyledProps = {
  borderColor: string
}

const StyledBadge = styled.div<StyledProps>`
  height: 76px;
  width: 76px;
  
  svg{
    width:100%;
  }

  #hex{
    stroke-width: 4;
    stroke: ${({ borderColor }) => `var(--${borderColor})`};
    fill-opacity: 1;
  }

  svg:hover #hex {
    fill-opacity: 0.8;
  }

  #text{
    stroke-width: 1;
    stroke: #fdfdfd;
    fill-opacity: 1;
  }

  svg:hover #text{
    fill-opacity: 1;
  }



  
`

export default StyledBadge
