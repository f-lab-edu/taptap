import type { Prisma, Task } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.TaskCreateArgs>({
  task: {
    one: {
      data: {
        updatedAt: '2023-09-05T09:09:30.400Z',
        title: 'String',
        color: 'String',
        description: 'String',
        category: { create: { title: 'String' } },
      },
    },
    two: {
      data: {
        updatedAt: '2023-09-05T09:09:30.400Z',
        title: 'String',
        color: 'String',
        description: 'String',
        category: { create: { title: 'String' } },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Task, 'task'>
