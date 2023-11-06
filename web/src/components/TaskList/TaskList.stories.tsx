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

import TaskList from './TaskList'

const TASK_LIST = [
  {
    title: '영감',
    color: '#f7d218',
    tasks: [
      {
        id: 1,
        title: '아침루틴',
        color: '#f7d218',
        duraion: { hours: 0, minutes: 0 },
      },
      {
        id: 2,
        title: '데일리회고',
        color: '#f7d218',
        duraion: { hours: 0, minutes: 0 },
      },
    ],
  },
  {
    title: '건강',
    color: '#ff93cd',
    tasks: [
      {
        id: 1,
        title: '식사',
        color: '#ff93cd',
        duraion: { hours: 0, minutes: 0 },
      },
      {
        id: 2,
        title: '수영',
        color: '#f71818',
        duraion: { hours: 0, minutes: 0 },
      },
    ],
  },
]

const meta: Meta<typeof TaskList> = {
  component: TaskList,
}

export default meta

type Story = StoryObj<typeof TaskList>

export const Primary: Story = { args: { list: TASK_LIST } }
