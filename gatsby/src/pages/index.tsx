import { graphql, HeadFC, useStaticQuery } from 'gatsby'
import RecipeCards from '../components/RecipeCards'
import { useEffect, useState } from 'react'
import { IRecipe } from '../types'
import Layout from '../components/Layout'

export const Head: HeadFC = () => <title>Tasty</title>

const Home = () => {
  const data = useStaticQuery(query)
  const recipes = data.allStrapiRecipe.nodes
  const homePage = data.strapiHomePage
  const [randomRecipe, setRandomRecipe] = useState<IRecipe | null>(null)

  /** Select a random recipe to display in the hero on page load */
  useEffect(() => {
    if (recipes.length > 0) {
      setRandomRecipe(recipes[Math.floor(Math.random() * recipes.length)])
    }
  }, [recipes])

  return (
    <Layout
      pageTitle={homePage.SEO.pageTitle}
      pageDescription={homePage.SEO.pageDescription}
      pageImage={homePage.SEO.pageImage.localFile.url}
      pageRoute="/"
      randomRecipe={randomRecipe}
    >
      <RecipeCards
        title={homePage.featuredTitle}
        subtitle={homePage.featuredDescription}
        numCards={4}
        currentRecipeSlug={randomRecipe?.recipeSlug}
      />
    </Layout>
  )
}

export default Home

const query = graphql`
  query {
    allStrapiRecipe {
      nodes {
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
        recipeSlug
        tagline
      }
    }
    strapiHomePage {
      featuredTitle
      featuredDescription
      SEO {
        pageTitle
        pageDescription
        pageImage {
          localFile {
            url
          }
        }
      }
    }
  }
`
