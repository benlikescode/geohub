import { FC, useEffect, useState } from 'react'

import { Avatar, Button, FlexGroup, Input } from '@components/System'
import { CheckIcon, ClipboardIcon } from '@heroicons/react/outline'
import { UserType } from '@types'

import { StyledChallenge } from './'

type Props = {
  challengeId: string
}

const Challenge: FC<Props> = ({ challengeId }) => {
  const [isCopied, setIsCopied] = useState(false)
  const [inviteLink, setInviteLink] = useState('')

  const generateUrl = () => {
    const domain = window.location.origin
    const invLink = `${domain}/challenge/${challengeId}`

    setInviteLink(invLink)
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
  }, [challengeId])

  if (!inviteLink) return <span>Loading...</span>

  return (
    <StyledChallenge>
      <div className="challengeSection">
        <label className="inputLabel">Invite people with this URL</label>
        <div className="inputWrapper">
          <Input type="text" value={inviteLink} readOnly fontSize="15px" />
          <button className="copyBtn" onClick={() => handleCopy()}>
            {isCopied ? <CheckIcon color="#5cffc0" /> : <ClipboardIcon />}
          </button>
        </div>
      </div>
    </StyledChallenge>
  )
}

export default Challenge
