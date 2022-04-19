import styled from 'styled-components'

const StyledAerialSettings = styled.div`
  background-color: var(--background1);
  border-radius: 4px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  max-width: 650px;

  .header {
    border-bottom: var(--border);
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 30px;
    
    h2 {
      font-size: 20px;
      font-weight: 500;
    }
  }

  .mainContent {
    padding: 30px;
    display: grid;
    gap: 50px;
    background-color: #131314;
  }

  .mapInfo {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .mapName {
    font-size: 20px;
  }

  .mapDescription {
    color: var(--color2);
    font-weight: 400;  
  }

  .difficultyWrapper {
    display: grid;
    gap: 1rem;
  }

  .difficultyOption {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--color2);
    font-weight: 400;
    user-select: none;
  }

  .footer {
    border-top: var(--border);
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 15px;
    padding: 15px 30px;
  }

  .flexTest {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .gameOptions {
    display: flex;
    justify-content: space-between;

    label {
      font-weight: 400;
    }
  }

  .countrySelector {
    label {
      display: block;
      margin-bottom: 1rem;
    }
  }
`

export default StyledAerialSettings