import type { Prisma, Task } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.TaskCreateArgs>({
  task: {
    one: {
      data: {
        updatedAt: '2023-09-05T09:04:52.784Z',
        title: 'String',
        color: 'String',
        description: 'String',
      },
    },
    two: {
      data: {
        updatedAt: '2023-09-05T09:04:52.790Z',
        title: 'String',
        color: 'String',
        description: 'String',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Task, 'task'>
