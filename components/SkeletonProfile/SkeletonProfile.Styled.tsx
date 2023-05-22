import styled from 'styled-components'

type StyledProps = {}

const StyledSkeletonProfile = styled.div<StyledProps>`
  width: 100%;

  .profile-details {
    max-width: 600px;
    margin: 0 auto;
    width: 100%;
    position: relative;
    z-index: 2;
    margin-top: -60px;

    .profile-heading {
      padding-bottom: 30px;
      margin-bottom: 30px;
      border-bottom: 1px solid rgb(255, 255, 255, 0.1);

      .profile-avatar {
        background-color: red;
        width: 125px;
        height: 125px;
        border-radius: 50%;
        position: relative;
        box-shadow: 0 0 0 5px #0e0e0e;

        img {
          position: absolute;
          object-fit: cover;
          border-radius: 50%;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        &::after {
          content: '';
          position: absolute;
          z-index: 1;
          border-radius: 50%;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          box-shadow: inset 0 0 0 1px rgb(255, 255, 255, 0.1);
        }
      }

      .profile-text-wrapper {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        margin-top: 1rem;
      }
    }
  }
`

export default StyledSkeletonProfile
