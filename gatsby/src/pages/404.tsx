import { Link, HeadFC } from 'gatsby'
import Layout from '../components/Layout'

export const Head: HeadFC = () => <title>Tasty | Not found</title>

const NotFoundPage = () => {
  return (
    <Layout pageTitle="404" pageRoute="/404">
      <h1 className="font-black text-4xl mt-20 mb-8">
        Oops! We don&apos;t have the page you&apos;re looking for.
      </h1>
      <p className="text-xl">
        <Link
          className="underline underline-offset-4 duration-300 hover:text-blue-1 focus:text-blue-1"
          to="/"
        >
          Return to the homepage
        </Link>
        .
      </p>
    </Layout>
  )
}

export default NotFoundPage
