import type { Meta, StoryObj } from '@storybook/react'

import TimerPage from './TimerPage'

const meta: Meta<typeof TimerPage> = {
  component: TimerPage,
}

export default meta

type Story = StoryObj<typeof TimerPage>

export const Primary: Story = {}
