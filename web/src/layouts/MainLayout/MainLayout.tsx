import { Link, routes } from '@redwoodjs/router'
import { useAuth } from 'src/auth'

type MainLayoutProps = {
  children?: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { isAuthenticated, currentUser, logOut } = useAuth()
  console.log(JSON.stringify(currentUser))
  return (
    <>
      <header>
        <div className="flex-between">
          <h1>
            <Link to={routes.home()}>Redwood Blog</Link>
          </h1>
          {isAuthenticated ? (
            <div>
              <span>Logged in as {currentUser.email}</span>{' '}
              <button type="button" onClick={logOut}>
                Logout
              </button>
            </div>
          ) : (
            <Link to={routes.login()}>Login</Link>
          )}
        </div>
        <nav>
          <ul>
            <li>
              <Link to={routes.home()}>Home</Link>
            </li>
            <li>
              <Link to={routes.tasks()}>Tasks</Link>
            </li>
            <li>
              <Link to={routes.categories()}>Category</Link>
            </li>
            <li>
              <Link to={routes.records()}>Record</Link>
            </li>
          </ul>
        </nav>
      </header>
      {children}
      <footer></footer>
    </>
  )
}

export default MainLayout
