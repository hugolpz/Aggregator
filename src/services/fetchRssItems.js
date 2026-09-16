function normalizeDescription(value) {
  return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

export async function fetchRssItems(url) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch source: ${response.status}`)
  }

  const xmlText = await response.text()
  const xmlDoc = new DOMParser().parseFromString(xmlText, 'text/xml')
  const itemNodes = Array.from(xmlDoc.querySelectorAll('item'))

  return itemNodes.map((node, index) => {
    const title = node.querySelector('title')?.textContent?.trim() ?? 'Untitled'
    const itemUrl = node.querySelector('link')?.textContent?.trim() ?? url
    const date = node.querySelector('pubDate')?.textContent?.trim() ?? ''
    const descriptionRaw = node.querySelector('description')?.textContent?.trim() ?? ''

    return {
      id: node.querySelector('guid')?.textContent?.trim() ?? `${itemUrl}-${index}`,
      url: itemUrl,
      title,
      date,
      description: normalizeDescription(descriptionRaw),
    }
  })
}

export async function fetchHtmlItems({ url, itemSelector, linkSelector, titleSelector }) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch source: ${response.status}`)
  }

  const html = await response.text()
  const doc = new DOMParser().parseFromString(html, 'text/html')

  return Array.from(doc.querySelectorAll(itemSelector)).map((item, index) => {
    const linkElement = item.querySelector(linkSelector)
    const titleElement = item.querySelector(titleSelector)

    return {
      id: `${url}-${index}`,
      url: linkElement?.href ?? url,
      title: titleElement?.textContent?.trim() ?? `Item ${index + 1}`,
      date: '',
      description: '',
    }
  })
}
