import styled from 'styled-components'

type StyledProps = {
  activeColor?: string
  inActiveColor?: string
  circleColor?: string
}

const StyledToggleSwitch = styled.div<StyledProps>`
  .switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 24px;

    input {
      opacity: 0;
      width: 0;
      height: 0;
    }
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ inActiveColor }) => inActiveColor ?? '#424242'};
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 34px;

    :before {
      position: absolute;
      content: '';
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: ${({ circleColor }) => circleColor ?? '#fff'};
      -webkit-transition: 0.4s;
      transition: 0.4s;
      border-radius: 50%;
    }
  }

  input:checked + .slider {
    background-color: ${({ activeColor }) => activeColor ?? 'var(--mediumPurple)'};
  }

  input:focus + .slider {
    box-shadow: 0 0 1px ${({ activeColor }) => activeColor ?? '#8054FF'};
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(16px);
    -ms-transform: translateX(16px);
    transform: translateX(16px);
  }
`

export default StyledToggleSwitch
