import { useStaticQuery, graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import {
  FaTwitter,
  FaYoutube,
  FaFacebook,
  FaInstagram,
  FaPinterest,
} from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import './Footer.css'

const Footer = () => {
  const data = useStaticQuery(query)
  const tastyLogoWhite = data.strapiTastyLogoWhite.tastyLogoWhite

  return (
    <>
      <footer className="Footer">
        <div className="Footer__Inner">
          <div className="block sm:flex sm:justify-between max-w-lg">
            <div className="w-[120px]">
              <Link to="/">
                <GatsbyImage
                  image={
                    tastyLogoWhite.localFile.childImageSharp.gatsbyImageData
                  }
                  alt={tastyLogoWhite.alternativeText}
                />
              </Link>
            </div>
            <div className="SocialContainer">
              <a href="#" aria-label="Twitter">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" aria-label="YouTube">
                <FaYoutube className="text-xl" />
              </a>
              <a href="#" aria-label="Facebook">
                <FaFacebook className="text-xl" />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram className="text-xl" />
              </a>
              <a href="#" aria-label="Pinterest">
                <FaPinterest className="text-xl" />
              </a>
            </div>
          </div>
          <div className="mt-8 block sm:flex justify-between max-w-lg">
            <button
              className="Link--underline"
              onClick={() => toast('Subscribed!')}
            >
              Subscribe
            </button>
            <Link to="/about-us" className="block mt-4 sm:mt-0 Link--underline">
              About Us
            </Link>
          </div>
          <div className="block sm:flex justify-between max-w-lg">
            <div className="mt-4 sm:mt-8">
              <p>
                Inspired by{' '}
                <a
                  href="https://www.delish.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="Link--underline"
                >
                  Delish.com
                </a>
              </p>
            </div>
            <div className="mt-4 sm:mt-8">
              <p>
                Built by{' '}
                <a
                  href="https://lucassilbernagel.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="Link--underline"
                >
                  Lucas Silbernagel
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme="colored"
        toastStyle={{ backgroundColor: '#004685', color: '#FFFFFF' }}
      />
    </>
  )
}

export default Footer

const query = graphql`
  query {
    strapiTastyLogoWhite {
      tastyLogoWhite {
        alternativeText
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`
