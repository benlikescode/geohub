import { FC, useEffect, useState } from 'react'
import { Input } from '@components/System'
import { CheckIcon, ClipboardIcon } from '@heroicons/react/outline'
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
      <label className="input-label">Invite people with this URL</label>
      <div className="input-wrapper">
        <Input id="invite" type="text" value={inviteLink} readOnly fontSize="15px" />

        <div className="copy-btn-wrapper">
          <button className="copy-btn" onClick={() => handleCopy()}>
            {isCopied ? <CheckIcon className="check" /> : <ClipboardIcon />}
          </button>
        </div>
      </div>
    </StyledChallenge>
  )
}

export default Challenge
