import { mount } from '@vue/test-utils'
import UserForm from './UserForm.vue'

describe('UserForm', () => {
  it('validates and emits a normalized registration', async () => {
    const wrapper = mount(UserForm)
    const inputs = wrapper.findAll('input')
    await inputs[0]?.setValue('  Arun Bali  ')
    await inputs[1]?.setValue('arun@example.com')
    await inputs[2]?.setValue('32')
    await inputs[3]?.setValue(true)
    await inputs[6]?.setValue(true)
    await wrapper.get('form').trigger('submit')

    const payload = wrapper.emitted('submit')?.[0]?.[0]
    expect(payload).toMatchObject({
      name: 'Arun Bali',
      email: 'arun@example.com',
      age: 32,
      terms: true,
    })
  })

  it('shows an error for an invalid submission', async () => {
    const wrapper = mount(UserForm)
    await wrapper.get('form').trigger('submit')
    expect(wrapper.text()).toContain('Enter a valid name')
    expect(wrapper.emitted('submit')).toBeUndefined()
  })
})
