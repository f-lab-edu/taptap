import type { Repeat } from '@prisma/client'

import {
  repeats,
  repeat,
  createRepeat,
  updateRepeat,
  deleteRepeat,
} from './repeats'
import type { StandardScenario } from './repeats.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('repeats', () => {
  scenario('returns all repeats', async (scenario: StandardScenario) => {
    const result = await repeats()

    expect(result.length).toEqual(Object.keys(scenario.repeat).length)
  })

  scenario('returns a single repeat', async (scenario: StandardScenario) => {
    const result = await repeat({ id: scenario.repeat.one.id })

    expect(result).toEqual(scenario.repeat.one)
  })

  scenario('creates a repeat', async (scenario: StandardScenario) => {
    const result = await createRepeat({
      input: {
        updatedAt: '2023-09-05T09:09:01.090Z',
        startDate: '2023-09-05T09:09:01.090Z',
        startTime: '2023-09-05T09:09:01.090Z',
        endDate: '2023-09-05T09:09:01.090Z',
        endTime: '2023-09-05T09:09:01.090Z',
        interval: 2962076,
        taskId: scenario.repeat.two.taskId,
      },
    })

    expect(result.updatedAt).toEqual(new Date('2023-09-05T09:09:01.090Z'))
    expect(result.startDate).toEqual(new Date('2023-09-05T09:09:01.090Z'))
    expect(result.startTime).toEqual(new Date('2023-09-05T09:09:01.090Z'))
    expect(result.endDate).toEqual(new Date('2023-09-05T09:09:01.090Z'))
    expect(result.endTime).toEqual(new Date('2023-09-05T09:09:01.090Z'))
    expect(result.interval).toEqual(2962076)
    expect(result.taskId).toEqual(scenario.repeat.two.taskId)
  })

  scenario('updates a repeat', async (scenario: StandardScenario) => {
    const original = (await repeat({ id: scenario.repeat.one.id })) as Repeat
    const result = await updateRepeat({
      id: original.id,
      input: { updatedAt: '2023-09-06T09:09:01.090Z' },
    })

    expect(result.updatedAt).toEqual(new Date('2023-09-06T09:09:01.090Z'))
  })

  scenario('deletes a repeat', async (scenario: StandardScenario) => {
    const original = (await deleteRepeat({
      id: scenario.repeat.one.id,
    })) as Repeat
    const result = await repeat({ id: original.id })

    expect(result).toEqual(null)
  })
})
