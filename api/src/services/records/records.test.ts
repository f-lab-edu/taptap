import type { Record } from '@prisma/client'

import {
  records,
  record,
  createRecord,
  updateRecord,
  deleteRecord,
} from './records'
import type { StandardScenario } from './records.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('records', () => {
  scenario('returns all records', async (scenario: StandardScenario) => {
    const result = await records()

    expect(result.length).toEqual(Object.keys(scenario.record).length)
  })

  scenario('returns a single record', async (scenario: StandardScenario) => {
    const result = await record({ id: scenario.record.one.id })

    expect(result).toEqual(scenario.record.one)
  })

  scenario('creates a record', async () => {
    const result = await createRecord({
      input: {
        updatedAt: '2023-09-05T09:05:29.652Z',
        start: '2023-09-05T09:05:29.652Z',
        end: '2023-09-05T09:05:29.652Z',
      },
    })

    expect(result.updatedAt).toEqual(new Date('2023-09-05T09:05:29.652Z'))
    expect(result.start).toEqual(new Date('2023-09-05T09:05:29.652Z'))
    expect(result.end).toEqual(new Date('2023-09-05T09:05:29.652Z'))
  })

  scenario('updates a record', async (scenario: StandardScenario) => {
    const original = (await record({ id: scenario.record.one.id })) as Record
    const result = await updateRecord({
      id: original.id,
      input: { updatedAt: '2023-09-06T09:05:29.652Z' },
    })

    expect(result.updatedAt).toEqual(new Date('2023-09-06T09:05:29.652Z'))
  })

  scenario('deletes a record', async (scenario: StandardScenario) => {
    const original = (await deleteRecord({
      id: scenario.record.one.id,
    })) as Record
    const result = await record({ id: original.id })

    expect(result).toEqual(null)
  })
})
