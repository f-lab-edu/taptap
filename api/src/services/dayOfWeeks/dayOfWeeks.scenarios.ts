import type { Prisma, DayOfWeek } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.DayOfWeekCreateArgs>({
  dayOfWeek: {
    one: { data: { title: 'MON', value: 2163384 } },
    two: { data: { title: 'MON', value: 5207885 } },
  },
})

export type StandardScenario = ScenarioData<DayOfWeek, 'dayOfWeek'>
