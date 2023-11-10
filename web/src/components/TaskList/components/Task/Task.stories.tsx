// Pass props to your component by passing an `args` object to your story
//
// ```tsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from '@storybook/react'

import Task from './Task/Task'

const TASK = {
  id: 1,
  title: '테스트 할 일',
  color: '#dcce3a',
  duration: { hours: 2, minutes: 45 },
}

const meta: Meta<typeof Task> = {
  component: Task,
}

export default meta

type Story = StoryObj<typeof Task>

export const Primary: Story = { args: { ...TASK } }
