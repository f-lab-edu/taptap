import type { Prisma, DayOfWeek } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.DayOfWeekCreateArgs>({
  dayOfWeek: {
    one: { data: { title: 'MON', value: 8158111 } },
    two: { data: { title: 'MON', value: 9790472 } },
  },
})

export type StandardScenario = ScenarioData<DayOfWeek, 'dayOfWeek'>
