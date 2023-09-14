import { NextPage } from 'next'

type Page = NextPage & {
  noLayout?: boolean
}

export default Page
