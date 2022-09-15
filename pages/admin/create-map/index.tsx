import type { NextPage } from 'next'
import React, { useState } from 'react'

import { mailman } from '@backend/utils/mailman'
import { Head } from '@components/Head'
import { Layout, PageHeader } from '@components/Layout'
import { Button, Input } from '@components/System'
import StyledAdminCreateMapPage from '@styles/AdminCreateMapPage.Styled'
import { showErrorToast, showSuccessToast } from '@utils/helperFunctions'

const AdminCreateMapPage: NextPage = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [avatarPath, setAvatarPath] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCreateMap = async () => {
    if (!name || !description) {
      return showErrorToast('Missing map name or description')
    }

    setIsSubmitting(true)

    const body = {
      name,
      description,
      previewImg: avatarPath,
    }

    const { status, res } = await mailman('maps', 'POST', JSON.stringify(body))

    if (status === 201) {
      showSuccessToast(res.message)
    } else {
      showErrorToast(res.message)
    }

    setIsSubmitting(false)
  }

  return (
    <Layout>
      <Head title="Admin - Create Map" />
      <PageHeader>Create A Map</PageHeader>

      <StyledAdminCreateMapPage>
        <Input type="text" label="Name" value={name} callback={setName} />

        <Input type="text" label="Description" isTextarea value={description} callback={setDescription} />

        <Input type="text" label="Avatar Path" value={`/images/mapPreviews/`} callback={setAvatarPath} />

        <Button type="solidPurple" width="100%" callback={() => handleCreateMap()} loading={isSubmitting}>
          Create
        </Button>
      </StyledAdminCreateMapPage>
    </Layout>
  )
}

export default AdminCreateMapPage
