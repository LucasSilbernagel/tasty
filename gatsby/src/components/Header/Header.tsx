import { useStaticQuery, graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import './Header.css'
import { IRecipe } from '../../types'
import NavBar from '../../components/NavBar'

interface HeaderProps {
  randomRecipe?: IRecipe | null
}

const Header = (props: HeaderProps) => {
  const { randomRecipe } = props
  const data = useStaticQuery(query)
  const tastyLogo = data.strapiTastyLogo.tastyLogo

  return (
    <header data-testid="header" className="border border-b-gray-1 pb-2">
      {randomRecipe && (
        <div className={`HomeHero`}>
          <GatsbyImage
            data-testid="random-recipe-image"
            style={{
              gridArea: '1/1',
              aspectRatio: '3/1',
              width: '100%',
              height: '100%',
            }}
            alt=""
            image={
              randomRecipe?.largePhoto.localFile.childImageSharp.gatsbyImageData
            }
          />

          <div className="w-[95px] absolute top-4 left-4">
            <Link to="/" data-testid="home-link">
              <GatsbyImage
                image={tastyLogo.localFile.childImageSharp.gatsbyImageData}
                alt={tastyLogo.alternativeText}
              />
            </Link>
          </div>
          <div className="TextContainer">
            <h2 className="Tagline">{randomRecipe?.tagline}</h2>
            <Link
              to={`/recipes/${randomRecipe?.recipeSlug}`}
              className="hover:text-orange-1 focus:text-orange-1 duration-500"
              data-testid="random-recipe-link"
            >
              <h1 className="text-4xl mt-5 font-black tracking-wide">
                {randomRecipe?.name}
              </h1>
            </Link>
          </div>
        </div>
      )}
      <NavBar tastyLogo={tastyLogo} />
    </header>
  )
}

export default Header

const query = graphql`
  query {
    strapiTastyLogo {
      tastyLogo {
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
