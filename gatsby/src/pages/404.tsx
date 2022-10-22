import { Link, HeadFC } from 'gatsby'

export const Head: HeadFC = () => <title>Not found</title>

const NotFoundPage = () => {
  return (
    <main>
      <h1>Page not found</h1>
      <p>
        Sorry 😔, we couldn’t find what you were looking for.
        <Link to="/">Go home</Link>.
      </p>
    </main>
  )
}

export default NotFoundPage
