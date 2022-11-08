import { HeadFC, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { useEffect, useState } from 'react'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import { IRecipe } from '../types'
import { FaTrash } from 'react-icons/fa'
import ReactTooltip from 'react-tooltip'

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
    <>
      <Header />
      <main>
        <h1 className="font-black text-4xl mb-12">My recipes</h1>
        {myRecipes.length > 0 ? (
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {myRecipes.map((recipe: IRecipe) => {
              return (
                <li key={recipe.id} className="relative">
                  <div className="absolute top-0 right-0 z-20 bg-blue-1 text-white">
                    <button
                      onClick={() => removeSavedRecipe(recipe.id)}
                      className="w-full h-full hover:contrast-50 focus:contrast-50 p-2"
                      aria-label={`remove ${recipe.name}`}
                      data-tip={`Remove ${recipe.name}`}
                    >
                      <FaTrash />
                    </button>
                  </div>
                  <ReactTooltip />
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
        ) : (
          <>
            <h2 className="text-5xl mt-12 mb-24 text-blue-1">
              No recipes saved!
            </h2>
            <Link
              className="bg-teal-1 duration-300 p-4 rounded-sm text-xl font-black underline underline-offset-4 hover:bg-black hover:text-white focus:bg-black focus:text-white"
              to="/all-recipes"
            >
              See all recipes
            </Link>
          </>
        )}
      </main>
      <Footer />
    </>
  )
}

export default MyRecipesPage
