import styled from 'styled-components'

const StyledSlider = styled.div`
  input[type=range] {
    -webkit-appearance: none;
    width: 300px;
    background: transparent;
  }

  input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 10px;
    cursor: pointer;
    background: var(--background4);
    border-radius: 20px;
    border: 0px solid #000101;
  }

  input[type=range]::-webkit-slider-thumb {
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    border: 0px solid #000000;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: var(--color2);
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -5px;
  }

  input[type=range]::-moz-range-track {
    width: 100%;
    height: 10px;
    cursor: pointer;
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    background: var(--background4);
    border-radius: 20px;
    border: 0px solid #000101;
  }

  input[type=range]::-moz-range-thumb {
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    border: 0px solid #000000;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: var(--color2);
    cursor: pointer;
  }

  input[type=range]::-ms-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    border-width: 39px 0;
    color: transparent;
  }

  input[type=range]::-ms-fill-lower {
    background: var(--background4);
    border: 0px solid #000101;
    border-radius: 50px;
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
  }

  input[type=range]::-ms-fill-upper {
    background: var(--background4);
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
    background: var(--color2);
    cursor: pointer;
  }
`

export default StyledSlider
