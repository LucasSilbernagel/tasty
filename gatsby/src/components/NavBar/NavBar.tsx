import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import { useState } from 'react'
import './NavBar.css'

interface NavBarProps {
  tastyLogo: {
    localFile: { childImageSharp: { gatsbyImageData: IGatsbyImageData } }
    alternativeText: string
  }
}

const NavBar = (props: NavBarProps) => {
  const { tastyLogo } = props

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="NavBar">
      <div className="flex">
        <button
          className="MenuButton"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
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
      </div>
      <div>
        <button className="AccentButton">Subscribe</button>
        <button className="TextButton">Sign in</button>
      </div>
      <div className="h-[1px] w-full bg-gray-300 mt-1"></div>
      <div
        className={`Menu ${
          isMenuOpen
            ? 'visible animate-slide-in'
            : 'invisible animate-slide-out'
        }`}
      ></div>
    </div>
  )
}

export default NavBar
