import type { Meta, StoryObj } from '@storybook/react'

import TimeTablePage from './TimeTablePage'

const meta: Meta<typeof TimeTablePage> = {
  component: TimeTablePage,
}

export default meta

type Story = StoryObj<typeof TimeTablePage>

export const Primary: Story = {}
