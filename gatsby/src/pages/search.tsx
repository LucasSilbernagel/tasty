import { HeadFC } from 'gatsby'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'

export const Head: HeadFC = () => <title>Tasty | Search</title>

const SearchPage = () => {
  return (
    <>
      <Header />
      <main>
        <h1>Search page</h1>
      </main>
      <Footer />
    </>
  )
}

export default SearchPage
