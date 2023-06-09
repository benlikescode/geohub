import styled from 'styled-components'

const StyledSelect = styled.div`
  label {
    font-weight: 400;
    margin-bottom: 8px;
    display: block;
    color: #919191;
    font-size: 14px;
  }

  .select-wrapper {
    position: relative;
    display: flex;
    align-items: center;

    select {
      border: 1px solid #202020;
      width: 100%;
      height: 38px;
      border-radius: 5px;
      padding: 0 14px;
      color: var(--color3);
      background-color: var(--background3);
      appearance: none;
      cursor: pointer;
      /* padding-right: 36px; */
      transition: background-color 240ms, box-shadow 240ms;
      border: 1px solid #282828;
      font-size: 15px;
    }

    .selectSuffix {
      display: inline-flex;
      position: absolute;
      right: 12px;
      pointer-events: none;
    }
  }
`

export default StyledSelect
