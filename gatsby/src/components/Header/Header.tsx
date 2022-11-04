import { useStaticQuery, graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { useEffect, useState } from 'react'
import './Header.css'
import { IRecipe } from '../../types'
import NavBar from '../../components/NavBar/NavBar'

interface HeaderProps {
  isHomePage?: boolean
}

const Header = (props: HeaderProps) => {
  const { isHomePage } = props
  const data = useStaticQuery(query)
  const tastyLogo = data.strapiTastyLogo.tastyLogo
  const recipes = data.allStrapiRecipe.nodes
  const [randomRecipe, setRandomRecipe] = useState<IRecipe | null>(null)

  /** Select a random recipe to display in the hero on page load */
  useEffect(() => {
    if (recipes.length > 0) {
      setRandomRecipe(recipes[Math.floor(Math.random() * recipes.length)])
    }
  }, [recipes])

  return (
    <header>
      {isHomePage && (
        <div className={`HomeHero`}>
          {randomRecipe &&
            randomRecipe.largePhoto.localFile.childImageSharp
              .gatsbyImageData && (
              <GatsbyImage
                style={{
                  gridArea: '1/1',
                  aspectRatio: '3/1',
                  width: '100%',
                  height: '100%',
                }}
                alt=""
                image={
                  randomRecipe?.largePhoto.localFile.childImageSharp
                    .gatsbyImageData
                }
              />
            )}
          <div className="w-[95px] absolute top-4 left-4">
            <Link to="/">
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
    allStrapiRecipe {
      nodes {
        author {
          bio
          jobTitle
          name
          photo {
            alternativeText
            url
          }
        }
        id
        directions {
          data {
            directions
          }
        }
        ingredients {
          data {
            ingredients
          }
        }
        introText {
          data {
            introText
          }
        }
        largePhoto {
          alternativeText
          url
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        name
        prepTime
        publishedAt
        recipeSlug
        smallPhoto {
          alternativeText
          url
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        tagline
        totalTime
        yields
      }
    }
  }
`
