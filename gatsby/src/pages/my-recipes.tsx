import { HeadFC, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { useEffect, useState } from 'react'
import { IRecipe } from '../types'
import { FaTrash } from 'react-icons/fa'
import ReactTooltip from 'react-tooltip'
import '../styles/my-recipes.css'
import Layout from '../components/Layout'

export const Head: HeadFC = () => <title>Tasty | My Recipes</title>

const MyRecipesPage = () => {
  const [myRecipes, setMyRecipes] = useState([])

  /** Get saved recipes from localStorage */
  useEffect(() => {
    const savedRecipes = localStorage.getItem('myRecipes')
    if (savedRecipes !== null) {
      setMyRecipes(JSON.parse(savedRecipes))
    }
  }, [])

  const removeSavedRecipe = (recipeId: string) => {
    const savedRecipes = localStorage.getItem('myRecipes')
    if (savedRecipes !== null) {
      const oldRecipes = JSON.parse(savedRecipes)
      const newRecipes = oldRecipes.filter(
        (recipe: IRecipe) => recipe.id !== recipeId
      )
      localStorage.setItem('myRecipes', JSON.stringify(newRecipes))
      setMyRecipes(newRecipes)
    }
  }

  return (
    <Layout pageTitle="My Recipes" pageRoute="/my-recipes">
      <h1 className="font-black text-4xl mb-12">My recipes</h1>
      {myRecipes.length > 0 ? (
        <ul className="RecipeGrid">
          {myRecipes.map((recipe: IRecipe) => {
            return (
              <li
                key={recipe.id}
                className="relative p-2 duration-300 hover:shadow-xl focus:shadow-xl"
              >
                <div className="absolute top-2 right-2 z-20 bg-red-700 text-white w-[50px] h-[50px]">
                  <button
                    onClick={() => removeSavedRecipe(recipe.id)}
                    className="w-full h-full hover:contrast-50 focus:contrast-50 flex justify-center items-center"
                    aria-label={`remove ${recipe.name}`}
                    data-tip={`Remove ${recipe.name}`}
                  >
                    <FaTrash fontSize="1.5rem" />
                  </button>
                </div>
                <ReactTooltip />
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
                    <h2 className="RecipeGrid__Name">{recipe.name}</h2>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      ) : (
        <>
          <h2 className="text-5xl mt-12 mb-24 text-blue-1">
            No recipes saved!
          </h2>
          <Link className="SeeAllRecipes" to="/all-recipes">
            See all recipes
          </Link>
        </>
      )}
    </Layout>
  )
}

export default MyRecipesPage
