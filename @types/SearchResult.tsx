type SearchResult = {
  _id: string
  type: 'user' | 'map' | 'term'
  name: string
  avatar?: { emoji: string; color: string }
  previewImg?: string
  slug?: string
  term?: string
}

export default SearchResult
