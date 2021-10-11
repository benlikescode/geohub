import styled from 'styled-components'

const StyledMapPage = styled.div`
  .descriptionSection {
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .textWrapper {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .name {
    font-size: 24px;
  }

  .description {
    color: var(--color2);
    font-weight: 400;
  }

  .otherMapsWrapper {
    margin-top: 100px;
  }
  
  .otherMapsTitle {
    font-size: 20px;
  }

  .otherMaps {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-top: 10px;
  }
`

export default StyledMapPage
