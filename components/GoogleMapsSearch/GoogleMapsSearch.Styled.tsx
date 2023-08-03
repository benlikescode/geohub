import styled from 'styled-components'

type StyledProps = {}

const StyledGoogleMapsSearch = styled.div<StyledProps>`
  max-width: 300px;
  width: 100%;
  position: relative;

  .searchbar-wrapper {
    display: flex;
    align-items: center;
    height: 38px;
    border-radius: 3px;
    background-color: #333;
    color: #dcdcdc;
    position: relative;
    box-shadow: 0 0 0 1px #434343;

    input {
      color: #d1d1d1;
      width: 100%;
      pointer-events: all;
      height: 100%;
      background: transparent;
      font-weight: 400;
      padding-left: 10px;
      padding-right: 35px;
      font-size: 13px;
      position: relative;
      top: 1px;

      &::placeholder {
        color: ${({ theme }) => theme.color.gray[400]};
        font-weight: 400;
        font-size: 13px;
      }
    }

    .search-icon {
      color: #999;
      position: absolute;
      right: 8px;
      display: inline-flex;
      align-items: center;
      justify-content: center;

      svg {
        height: 18px;
      }
    }
  }

  .results-wrapper {
    width: 100%;
    background-color: #333;
    color: var(--color3);
    position: absolute;
    top: 40px;
    z-index: 9999999;
    pointer-events: all;
    border-radius: 6px;
    box-shadow: 0 0 0 1px #434343;
    padding: 4px;

    .result-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 14px;
      font-weight: 400;
      cursor: pointer;
      padding: 12px;
      border-radius: 6px;

      span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      :hover {
        background-color: #434343;
      }

      .result-item-place {
        color: #dcdcdc;
      }

      .result-item-country {
        color: #949494;
      }
    }
  }
`

export default StyledGoogleMapsSearch
