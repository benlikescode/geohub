const getMapsKey = (usersCustomKey: string | undefined) => {
  const GEOHUB_MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string

  return usersCustomKey || GEOHUB_MAPS_KEY
}

export default getMapsKey
