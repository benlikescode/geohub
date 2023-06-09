import { NotFound } from '@components/errorViews'
import { Head } from '@components/Head'
import { PageType } from '@types'

const Custom404: PageType = () => {
  return (
    <>
      <Head title="Page Not Found" />
      <NotFound />
    </>
  )
}

Custom404.noLayout = true

export default Custom404
