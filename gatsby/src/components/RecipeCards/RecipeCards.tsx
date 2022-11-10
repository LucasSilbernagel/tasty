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
  if (currentRecipeSlug) {
    filteredRecipes = recipes.filter(
      (selectedRecipe: IRecipe) =>
        selectedRecipe.recipeSlug !== currentRecipeSlug
    )
  }

  return (
    <>
      <h2 className="font-bold text-4xl underline underline-offset-8 decoration-yellow-1 mb-4">
        {title}
      </h2>
      <h3 className="text-lg mb-6">{subtitle}</h3>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        {filteredRecipes.slice(0, numCards).map((recipe: IRecipe) => {
          return (
            <li
              key={recipe.id}
              className="p-2 hover:shadow-xl focus:shadow-xl duration-300"
            >
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
                <div className="w-full flex justify-center">
                  <h4 className="font-bold text-lg text-left hover:text-orange-1 duration-500">
                    {recipe.name}
                  </h4>
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
