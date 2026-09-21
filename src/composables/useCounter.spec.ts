import { useCounter } from './useCounter'

describe('useCounter', () => {
  it('owns reusable counter behavior and respects its minimum', () => {
    const counter = useCounter(1, 0)
    counter.decrement()
    counter.decrement()
    expect(counter.count.value).toBe(0)
    counter.increment()
    expect(counter.count.value).toBe(1)
    counter.reset()
    expect(counter.count.value).toBe(1)
  })
})
