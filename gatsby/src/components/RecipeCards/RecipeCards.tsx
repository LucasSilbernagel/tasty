import { useStaticQuery, graphql, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { IRecipe } from '../../types'

interface RecipeCardProps {
  title: string
  subtitle?: string
  numCards?: number
  currentRecipeSlug?: string
}

const RecipeCards = (props: RecipeCardProps) => {
  const { title, subtitle, numCards, currentRecipeSlug } = props
  const data = useStaticQuery(query)
  const recipes = data.allStrapiRecipe.nodes

  let filteredRecipes = recipes
  /** For "more recipes", don't display the recipes that's already being displayed as the main recipe */
  if (currentRecipeSlug) {
    filteredRecipes = recipes.filter(
      (selectedRecipe: IRecipe) =>
        selectedRecipe.recipeSlug !== currentRecipeSlug
    )
  }

  return (
    <>
      <h2 className="SectionHeader mb-4">{title}</h2>
      <h3 className="text-lg mb-6">{subtitle}</h3>
      <ul className="RecipeGrid">
        {filteredRecipes.slice(0, numCards).map((recipe: IRecipe) => {
          return (
            <li
              key={recipe.id}
              className="p-2 hover:shadow-xl focus:shadow-xl duration-300"
            >
              <Link to={`/recipes/${recipe.recipeSlug}`}>
                <div className="RecipeGrid__Image">
                  <GatsbyImage
                    image={
                      recipe.smallPhoto.localFile.childImageSharp
                        .gatsbyImageData
                    }
                    alt={recipe.name}
                    className="object-cover RecipeGrid__Image"
                  />
                </div>
                <div className="w-full flex justify-center">
                  <h4 className="RecipeGrid__Name">{recipe.name}</h4>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default RecipeCards

const query = graphql`
  query {
    allStrapiRecipe {
      nodes {
        id
        name
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
      }
    }
  }
`
