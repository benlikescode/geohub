import type { NextPage } from 'next'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { WidthController } from '@components/layout'
import { Meta } from '@components/Meta'
import { Button, Input, Select, Spinner } from '@components/system'
import { ArrowRightIcon } from '@heroicons/react/outline'
import { useAppDispatch } from '@redux/hook'
import { logOutUser, updateDistanceUnit, updateMapsAPIKey } from '@redux/slices'
import StyledSettingsPage from '@styles/SettingsPage.Styled'
import { mailman, showToast } from '@utils/helpers'

const DISTANCE_UNIT_OPTIONS = [
  { value: 'metric', label: 'Metric (km)' },
  { value: 'imperial', label: 'Imperial (miles)' },
]

type SettingsType = {
  distanceUnit: 'metric' | 'imperial'
  mapsAPIKey: string
}

const SettingsPage: NextPage = () => {
  const [distanceUnit, setDistanceUnit] = useState('metric')
  const [mapsAPIKey, setMapsAPIKey] = useState('')
  const [loading, setLoading] = useState(false)
  const [initialSettings, setInitialSettings] = useState<SettingsType>()
  const dispatch = useAppDispatch()

  const hasEdited = useMemo(
    () =>
      initialSettings && (distanceUnit !== initialSettings?.distanceUnit || mapsAPIKey !== initialSettings?.mapsAPIKey),
    [distanceUnit, mapsAPIKey, initialSettings]
  )

  useEffect(() => {
    fetchUserSettings()
  }, [])

  const fetchUserSettings = async () => {
    setLoading(true)

    const res = await mailman('users/settings')

    if (res.error) {
      return showToast('error', res.error.message)
    }

    setLoading(false)
    setInitialSettings(res)
    setDistanceUnit(res.distanceUnit)
    setMapsAPIKey(res.mapsAPIKey)
  }

  const handleSaveChanges = async () => {
    const newSettings = { distanceUnit, mapsAPIKey } as SettingsType

    const res = await mailman('users/settings', 'POST', JSON.stringify(newSettings))

    if (res.error) {
      return showToast('error', res.error.message)
    }

    setInitialSettings(newSettings)

    dispatch(updateDistanceUnit(distanceUnit))
    dispatch(updateMapsAPIKey(mapsAPIKey))

    showToast('success', 'Successfully updated user settings')
  }

  const handleLogout = () => {
    signOut({ callbackUrl: '/login' })
    dispatch(logOutUser())
  }

  return (
    <StyledSettingsPage>
      <WidthController customWidth="650px">
        <Meta title="Account Settings" />

        <div className="header">
          <div className="header-details">
            <h1>Account</h1>
            <h2>Manage your settings</h2>
          </div>

          <Button onClick={() => handleSaveChanges()} style={{ padding: '0 12px' }} disabled={!hasEdited}>
            Save Changes
          </Button>
        </div>

        {loading ? (
          <div className="settings-loader">
            <Spinner size={32} />
          </div>
        ) : (
          <div className="settings-body">
            <div className="settings-form">
              <Select
                label="Distance Unit"
                options={DISTANCE_UNIT_OPTIONS}
                callback={setDistanceUnit}
                value={distanceUnit}
              />
              <Input
                id="maps-key"
                label="Custom API Key"
                type="text"
                placeholder="Ex. AIza-lots-of-characters"
                value={mapsAPIKey}
                callback={setMapsAPIKey}
              />
            </div>

            {!initialSettings?.mapsAPIKey ? (
              <div className="maps-key-cta">
                <div className="cta-title">How to add your own Google Maps API key</div>
                <p className="cta-description">
                  Adding your own key allows you to play essentially unlimited games for free!
                </p>

                <Link href="/custom-key-instructions.pdf" passHref>
                  <a target="_blank" rel="noopener noreferrer">
                    <Button className="cta-button" variant="solidGray">
                      View Instructions
                      <ArrowRightIcon />
                    </Button>
                  </a>
                </Link>
              </div>
            ) : (
              <div className="custom-key-success-message">
                <div>
                  Thank you for using your own maps key! People like you are allowing this site to stay free. 😀
                </div>
                <div>For your key to take effect, you must refresh the page.</div>

                <Button onClick={() => setMapsAPIKey('')} style={{ padding: '0 12px', marginTop: '12px' }}>
                  Reset Key
                </Button>
              </div>
            )}

            <button className="logout-btn" onClick={() => handleLogout()}>
              Log Out
            </button>
          </div>
        )}
      </WidthController>
    </StyledSettingsPage>
  )
}

export default SettingsPage
