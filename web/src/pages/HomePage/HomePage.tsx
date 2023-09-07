import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import StyledForm from 'src/styles/index'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <main>
        <StyledForm>
          <form className="max-w-xs rounded bg-white px-5 py-8 text-center shadow">
            <input type="text" placeholder="Full name" />
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Password" />
            <button>Sign In</button>
          </form>
        </StyledForm>
      </main>
    </>
  )
}

export default HomePage
