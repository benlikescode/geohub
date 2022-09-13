import styled from 'styled-components'

type StyledProps = {}

const StyledAuth = styled.div<StyledProps>`
  .header {
    border-bottom: var(--border);
    padding: 20px 30px;
    text-align: center;
    position: relative;
    background-color: var(--background2);

    h2 {
      font-size: 20px;
      font-weight: 500;
    }
  }

  .closeBtn {
    position: absolute;
    top: 16px;
    right: 20px;
  }

  .mainContent {
    padding: 2rem 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #131314;
  }

  .buttonsWrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1rem 0;

    a {
      width: 80%;
    }
  }
`

export default StyledAuth
