type SearchResult = {
  _id: string
  name: string
  avatar?: { emoji: string; color: string }
  previewImg?: string
  slug?: string
}

export default SearchResult
