import useSWR from "swr"

const fetcher = (url: string) => fetch(url).then(res => res.json())

export const useGame = (id: string) => {
  const { data, error } = useSWR(`/api/games/${id}`, fetcher)

  return {
    gameData: data,
    isLoading: !error && !data,
    isError: error
  }
}