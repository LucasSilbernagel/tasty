import { graphql, HeadFC, useStaticQuery } from 'gatsby'
import Header from '../components/Header'
import Footer from '../components/Footer'
import RecipeCards from '../components/RecipeCards'
import { useEffect, useState } from 'react'
import { IRecipe } from '../types'

export const Head: HeadFC = () => <title>Tasty</title>

const Home = () => {
  const data = useStaticQuery(query)
  const recipes = data.allStrapiRecipe.nodes
  const homePageText = data.strapiHomePage
  const [randomRecipe, setRandomRecipe] = useState<IRecipe | null>(null)

  /** Select a random recipe to display in the hero on page load */
  useEffect(() => {
    if (recipes.length > 0) {
      setRandomRecipe(recipes[Math.floor(Math.random() * recipes.length)])
    }
  }, [recipes])

  return (
    <>
      <Header isHomePage={true} randomRecipe={randomRecipe} />
      <main>
        <RecipeCards
          title={homePageText.featuredTitle}
          subtitle={homePageText.featuredDescription}
          numCards={4}
          currentRecipeSlug={randomRecipe?.recipeSlug}
        />
      </main>
      <Footer />
    </>
  )
}

export default Home

const query = graphql`
  query {
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
    strapiHomePage {
      featuredTitle
      featuredDescription
    }
  }
`
