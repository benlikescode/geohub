import styled from 'styled-components'

const StyledSlider = styled.div`
  input[type=range] {
    -webkit-appearance: none;
    width: 300px;
    background: transparent;
  }

  input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 15px;
    cursor: pointer;
    background: var(--background3);
    border-radius: 25px;
    border: 0px solid #000101;
  }

  input[type=range]::-webkit-slider-thumb {
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    border: 0px solid #000000;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #fff;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -2.5px;
  }

  input[type=range]::-moz-range-track {
    width: 100%;
    height: 15px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    background: var(--background3);
    border-radius: 25px;
    border: 0px solid #000101;
  }

  input[type=range]::-moz-range-thumb {
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    border: 0px solid #000000;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #fff;
    cursor: pointer;
  }

  input[type=range]::-ms-track {
    width: 100%;
    height: 15px;
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    border-width: 39px 0;
    color: transparent;
  }

  input[type=range]::-ms-fill-lower {
    background: var(--background3);
    border: 0px solid #000101;
    border-radius: 50px;
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
  }

  input[type=range]::-ms-fill-upper {
    background: var(--background3);
    border: 0px solid #000101;
    border-radius: 50px;
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
  }

  input[type=range]::-ms-thumb {
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    border: 0px solid #000000;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #fff;
    cursor: pointer;
  }
`

export default StyledSlider
