import type { Repeat } from '@prisma/client'

import { repeats } from './repeats'
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
})
