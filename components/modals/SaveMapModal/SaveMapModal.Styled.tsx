import styled from 'styled-components'

type StyledProps = {}

const StyledSaveMapModal = styled.div<StyledProps>`
  padding: 30px 20px;
  display: grid;
  gap: 30px;

  .publish-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;

    .publish-text {
      display: grid;

      .publish-header {
        font-size: 14px;
        font-weight: 400;
        color: #dcdcdc;
        margin-bottom: 6px;
      }

      .publish-subheader {
        color: #999;
        font-weight: 400;
        font-size: 14px;
      }
    }
  }

  .changes-wrapper {
    display: flex;
    align-items: center;
    gap: 12px;

    .change-box {
      border-radius: 6px;
      padding: 6px;
      background-color: #282828;
      color: #999;
      font-weight: 400;
      font-size: 14px;
      width: fit-content;
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
  }
`

export default StyledSaveMapModal
