import { mount } from '@vue/test-utils'
import UserCard from './UserCard.vue'
import type { User } from '@/types'

const user: User = {
  id: 1,
  name: 'Maya Chen',
  email: 'maya@example.com',
  role: 'Engineer',
  active: true,
}

describe('UserCard', () => {
  it('renders typed props and emits the selected user', async () => {
    const wrapper = mount(UserCard, { props: { user } })
    expect(wrapper.text()).toContain('Maya Chen')
    await wrapper.get('button').trigger('click')
    expect(wrapper.emitted('select')?.[0]).toEqual([user])
  })
})
