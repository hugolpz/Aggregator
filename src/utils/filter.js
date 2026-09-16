export function filterItemsByWord(items, word) {
  const trimmedWord = word.trim().toLowerCase()

  if (!trimmedWord) {
    return items
  }

  return items.filter((item) => {
    const title = item.title?.toLowerCase() ?? ''
    const description = item.description?.toLowerCase() ?? ''
    const localisation = item.localisation?.toLowerCase() ?? ''

    return (
      title.includes(trimmedWord) ||
      description.includes(trimmedWord) ||
      localisation.includes(trimmedWord)
    )
  })
}
