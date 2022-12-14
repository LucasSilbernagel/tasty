import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import { useEffect, useState } from 'react'
import './NavBar.css'
import { FaSearch, FaTimes, FaRegBookmark } from 'react-icons/fa'
import { Link } from 'gatsby'
import { ToastContainer, toast } from 'react-toastify'

interface NavBarProps {
  tastyLogo: {
    localFile: { childImageSharp: { gatsbyImageData: IGatsbyImageData } }
    alternativeText: string
  }
}

const NavBar = (props: NavBarProps) => {
  const { tastyLogo } = props

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    /** Close menu when Escape key is pressed */
    if (isMenuOpen) {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          setIsMenuOpen(false)
        }
      })
    }
    document.removeEventListener('keydown', (e) => e.key === 'Escape')
  }, [isMenuOpen])

  return (
    <>
      <div className="NavBar">
        <div className="flex">
          <button
            className="MenuButton"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'close menu' : 'open menu'}
          >
            <div className="MenuButton-Line mb-2"></div>
            <div className="MenuButton-Line mb-2"></div>
            <div className="MenuButton-Line"></div>
          </button>
          <div className="w-[75px] flex items-center ml-2 mt-3">
            <Link to="/">
              <GatsbyImage
                image={tastyLogo.localFile.childImageSharp.gatsbyImageData}
                alt={tastyLogo.alternativeText}
              />
            </Link>
          </div>
          <div className="flex items-center ml-2 sm:ml-8">
            <Link
              className="inline-block uppercase Link--underline"
              to="/all-recipes"
            >
              Recipes
            </Link>
          </div>
        </div>
        <button className="AccentButton" onClick={() => toast('Subscribed!')}>
          Subscribe
        </button>
        {isMenuOpen && (
          <div
            onClick={() => setIsMenuOpen(false)}
            className="fixed top-0 left-0 right-0 bottom-0 z-10"
          ></div>
        )}
        <div
          className={`Menu ${
            isMenuOpen
              ? 'visible animate-slide-in'
              : 'invisible animate-slide-out'
          }`}
        >
          <div className="SearchContainer">
            <Link
              className="w-full hover:contrast-50 focus:contrast-50"
              to="/search"
            >
              <div className="flex items-center">
                <FaSearch className="text-xl" />{' '}
                <span className="ml-4">Search</span>
              </div>
            </Link>
            <button
              aria-label="close menu"
              onClick={() => setIsMenuOpen(false)}
              className="hover:contrast-50 focus:contrast-50"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
          <div className="MenuButton--container">
            <button
              className="Link--underline w-full text-left"
              onClick={() => toast('Subscribed!')}
            >
              Subscribe
            </button>
          </div>
          <div className="MenuButton--container">
            <Link
              to="/my-recipes"
              className="flex items-center Link--underline"
            >
              <FaRegBookmark className="mr-2 " /> My Recipes
            </Link>
          </div>
          <div className="MenuButton--container">
            <Link className="flex Link--underline" to="/all-recipes">
              All Recipes
            </Link>
          </div>
          <div className="MenuButton--container">
            <Link className="flex Link--underline" to="/about-us">
              About Us
            </Link>
          </div>
        </div>
      </div>
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

export default NavBar
