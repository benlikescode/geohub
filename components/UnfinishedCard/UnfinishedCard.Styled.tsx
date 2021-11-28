import styled from 'styled-components'

const StyledUnfinishedCard = styled.div`
  background-color: var(--background2);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  padding: 1.5rem;
  display: grid;

  .mapWrapper {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .mapName {
    color: var(--color1);
    font-size: 1.25rem;
  }

  .bottomWrapper {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding-left: 50px;
  }

  .gameInfo {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .divider {
    background: #2F3133;
    width: 1px;
    height: 17px;
  }

  .gameInfoItem {
    font-weight: 400;
    color: var(--color3);
  }

  .deleteBtn {
    background-color: var(--red-500);
    color: #fff;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: 3px;
    height: 35px;
    padding: 0 15px;
    font-size: 1rem;
    font-weight: 500;
    width: 100%;
    user-select: none;
  }

  .resumeBtn {
    background-color: var(--mediumPurple);
    color: #fff;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: 3px;
    height: 35px;
    padding: 0 25px;
    font-size: 1rem;
    font-weight: 500;
    width: 100%;
    user-select: none;
  }
`

export default StyledUnfinishedCard
