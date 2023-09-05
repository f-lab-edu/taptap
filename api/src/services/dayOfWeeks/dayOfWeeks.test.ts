import type { DayOfWeek } from '@prisma/client'

import {
  dayOfWeeks,
  dayOfWeek,
  createDayOfWeek,
  updateDayOfWeek,
  deleteDayOfWeek,
} from './dayOfWeeks'
import type { StandardScenario } from './dayOfWeeks.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('dayOfWeeks', () => {
  scenario('returns all dayOfWeeks', async (scenario: StandardScenario) => {
    const result = await dayOfWeeks()

    expect(result.length).toEqual(Object.keys(scenario.dayOfWeek).length)
  })

  scenario('returns a single dayOfWeek', async (scenario: StandardScenario) => {
    const result = await dayOfWeek({ id: scenario.dayOfWeek.one.id })

    expect(result).toEqual(scenario.dayOfWeek.one)
  })

  scenario('creates a dayOfWeek', async () => {
    const result = await createDayOfWeek({
      input: { title: 'MON', value: 8367410 },
    })

    expect(result.title).toEqual('MON')
    expect(result.value).toEqual(8367410)
  })

  scenario('updates a dayOfWeek', async (scenario: StandardScenario) => {
    const original = (await dayOfWeek({
      id: scenario.dayOfWeek.one.id,
    })) as DayOfWeek
    const result = await updateDayOfWeek({
      id: original.id,
      input: { title: 'SUN' },
    })

    expect(result.title).toEqual('SUN')
  })

  scenario('deletes a dayOfWeek', async (scenario: StandardScenario) => {
    const original = (await deleteDayOfWeek({
      id: scenario.dayOfWeek.one.id,
    })) as DayOfWeek
    const result = await dayOfWeek({ id: original.id })

    expect(result).toEqual(null)
  })
})
