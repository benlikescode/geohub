import styled from 'styled-components'

const StyledSelect = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  select {
    border: 1px solid #202020;
    width: 150px;
    height: 35px;
    border-radius: 4px;
    color: #fff;
    padding: 0 10px;
    background-color: #121212;
    appearance: none;
    cursor: pointer;
    padding-left: 14px;
    padding-right: 36px;
    font-size: 14px;
  }

  .selectSuffix {
    display: inline-flex;
    position: absolute;
    right: 12px;
    pointer-events: none;
  }
`

export default StyledSelect