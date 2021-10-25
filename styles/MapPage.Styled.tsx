import styled from 'styled-components'

const StyledMapPage = styled.div`
  main {
    display: flex;
    flex-direction: column;
    gap: 50px;
  }

  .name {
    font-size: 24px;
  }

  .description {
    color: var(--color2);
    font-weight: 400;
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

  .mapDetailsSection {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }

  .mapDescription {
    display: flex;
    gap: 25px;
    padding: 25px 30px;
  }

  .descriptionColumnWrapper {
    display: flex;
    flex-direction: column;
    gap: 25px;
    margin-top: 15px;
  }

  .descriptionColumn {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`

export default StyledMapPage
