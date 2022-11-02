import { HeadFC, useStaticQuery, graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { useEffect, useState } from 'react'
import '../styles/Home.css'
import { IRecipe } from '../types'
import NavBar from '../components/NavBar/NavBar'
import {
  FaTwitter,
  FaYoutube,
  FaFacebook,
  FaInstagram,
  FaPinterest,
} from 'react-icons/fa'

export const Head: HeadFC = () => <title>Tasty</title>

const Home = () => {
  const data = useStaticQuery(query)
  const tastyLogo = data.strapiTastyLogo.tastyLogo
  const tastyLogoWhite = data.strapiTastyLogoWhite.tastyLogoWhite
  const recipes = data.allStrapiRecipe.nodes
  const [randomRecipe, setRandomRecipe] = useState<IRecipe | null>(null)

  const [screenWidth, setScreenWidth] = useState<number>(0)

  /** Keep track of screen width */
  useEffect(() => {
    if (typeof window === 'undefined') return
    const handleResize = () => setScreenWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

  /** Select a random recipe to display in the hero on page load */
  useEffect(() => {
    if (recipes.length > 0) {
      setRandomRecipe(recipes[Math.floor(Math.random() * recipes.length)])
    }
  }, [recipes])

  return (
    <>
      <header>
        <div
          className={`HomeHero`}
          style={{
            backgroundImage: `url(${process.env.STRAPI_API_URL}${
              screenWidth > 600
                ? randomRecipe?.largePhoto.url
                : randomRecipe?.smallPhoto.url
            })`,
          }}
        >
          <div className="pt-8 pl-8 w-[95px]">
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
                <FaTwitter />
              </a>
              <a
                href="#"
                className="hover:scale-125 focus:scale-125 duration-300"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
              <a
                href="#"
                className="hover:scale-125 focus:scale-125 duration-300"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="hover:scale-125 focus:scale-125 duration-300"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="hover:scale-125 focus:scale-125 duration-300"
                aria-label="Pinterest"
              >
                <FaPinterest />
              </a>
            </div>
          </div>
          <div className="mt-8 block sm:flex justify-between max-w-lg">
            <button
              className="hover:underline focus:underline underline-offset-4"
              onClick={() => alert('Subscribed!')}
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
