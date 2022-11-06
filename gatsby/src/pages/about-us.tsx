import { HeadFC } from 'gatsby'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'

export const Head: HeadFC = () => <title>Tasty | About Us</title>

const AboutUsPage = () => {
  return (
    <>
      <Header />
      <main>
        <h1>About Us</h1>
      </main>
      <Footer />
    </>
  )
}

export default AboutUsPage
