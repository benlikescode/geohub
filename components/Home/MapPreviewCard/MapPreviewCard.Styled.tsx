import styled from 'styled-components'

type StyledProps = {
  mapImage: string
}

const StyledMapPreviewCard = styled.div<StyledProps>`
  width: 300px;
  height: 310px;
  border-radius: 12px;
  background-color: var(--background2);
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.07);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  .mapImage {
    height: 160px;
    width: 100%;
    border-radius: 11px;
    background: linear-gradient(180deg, rgba(25, 26, 27, 0) 0%, rgba(25, 26, 27, 0.57) 47.4%, #191A1B 100%), 
    url(${({ mapImage }) => mapImage});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .contentWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 18px;
    margin-top: -40px;
  }

  .mapName {
    font-size: 22px;
    font-weight: 600;
  }

  .mapDescription {
    color: var(--color5);
    font-weight: 400;
    line-height: 25px;
    text-align: center;
    padding: 0 35px;
  }

  .statsFooter {
    border-top: 1px solid var(--background4);
    height: 45px;
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
