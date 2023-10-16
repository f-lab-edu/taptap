import type { Meta, StoryObj } from '@storybook/react'

import CategoriesPage from './CategoriesPage'

const meta: Meta<typeof CategoriesPage> = {
  component: CategoriesPage,
}

export default meta

type Story = StoryObj<typeof CategoriesPage>

export const Primary: Story = {}
