/* eslint-disable @typescript-eslint/no-explicit-any */
import { HeadFC } from 'gatsby'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'

export const Head: HeadFC = ({ pageContext }: any) => {
  const { name } = pageContext
  return <title>Tasty | {name}</title>
}

const AuthorPage = ({ pageContext }: any) => {
  const { name } = pageContext
  return (
    <>
      <Header />
      <main>
        <h1 className="font-black text-4xl">{name}</h1>
      </main>
      <Footer />
    </>
  )
}

export default AuthorPage
