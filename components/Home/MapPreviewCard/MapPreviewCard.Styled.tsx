import styled from 'styled-components'

const StyledMapPreviewCard = styled.div`
  width: 350px;
  height: 400px;
  border-radius: 4px;
  background-color: var(--background2);
  position: relative;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  .mapImage {
    height: 150px;
    width: 100%;
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

  .contentWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
  }

  .mapName {
    font-size: 20px;
  }

  .mapDescription {
    color: var(--color2);
    font-weight: 400;
    line-height: 22px;
    text-align: center;
  }

  .statsFooter {
    border-top: var(--border);
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    position: absolute;
    bottom: 0;
    width: 100%;
  }

  .statItem {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
  }
  
`

export default StyledMapPreviewCard
