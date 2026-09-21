import { mount } from '@vue/test-utils'
import CounterDemo from './CounterDemo.vue'

describe('CounterDemo', () => {
  it('increments, decrements, and resets', async () => {
    const wrapper = mount(CounterDemo, { props: { initial: 2 } })
    const buttons = wrapper.findAll('button')

    await buttons[1]?.trigger('click')
    expect(wrapper.get('[data-test="count"]').text()).toBe('3')
    await buttons[0]?.trigger('click')
    expect(wrapper.get('[data-test="count"]').text()).toBe('2')
    await buttons[1]?.trigger('click')
    await buttons[2]?.trigger('click')
    expect(wrapper.get('[data-test="count"]').text()).toBe('2')
  })
})
