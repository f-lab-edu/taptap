import { render } from '@redwoodjs/testing/web'

import TimeTablePage from './TimeTablePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('TimeTablePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TimeTablePage />)
    }).not.toThrow()
  })
})
