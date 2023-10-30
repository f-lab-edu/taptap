import { getHours, getMinutes, setHours, setMinutes } from 'date-fns'

import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const TimeTablePage = () => {
  const items = convert([{ s: start, e: end }])
  console.log(items)
  for (const [k, v] of Object.entries(items)) {
    console.log(k, v)
  }

  return (
    <>
      <MetaTags title="TimeTable" description="TimeTable page" />

      <h1>TimeTablePage</h1>
      <p>
        Find me in <code>./web/src/pages/TimeTablePage/TimeTablePage.tsx</code>
      </p>
      <p>
        My default route is named <code>timeTable</code>, link to me with `
        <Link to={routes.timeTable()}>TimeTable</Link>`
      </p>
    </>
  )
}

const start = setMinutes(setHours(new Date(), 9), 50),
  end = setMinutes(setHours(new Date(), 11), 10)

const convert = function (arr: { s: Date; e: Date }[]) {
  const handler = {
    get(target, name) {
      return name in target ? target[name] : []
    },
  }

  const blocks = {}
  const proxy = new Proxy(blocks, handler)

  arr.forEach(({ s, e }) => {
    const start = {
      hour: getHours(s),
      minute: getMinutes(s),
    }
    const end = {
      hour: getHours(e),
      minute: getMinutes(e),
    }

    let block_start = start.minute

    for (let h = start.hour; h < end.hour; h++) {
      proxy[h] = proxy[h].concat({ left: block_start, width: 60 - block_start })
      block_start = 0
    }

    // h = end.hour
    proxy[end.hour] = proxy[end.hour].concat({
      left: block_start,
      width: end.minute - block_start,
    })
  })

  return blocks
}

export default TimeTablePage
