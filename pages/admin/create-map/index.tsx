import type { NextPage } from 'next'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

import { mailman } from '@backend/utils/mailman'
import { Head } from '@components/Head'
import { PageHeader } from '@components/Layout'
import { WidthController } from '@components/Layout/WidthController'
import { Button, Input } from '@components/System'
import StyledAdminCreateMapPage from '@styles/AdminCreateMapPage.Styled'
import { showErrorToast, showSuccessToast } from '@utils/helpers/showToasts'

const AdminCreateMapPage: NextPage = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [avatarPath, setAvatarPath] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCreateMap = async () => {
    if (!name || !description) {
      toast.error('Missing map name or description')
    }

    setIsSubmitting(true)

    const body = {
      name,
      description,
      previewImg: avatarPath,
    }

    const res = await mailman('maps', 'POST', JSON.stringify(body))

    if (res.error) {
      showErrorToast(res.error.message)
    }

    if (res.message) {
      showSuccessToast(res.message)
    }

    setIsSubmitting(false)
  }

  return (
    <WidthController>
      <Head title="Admin - Create Map" />
      <PageHeader>Create A Map</PageHeader>

      <StyledAdminCreateMapPage>
        <Input id="name" type="text" label="Name" value={name} callback={setName} />

        <Input
          id="description"
          type="text"
          label="Description"
          isTextarea
          value={description}
          callback={setDescription}
        />

        <Input id="avatar" type="text" label="Avatar Path" value={`/images/mapAvatars/`} callback={setAvatarPath} />

        <Button type="solidPurple" width="100%" callback={() => handleCreateMap()} loading={isSubmitting}>
          Create
        </Button>
      </StyledAdminCreateMapPage>
    </WidthController>
  )
}

export default AdminCreateMapPage
