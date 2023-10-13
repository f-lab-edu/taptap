import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const TimerPage = () => {
  return (
    <>
      <MetaTags title="Timer" description="Timer page" />

      <h1>TimerPage</h1>
      <p>
        Find me in <code>./web/src/pages/TimerPage/TimerPage.tsx</code>
      </p>
      <p>
        My default route is named <code>timer</code>, link to me with `
        <Link to={routes.timer()}>Timer</Link>`
      </p>
    </>
  )
}

export default TimerPage
