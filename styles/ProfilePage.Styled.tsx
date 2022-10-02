import styled from 'styled-components'

type StyledProps = {
  isEditing?: boolean
}

const StyledProfilePage = styled.div<StyledProps>`
  .banner {
    width: 100%;
    height: 250px;
    border-radius: 10px;
    background: rgb(255, 255, 255, 0.02)
      url('https://images.pexels.com/photos/462162/pexels-photo-462162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
      no-repeat center / cover;

    //https://images.pexels.com/photos/2658079/pexels-photo-2658079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
    //https://images.pexels.com/photos/4664347/pexels-photo-4664347.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
    //https://images.pexels.com/photos/3244513/pexels-photo-3244513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
    //https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
    //https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg
    //https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
    //https://images.pexels.com/photos/462162/pexels-photo-462162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1   GOOD ONE
    //https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
    //https://images.pexels.com/photos/158063/bellingrath-gardens-alabama-landscape-scenic-158063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1

    box-shadow: inset 0 0 0 1px rgb(255, 255, 255, 0.15);
  }

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
        background-color: #0e0e10;
        width: 125px;
        height: 125px;
        border-radius: 50%;
        position: relative;
        box-shadow: 0 0 0 5px #0e0e10;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          outline: 1px solid #1c1c1c;
          outline-offset: 5px;
        }

        img {
          height: 70px;
          width: 70px;
        }

        .profile-avatar-editing-icon {
          background-color: #363636;
          border-radius: 50rem;
          padding: 0.5rem;
          border: 1px solid rgba(255, 255, 255, 0.55);
          position: absolute;
          top: -0.5rem;
          right: 0;
          height: 42px;
          width: 42px;
          display: flex;
          align-items: center;
          justify-content: center;

          svg {
            height: 20px;
            color: var(--color2);
            position: relative;
            top: -2px;
          }
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

        .name-container {
          display: flex;
          align-items: center;

          .verified {
            margin-left: 6px;
            display: flex;
            align-items: center;
            justify-content: center;

            svg {
              height: 24px;
              color: #1d9bf0;
            }
          }
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
          min-height: 50px;
          max-height: 300px;
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
  }

  .no-games-message {
    color: var(--color3);
  }
`

export default StyledProfilePage
