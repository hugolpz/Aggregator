import { describe, expect, it } from 'vitest'
import { filterItemsByWord } from '@/utils/filter'

describe('filterItemsByWord', () => {
  const items = [
    { id: '1', title: 'Backend Developer', description: 'Vue and API work', localisation: 'Remote' },
    { id: '2', title: 'Data Analyst', description: 'SQL reporting', localisation: 'Paris' },
  ]

  it('returns all items when filter is empty', () => {
    expect(filterItemsByWord(items, '   ')).toHaveLength(2)
  })

  it('filters by title, description and localisation case-insensitively', () => {
    expect(filterItemsByWord(items, 'vue')).toEqual([items[0]])
    expect(filterItemsByWord(items, 'paris')).toEqual([items[1]])
  })
})
