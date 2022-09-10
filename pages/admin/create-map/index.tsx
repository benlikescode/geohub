import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import styled from 'styled-components'

import { mailman } from '@backend/utils/mailman'
import { StyledAnalytics } from '@components/Admin/Analytics/Analytics.Styled'
import { CountItem } from '@components/Admin/Analytics/CountItem'
import { ListItem } from '@components/Admin/Analytics/ListItem'
import { NotAuthenticated } from '@components/ErrorViews/NotAuthenticated'
import { Head } from '@components/Head'
import { Layout } from '@components/Layout'
import { Button, Input } from '@components/System'
import { Skeleton } from '@components/System/Skeleton'
import { selectUser } from '@redux/user'
import StyledAdminCreateMapPage from '@styles/AdminCreateMapPage.Styled'
import { UserType } from '@types'

const StyledHeader = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: #fff;
`

const showErrorToast = (message: string) =>
  toast.error(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
    theme: 'dark',
  })

const showSuccessToast = (message: string) =>
  toast.success(message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 0,
    theme: 'dark',
  })

const AdminCreateMapPage: NextPage = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [avatarPath, setAvatarPath] = useState('')

  const handleCreateMap = async () => {
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
  }

  return (
    <Layout>
      <Head title="Admin - Create Map" />
      <StyledHeader>Create A Map</StyledHeader>

      <StyledAdminCreateMapPage>
        <Input type="text" label="Name" value={name} callback={setName} />

        <Input type="text" label="Description" isTextarea value={description} callback={setDescription} />

        <Input type="text" label="Avatar Path" value={`/images/mapPreviews/`} callback={setAvatarPath} />

        <Button type="solidPurple" width="100%" callback={() => handleCreateMap()}>
          Create
        </Button>
      </StyledAdminCreateMapPage>
    </Layout>
  )
}

export default AdminCreateMapPage
