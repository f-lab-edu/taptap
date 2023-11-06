import { render } from '@redwoodjs/testing/web'

import TaskList from './TaskList'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TaskList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TaskList />)
    }).not.toThrow()
  })
})
