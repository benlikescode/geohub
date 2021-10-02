import styled from 'styled-components'

const StyledNavbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  position: sticky;
  top: 0;
  z-index: 20;
  background-color: var(--background1);
  padding: 0 25px;
  border-bottom: var(--border);

  .title {
    color: #fff;
    font-weight: 500;
  }

  .rightWrapper {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .userInfo {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .username {
    color: #fff;
    font-size: 18px;
  }
`

export default StyledNavbar
