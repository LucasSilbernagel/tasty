import { Link, HeadFC } from 'gatsby'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'

export const Head: HeadFC = () => <title>Tasty | Not found</title>

const NotFoundPage = () => {
  return (
    <>
      <Header />
      <main className="min-h-[72vh] py-6 px-2 mx-auto max-w-screen-lg text-center">
        <h1 className="font-black text-4xl mt-20 mb-8">
          Oops! We don&apos;t have the page you&apos;re looking for.
        </h1>
        <p className="text-xl">
          <Link className="underline underline-offset-4" to="/">
            Return to the homepage
          </Link>
          .
        </p>
      </main>
      <Footer />
    </>
  )
}

export default NotFoundPage
