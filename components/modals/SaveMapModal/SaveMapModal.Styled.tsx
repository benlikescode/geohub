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
`

export default StyledSaveMapModal
