import { HeadFC, useStaticQuery, graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { useEffect, useState } from 'react'
import '../styles/Home.css'
import { IRecipe } from '../types'
import NavBar from '../components/NavBar/NavBar'
import Footer from '../components/Footer/Footer'

export const Head: HeadFC = () => <title>Tasty</title>

const Home = () => {
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
    <>
      <header>
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
        <NavBar tastyLogo={tastyLogo} />
      </header>
      <main className="py-6 px-2 mx-auto max-w-screen-lg">
        <h2 className="font-bold text-4xl underline underline-offset-8 decoration-yellow-1 mb-4">
          Editor&apos;s Picks
        </h2>
        <h3 className="text-lg mb-6">
          Recipes we can&apos;t stop talking about.
        </h3>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {recipes.slice(0, 4).map((recipe: IRecipe) => {
            return (
              <li key={recipe.id}>
                <Link to={`/recipes/${recipe.recipeSlug}`}>
                  <div className="w-full h-[148px] sm:h-[309px] md:h-[250px]">
                    <GatsbyImage
                      image={
                        recipe.smallPhoto.localFile.childImageSharp
                          .gatsbyImageData
                      }
                      alt={recipe.name}
                      className="object-cover w-full h-[148px] sm:h-[309px] md:h-[250px]"
                    />
                  </div>
                  <h4 className="font-bold text-lg hover:text-orange-1 duration-500">
                    {recipe.name}
                  </h4>
                </Link>
              </li>
            )
          })}
        </ul>
      </main>
      <Footer />
    </>
  )
}

export default Home

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
