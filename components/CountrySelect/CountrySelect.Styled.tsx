import styled from 'styled-components'

const StyledCountrySelect = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  select {
    border: 1px solid #484848;
    height: 35px;
    border-radius: 4px;
    color: #fff;
    padding: 0 10px;
    background-color: #242424;
    appearance: none;
    cursor: pointer;
    padding-left: 14px;
    padding-right: 36px;
    font-size: 14px;

    :hover {
      background-color: #282828;
    }
  }

  .selectSuffix {
    display: inline-flex;
    position: absolute;
    right: 12px;
    pointer-events: none;
  }
`

export default StyledCountrySelect