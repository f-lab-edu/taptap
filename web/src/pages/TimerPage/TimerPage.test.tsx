import { render } from '@redwoodjs/testing/web'

import TimerPage from './TimerPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('TimerPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TimerPage />)
    }).not.toThrow()
  })
})
