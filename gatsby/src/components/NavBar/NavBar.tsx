import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import { useEffect, useState } from 'react'
import './NavBar.css'
import { FaSearch, FaTimes, FaRegBookmark } from 'react-icons/fa'
import { Link } from 'gatsby'

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
          <GatsbyImage
            image={tastyLogo.localFile.childImageSharp.gatsbyImageData}
            alt={tastyLogo.alternativeText}
          />
        </div>
        <div className="flex items-center ml-2 sm:ml-8">
          <Link
            className="inline-block uppercase hover:underline focus:underline underline-offset-4"
            to="/all-recipes"
          >
            Recipes
          </Link>
        </div>
      </div>
      <button className="AccentButton" onClick={() => alert('Subscribed!')}>
        Subscribe
      </button>
      <div className="h-[1px] w-full bg-gray-300 mt-1 lg:hidden"></div>
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
        <div className="flex justify-between border border-transparent border-b-gray-400 pb-4 mb-8">
          <Link to="/search">
            <div className="flex items-center">
              <FaSearch className="text-xl" />{' '}
              <span className="ml-4">Search</span>
            </div>
          </Link>
          <button aria-label="close menu" onClick={() => setIsMenuOpen(false)}>
            <FaTimes className="text-xl" />
          </button>
        </div>
        <button
          className="mb-8 hover:underline focus:underline underline-offset-4"
          onClick={() => alert('Subscribed!')}
        >
          Subscribe
        </button>
        <Link
          to="/my-recipes"
          className="flex items-center mb-8 hover:underline focus:underline underline-offset-4"
        >
          <FaRegBookmark className="mr-2 " /> My Recipes
        </Link>
        <Link
          className="mb-8 flex hover:underline focus:underline underline-offset-4"
          to="/all-recipes"
        >
          All Recipes
        </Link>
        <Link
          className="flex mb-8 hover:underline focus:underline underline-offset-4"
          to="/about-us"
        >
          About Us
        </Link>
      </div>
    </div>
  )
}

export default NavBar
