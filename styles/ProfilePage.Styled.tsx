import styled from 'styled-components'

const StyledProfilePage = styled.div`
  .banner {
    width: 100%;
    height: 200px;
    background-color: rgb(255, 255, 255, 0.02);
    border-radius: 10px;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      z-index: 1;
      border-radius: 10px;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      box-shadow: inset 0 0 0 1px rgb(255, 255, 255, 0.1);
    }
  }

  .profile-details {
    max-width: 600px;
    margin: 0 auto;
    width: 100%;
    position: relative;
    z-index: 2;
    margin-top: -60px;
    padding-bottom: 30px;
    border-bottom: 1px solid rgb(255, 255, 255, 0.1);

    .profile-avatar {
      background-color: #0e0e10;
      width: 125px;
      height: 125px;
      border-radius: 50%;
      position: relative;
      box-shadow: 0 0 0 5px #0e0e10;

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

    .profile-name {
      margin-top: 20px;
      font-size: 28px;
      font-weight: 600;

      input {
        font-size: 28px;
        font-weight: 600;
        color: white;
        border-radius: 2px;
        width: 100%;
        background: rgb(255, 255, 255, 0.05);
        box-shadow: 0 0 0 2px rgb(255, 255, 255, 0.05);
      }
    }

    .profile-bio {
      display: block;
      margin-top: 6px;
      color: rgb(255, 255, 255, 0.5);

      textarea {
        color: rgb(255, 255, 255, 0.5);
        font-weight: 500;
        width: 100%;
        border-radius: 2px;
        background: rgb(255, 255, 255, 0.05);
        box-shadow: 0 0 0 2px rgb(255, 255, 255, 0.05);
        resize: vertical;
      }
    }

    .profile-actions {
      margin-top: 30px;
      display: flex;

      button {
        padding: 1px 14px 0 14px;
        font-weight: 500;
        user-select: none;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        transition: 0.2s;
        border-radius: 6px;
        min-width: 75px;
        background-color: rgb(255, 255, 255, 0.1);
        color: rgb(255, 255, 255, 0.7);
  
        span {
          position: relative;
          top: 1px;
        }
  
        svg {
          height: 20px;
          position: relative;
          top: -1px;
          margin-right: 8px;
        }
  
        &:hover {
          cursor: pointer;
          background-color: rgb(255, 255, 255, 0.15);
        }

        &:not(:last-child) {
          margin-right: 10px;
        }

        &.logout-btn {
          color: #fee2e2;
          background-color: #7f1d1d;
  
          &:hover {
            background-color: #991b1b;
          }
        }
      }
    }
  }

  .edit-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 3px;
    vertical-align: bottom;
    margin-left: 4px;
    background-color: rgb(255, 255, 255, 0.1);
    color: rgb(255, 255, 255, 0.8);
    transition: 0.2s;

    svg {
      height: 16px;
    }

    &:hover {
      background-color: rgb(255, 255, 255, 0.15);
      color: rgb(255, 255, 255, 0.9);
    }
  }

  // .profileWrapper {
  //   border: 1px solid #141414;
  //   border-radius: 12px;
  //   background: #0f0f0f;

  //   @media (max-width: 600px) {
  //     border-radius: 0;
  //   }
  // }

  // // Override Horizontal Padding In Layout.Styled
  // .mainContent {
  //   @media (max-width: 600px) {
  //     padding: 0;
  //   }
  // }
 
  // .userBanner {
  //   position: relative;
  //   height: 200px;
  //   width: 100%;
  //   opacity: 0.75;
  //   border-bottom: var(--border);

  //   @media (max-width: 600px) {
  //     height: 120px;
  //   }

  //   img {
  //     position: absolute;
  //     top: 0;
  //     left: 0;
  //     right: 0;
  //     bottom: 0;
  //     object-fit: cover;
  //     height: 100%;
  //     width: 100%;
  //     border-radius: 12px 12px 0 0;

  //     @media (max-width: 600px) {
  //       border-radius: 0;
  //     }
  //   }
  // }

  // .profileTop {
  //   display: flex;
  //   align-items: flex-end;
  //   justify-content: space-between;
  //   margin-top: -3.8rem;
  //   padding: 0 2.5rem 2rem 2.5rem;

  //   @media (max-width: 1050px) {
  //     padding: 0 1rem 2rem 1rem;
  //   }
  // }

  // .userDetails {
  //   border-bottom: 1px solid #202020;
  //   padding: 0 2.5rem 2rem 2.5rem;
    
  //   @media (max-width: 1050px) {
  //     padding: 0 1rem 2rem 1rem;
  //   }
  // }

  // .userName {
  //   margin-bottom: 0.8rem;
  //   font-weight: 700;
  //   font-size: 1.75rem;

  //   @media (max-width: 600px) {
  //     font-size: 1.5rem;
  //   }
  // }

  // .userBio {
  //   color: #808080;
  //   font-size: 1rem;
  // }

  // .userStats {
  //   padding: 3rem 2.5rem 0 2.5rem;

  //   @media (max-width: 1050px) {
  //     padding: 3rem 1rem 0 1rem;
  //   }
  // }

  // .statRow {
  //   display: flex;
  //   align-items: center;
  //   gap: 1rem;
  //   padding-top: 1.5rem;

  //   @media (max-width: 500px) {
  //     gap: 0.5rem;
  //   }
  // }

  // .statItem {
  //   background-color: transparent;
  //   border: 1px solid rgba(255, 255, 255, 0.05);
  //   border-radius: 12px;
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  //   width: 100%;
  //   padding: 1.2rem;
  //   box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  //   @media (max-width: 700px) {
  //     padding: 0.75rem;
  //   }

  //   @media (max-width: 500px) {
  //     padding: 0.5rem;
  //   }
  // }

  // .statContent {
  //   display: flex;
  //   align-items: center;
  //   flex-direction: column;
  //   gap: 0.3rem;
  // }

  // .statResult {
  //   font-weight: 600;

  //   @media (max-width: 1000px) {
  //     font-size: 1.25rem;
  //   }
  // }

  // .statLabel {
  //   color: var(--lightPurple);

  //   @media (max-width: 1000px) {
  //     font-size: 14px;
  //   }

  //   @media (max-width: 650px) {
  //     font-size: 13px;
  //   }
  // }

  // .userBadges {
  //   padding: 4rem 2.5rem 1.5rem 2.5rem;

  //   @media (max-width: 1050px) {
  //     padding: 4rem 1rem 1.5rem 1rem;
  //   }
  // }

  // .badgesRow {
  //   display: grid;
  //   grid-template-columns: repeat(6, 1fr);
  //   padding-top: 1.5rem;
  //   gap: 2rem;

  //   @media (max-width: 1000px) {
  //     grid-template-columns: repeat(3, 1fr);
  //   }
  // }

  // .badgeItem {
  //   display: flex;
  //   align-items: center;
  //   flex-direction: column;
  //   gap: 0.5rem;
  // }

  // .badgeLabel {
  //   font-size: 15px;

  //   @media (max-width: 630px) {
  //     font-size: 13px;
  //   }
  // }

  // .sectionTitle {
  //   font-size: 1.5rem;
  //   font-weight: 600;
  //   color: var(--color2);

  //   @media (max-width: 600px) {
  //     font-size: 1.25rem;
  //   }
  // }

  // .badgeImg {
  //   @media (max-width: 500px) {
  //     height: 60px;
  //     width: 60px;
  //   }
  // }
`

export default StyledProfilePage
