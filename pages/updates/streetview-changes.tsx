import { WidthController } from '@components/layout'
import { Meta } from '@components/Meta'
import { Button, Input } from '@components/system'
import { ThumbDownIcon, ThumbUpIcon } from '@heroicons/react/outline'
import StyledUpdatesPage from '@styles/UpdatesPage.Styled'
import { mailman, showToast } from '@utils/helpers'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const StreetViewChangesPage = () => {
  const [feedback, setFeedback] = useState('')
  const [vote, setVote] = useState(0)
  const [hasVoted, setHasVoted] = useState(true)

  const handleSubmit = async () => {
    if (!vote) {
      return showToast('error', 'Did not vote')
    }

    const res = await mailman('feedback/streetview-changes', 'POST', JSON.stringify({ feedback, vote }))

    if (res.error) {
      return showToast('error', res.error.message)
    }

    showToast('success', 'Thanks for your feedback.')
    getVoteStatus()
  }

  const getVoteStatus = async () => {
    const res = await mailman('feedback/streetview-changes')

    if (res.error) {
      return showToast('error', res.error.message)
    }

    setHasVoted(res.hasVoted)
  }

  useEffect(() => {
    getVoteStatus()
  }, [])

  return (
    <StyledUpdatesPage>
      <WidthController customWidth="800px">
        <Meta title="Browse Maps" />

        <div className="page-wrapper">
          <h1>Changes To StreetView</h1>

          <p className="text-paragraph">
            We are trying out something different with StreetView that should result in no more inverted colors!
            However, this change comes with the tradeoff of having less control over StreetView, which is why you will
            often see road names and lose the ability to have no moving/zooming games.
          </p>

          <p className="text-paragraph">
            {`We think this is a better experience for most GeoHub players, but for those who have already uploaded their
            own API key or would prefer to play with the inverted colors, this is still possible by going into your `}
            <Link href="/user/settings">
              <a>user settings</a>
            </Link>
            {` and toggling on "Use Google Maps API".`}
          </p>

          {!hasVoted && (
            <div className="feedback-wrapper">
              <div className="voting-wrapper">
                <p>Feedback is much appreciated!</p>
                <div className="vote-options">
                  <button className={`vote-option good ${vote === 1 ? 'active' : ''}`} onClick={() => setVote(1)}>
                    <ThumbUpIcon />
                  </button>
                  <button className={`vote-option bad ${vote === -1 ? 'active' : ''}`} onClick={() => setVote(-1)}>
                    <ThumbDownIcon />
                  </button>
                </div>
              </div>

              <Input id="feedback" type="text" value={feedback} callback={setFeedback} isTextarea />

              <Button width="100%" onClick={() => handleSubmit()}>
                Submit
              </Button>
            </div>
          )}
        </div>
      </WidthController>
    </StyledUpdatesPage>
  )
}

export default StreetViewChangesPage
