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
    const res = await fetch(`/api/${endpoint}`, fetchConfig)
    return await res.json()
  }
  catch (err) {
    return console.log(err)
  }
}