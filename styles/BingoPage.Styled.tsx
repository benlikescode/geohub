import styled from 'styled-components'

const StyledBingoPage = styled.div`
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

  .mapDescriptionWrapper {
    display: flex;
    gap: 25px;
    padding: 35px 30px;
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

  .bingoCard {
    height: 170px;
    width: 170px;
    margin-right: 50px;
    position: relative;

    img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }

  .bingoSuggestion {
    display: flex;
    justify-content: center;
    gap: 200px;
    height: 100%;
    padding: 30px;
  }

  .suggestionTitle {
    font-weight: 600;
    font-size: 28px;
  }
  
  .checkListSection {
    margin-top: 40px;

    h4 {
      color: #BABABA;
      font-weight: 600;
    }
  }

  .checkList {
    margin-top: 20px;
    display: grid;
    gap: 15px;
  }

  .checkIcon {
    background-color: #079E73;
    height: 22px;
    width: 22px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .checkListItem {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .checkListLabel {
    font-weight: 400;
    color: #808080;
    font-size: 14px;
  }

  .suggestionForm {
    display: grid;
    gap: 25px;
    width: 400px;
  }
`

export default StyledBingoPage

