const mailman = async (endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', body?: BodyInit) => {
  const fetchConfig = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body,
  }

  try {
    const serverUrl = `/api/${endpoint}`

    const responseRaw = await fetch(serverUrl, fetchConfig)
    const response = await responseRaw.json()

    // If response is not defined (likely a DB connection issue) -> return a 500 error
    if (!response) {
      return {
        error: {
          message: 'There was a problem connecting to the server, please try again later',
          code: 500,
        },
      }
    }

    return response
  } catch (err) {
    console.log(`ERR FROM CATCH: ${err}}`)
    return null
  }
}

export default mailman
