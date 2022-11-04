import { HeadFC, useStaticQuery, graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { IRecipe } from '../types'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

export const Head: HeadFC = () => <title>Tasty</title>

const Home = () => {
  const data = useStaticQuery(query)
  const recipes = data.allStrapiRecipe.nodes

  return (
    <>
      <Header isHomePage={true} />
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
