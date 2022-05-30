import { FC, useState, useEffect } from 'react'
import { Avatar, Button, FlexGroup, Input } from '../../../System'
import { StyledChallenge } from '.'
import { UserType } from '../../../../types'

type Props = {
  challengeId: string
}

const Challenge: FC<Props> = ({ challengeId }) => {
  const [friends, setFriends] = useState<UserType[]>([])
  const [isCopied, setIsCopied] = useState(false)
  const [inviteLink, setInviteLink] = useState('')

  const testUser: UserType = {
    id: '123',
    name: 'BenZ',
    avatar: '/images/avatars/default1.jpg',
    email: '',
    createdAt: new Date(),
    location: 'Canada',
  }

  const testUser2: UserType = {
    id: '123',
    name: 'Jamel',
    avatar: '/images/avatars/default2.jpg',
    email: '',
    createdAt: new Date(),
    location: 'Canada',
  }

  const testUser3: UserType = {
    id: '123',
    name: 'Jonathan',
    avatar: '/images/avatars/default3.jpg',
    email: '',
    createdAt: new Date(),
    location: 'Canada',
  }

  const generateUrl = () => {
    const domain = window.location.origin
    const invLink = `${domain}/challenge/${challengeId}`

    setInviteLink(invLink)
  }

  const getFriends = async () => {
    setFriends([testUser, testUser2, testUser3])
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink)
      setIsCopied(true)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    generateUrl()
    getFriends()
  }, [challengeId])

  if (!inviteLink || !friends) return <span>Loading...</span>

  return (
    <StyledChallenge>
      <div className="challengeSection">
        <label className="inputLabel">Invite people with this URL</label>
        <div className="inputWrapper">
          <Input type="text" value={inviteLink} readOnly />
          <button className="copyBtn" onClick={() => handleCopy()}>
            {isCopied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>

      <div className="challengeSection">
        <label className="inputLabel">Your Friends</label>
        <div className="friendsList">
          {friends.length > 0 ? (
            friends.map((friend, idx) => (
              <div className="friendItem" key={idx}>
                <FlexGroup gap={12}>
                  <Avatar url={friend.avatar} size={40} alt="" />
                  <span className="username">{friend.name}</span>
                </FlexGroup>
                <button className="inviteBtn">Invite</button>
              </div>
            ))
          ) : (
            <span className="noFriends">
              You do not appear to have anyone added. You can add users by going to their profile.
            </span>
          )}
        </div>
      </div>
    </StyledChallenge>
  )
}

export default Challenge
