import { HeadFC, useStaticQuery, graphql } from 'gatsby'
import { useEffect, useState } from 'react'
import '../styles/Home.css'

export const Head: HeadFC = () => <title>Tasty Recipes</title>

const Home = () => {
  const data = useStaticQuery(query)
  const homePageData = data.strapiHomePage
  const recipes = data.allStrapiRecipe.nodes
  console.log(recipes)

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

  return (
    <header>
      <div
        className={`HomeHero`}
        style={{
          backgroundImage: `url(${process.env.STRAPI_API_URL}${
            screenWidth > 600
              ? homePageData.heroBackgroundLarge.url
              : homePageData.heroBackgroundSmall.url
          })`,
        }}
      >
        <div className="pt-4 pl-4">
          <img
            src={`${process.env.STRAPI_API_URL}${homePageData.heroLogo.url}`}
            alt="Tasty logo"
          />
        </div>
      </div>
    </header>
  )
}

export default Home

const query = graphql`
  query {
    strapiHomePage {
      heroBackgroundSmall {
        url
      }
      heroBackgroundLarge {
        url
      }
      heroLogo {
        url
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
        }
        name
        prepTime
        publishedAt
        recipeSlug
        smallPhoto {
          alternativeText
          url
        }
        tagline
        totalTime
        yields
      }
    }
  }
`
