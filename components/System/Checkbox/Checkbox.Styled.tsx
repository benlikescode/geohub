import styled from 'styled-components'

const StyledCheckbox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;

  .checkbox {
    background: var(--background3);
    height: 24px;
    width: 24px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;

    .checkIcon {
      height: 16px;
      width: 16px;
      color: #fff;
    }
  }

  label {
    cursor: pointer;
    font-size: 13px;
  }
`

export default StyledCheckbox
