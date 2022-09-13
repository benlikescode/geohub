import styled from 'styled-components'

const StyledAerialSettings = styled.div`
  .mainContent {
    padding: var(--modalPadding);
    display: grid;
    gap: 3rem;
    background-color: #101010;
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
