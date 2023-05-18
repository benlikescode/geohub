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
  }
`

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

export default StyledCheckbox
