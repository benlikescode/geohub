import { NotFound } from '@components/errorViews'
import { Meta } from '@components/Meta'
import { PageType } from '@types'

const Custom404: PageType = () => {
  return (
    <>
      <Meta title="Page Not Found" />
      <NotFound />
    </>
  )
}

Custom404.noLayout = true

export default Custom404
