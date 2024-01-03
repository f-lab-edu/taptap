import { render } from '@redwoodjs/testing/web'

import Task from './Task/Task'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Task', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Task />)
    }).not.toThrow()
  })
})
