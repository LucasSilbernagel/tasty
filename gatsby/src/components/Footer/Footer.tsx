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
      <footer data-testid="footer" className="Footer">
        <div className="Footer__Inner">
          <div className="block sm:flex sm:justify-between max-w-lg">
            <div className="w-[120px]">
              <Link to="/" data-testid="home-link">
                <GatsbyImage
                  image={
                    tastyLogoWhite.localFile.childImageSharp.gatsbyImageData
                  }
                  alt={tastyLogoWhite.alternativeText}
                />
              </Link>
            </div>
            <div className="SocialContainer">
              <a href="#" aria-label="Twitter" data-testid="twitter-link">
                <FaTwitter className="text-3xl" />
              </a>
              <a href="#" aria-label="YouTube" data-testid="youtube-link">
                <FaYoutube className="text-3xl" />
              </a>
              <a href="#" aria-label="Facebook" data-testid="facebook-link">
                <FaFacebook className="text-3xl" />
              </a>
              <a href="#" aria-label="Instagram" data-testid="instagram-link">
                <FaInstagram className="text-3xl" />
              </a>
              <a href="#" aria-label="Pinterest" data-testid="pinterest-link">
                <FaPinterest className="text-3xl" />
              </a>
            </div>
          </div>
          <div className="block mt-8 sm:flex justify-between max-w-lg">
            <button
              data-testid="subscribe-button"
              className="Link--underline mb-4"
              onClick={() => toast('Subscribed!')}
            >
              Subscribe
            </button>
            <Link
              to="/about-us"
              className="block Link--underline mb-4"
              data-testid="about-us-link"
            >
              About Us
            </Link>
          </div>
          <div className="block sm:flex justify-between max-w-lg">
            <div>
              <p className="mb-4">
                Inspired by{' '}
                <a
                  href="https://www.delish.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="Link--underline"
                  data-testid="delish-link"
                >
                  Delish.com
                </a>
              </p>
            </div>
            <div className="">
              <p>
                Built by{' '}
                <a
                  href="https://lucassilbernagel.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="Link--underline"
                  data-testid="portfolio-link"
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
