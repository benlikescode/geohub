import { NextRouter } from 'next/router'

// Stores current url and redirects to '/register'
const redirectToRegister = (router: NextRouter) => {
  if (!router) return

  router.push(`/register?callback=${router.asPath}`)
}

export default redirectToRegister
