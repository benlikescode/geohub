// Custom script that simplifies api calls

export const mailman = async (
  endpoint: string, 
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', 
  body?: BodyInit
) => {
  const fetchConfig = {
    method: method,
    headers: { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: body
  }

  try {
    const res = await fetch(`https://geohub-prod-benlikescode.vercel.app/api/${endpoint}`, fetchConfig)
    return { status: res.status, res: await res.json() }
  }
  catch (err) {
    console.log(err)
    return { status: 400, res: null }
  }

}