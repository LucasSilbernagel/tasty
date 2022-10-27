import { HeadFC, useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { useEffect, useState } from 'react'
import '../styles/Home.css'

export const Head: HeadFC = () => <title>Tasty</title>

const Home = () => {
  const data = useStaticQuery(query)
  const tastyLogo = data.strapiTastyLogo.tastyLogo
  const recipes = data.allStrapiRecipe.nodes
  const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)]
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
              ? randomRecipe.largePhoto.url
              : randomRecipe.smallPhoto.url
          })`,
        }}
      >
        <div className="pt-4 pl-4">
          <GatsbyImage
            image={tastyLogo.localFile.childImageSharp.gatsbyImageData}
            alt={tastyLogo.alternativeText}
          />
        </div>
      </div>
    </header>
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
