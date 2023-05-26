import styled from 'styled-components'

type StyledProps = {}

const StyledSkeletonProfile = styled.div<StyledProps>`
  width: 100%;

  .skeleton-profile-details {
    max-width: 650px;
    margin: 0 auto;
    width: 100%;
    position: relative;
    z-index: 2;
    margin-top: -100px;
    padding: 20px;

    .skeleton-profile-heading {
      padding-bottom: 30px;
      margin-bottom: 30px;

      .skeleton-avatar-wrapper {
        background-color: #0e0e0e;
        width: 125px;
        height: 125px;
        border-radius: 50%;
        position: relative;
        box-shadow: 0 0 0 5px #0e0e0e;

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

      .skeleton-text-wrapper {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        margin-top: 1rem;
      }
    }
  }

  @media (max-width: 600px) {
    .skeleton-banner {
      height: 125px;
    }

    .skeleton-profile-details {
      margin-top: -45px;

      .skeleton-profile-heading {
        border: 0;
        margin-bottom: 0;

        .skeleton-avatar-wrapper {
          height: 75px;
          width: 75px;

          .skeleton-avatar {
            height: 75px;
            width: 75px;
          }
        }
      }
    }
  }
`

export default StyledSkeletonProfile
