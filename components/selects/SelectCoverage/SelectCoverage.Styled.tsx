import styled from 'styled-components'

type StyledProps = {}

const StyledSelectCoverage = styled.div<StyledProps>`
  .SelectTrigger {
    display: inline-flex;
    align-items: center;
    border-radius: 3px;
    padding: 0 15px;
    font-size: 13px;
    line-height: 1;
    height: 38px;
    gap: 5px;
    background-color: #333;
    color: #dcdcdc;
    min-width: 185px;
    position: relative;
    box-shadow: 0 0 0 1px #434343;

    &:hover {
      background-color: #383838;
    }
  }

  .SelectTrigger[data-placeholder] {
    color: #dcdcdc;
  }

  .SelectIcon {
    color: #999;
    position: absolute;
    right: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    svg {
      height: 20px;
    }
  }

  .SelectContent {
    overflow: hidden;
    background-color: #333;
    border-radius: 6px;
    box-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);
    z-index: 99;
    box-shadow: 0 0 0 1px #434343;
    min-width: 185px;
  }

  .SelectViewport {
    padding: 5px;
  }

  .SelectItem {
    font-size: 13px;
    line-height: 1;
    color: #dcdcdc;
    border-radius: 3px;
    display: flex;
    align-items: center;
    padding: 10px 35px 10px 15px;
    position: relative;
    user-select: none;
    font-weight: 400;
  }

  .SelectItem[data-disabled] {
    color: #aaa;
    pointer-events: none;
  }

  .SelectItem[data-highlighted] {
    outline: none;
    background-color: #434343;
    color: #fff;
  }

  .SelectLabel {
    padding: 0 15px;
    font-size: 12px;
    line-height: 25px;
    color: #949494;
  }

  .SelectSeparator {
    height: 1px;
    background-color: #505050;
    margin: 5px;
  }

  .SelectItemIndicator {
    position: absolute;
    right: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    svg {
      height: 16px;
    }
  }
`

export default StyledSelectCoverage
