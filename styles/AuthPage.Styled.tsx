import styled from 'styled-components'

const StyledAuthPage = styled.div`
  background: url('/images/authBackground.jfif');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;

  .title {
    font-weight: 400;
    font-size: 32px;
    text-align: center;
  }

  .inputGroup {
    display: grid;
    gap: 25px;
  }

  .errorMessage {
    color: var(--red-400);
    font-weight: 600;
    font-size: 14px;
    margin-top: 10px;
  }


  .divider {
    border-top: var(--borderLight);
    position: relative;
    left: auto;
    right: auto;
    margin: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 0;

    span {
      display: block;
      flex: 0 0 auto;
      padding: 4px;
      background: #fff;
      font-size: 12px;
      font-weight: 600;
      margin-top: -2px;
      color: var(--gray-600);
    }
  }

  .provider {
    border: var(--borderLight);
    border-radius: 4px;
    display: flex;
    align-items: center;
    height: 42px;
    cursor: pointer;
  }
  
  .providerLogo {
    height: 100%;
    width: 45px;
    position: relative;
    border-right: var(--borderLight);

    img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      object-fit: cover;
      border-radius: 50%;
      height: 100%;
      width: 100%;
    }
  }

  .providerName {
    color: #394151;
    font-weight: 600;
    width: 100%;
    text-align: center;
  }

  .providersWrapper {
    background-color: #fff;
  }

  
`

export default StyledAuthPage
