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

const Footer = () => {
  const data = useStaticQuery(query)
  const tastyLogoWhite = data.strapiTastyLogoWhite.tastyLogoWhite

  return (
    <>
      <footer className="bg-black text-white">
        <div className="py-6 px-4 mx-auto max-w-screen-lg bg-black">
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
            <div className="flex justify-between w-56 mt-4">
              <a
                href="#"
                className="hover:scale-125 focus:scale-125 duration-300"
                aria-label="Twitter"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a
                href="#"
                className="hover:scale-125 focus:scale-125 duration-300"
                aria-label="YouTube"
              >
                <FaYoutube className="text-xl" />
              </a>
              <a
                href="#"
                className="hover:scale-125 focus:scale-125 duration-300"
                aria-label="Facebook"
              >
                <FaFacebook className="text-xl" />
              </a>
              <a
                href="#"
                className="hover:scale-125 focus:scale-125 duration-300"
                aria-label="Instagram"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="#"
                className="hover:scale-125 focus:scale-125 duration-300"
                aria-label="Pinterest"
              >
                <FaPinterest className="text-xl" />
              </a>
            </div>
          </div>
          <div className="mt-8 block sm:flex justify-between max-w-lg">
            <button
              className="hover:underline focus:underline underline-offset-4"
              onClick={() => toast('Subscribed!')}
            >
              Subscribe
            </button>
            <Link
              to="/about-us"
              className="block mt-4 sm:mt-0 hover:underline focus:underline underline-offset-4"
            >
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
                  className="hover:underline focus:underline underline-offset-4"
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
                  className="hover:underline focus:underline underline-offset-4"
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
