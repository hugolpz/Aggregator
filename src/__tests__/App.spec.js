import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import App from '@/App.vue'

describe('App', () => {
  it('renders dashboard shell sections', () => {
    const wrapper = mount(App, {
      global: {
        plugins: [createPinia()],
      },
    })

    expect(wrapper.text()).toContain('JobSearch Aggregator')
    expect(wrapper.find('input[placeholder="Filter sub-cards by word"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Aggregator dashboard powered by Vue 3')
  })
})
