/* eslint-disable @typescript-eslint/no-explicit-any */
import { HeadFC, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { DateTime } from 'luxon'
import { FaBookmark } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'
import './RecipePage.css'
import rehypeRaw from 'rehype-raw'
import RecipeCards from '../../components/RecipeCards'
import scrollTo from 'gatsby-plugin-smoothscroll'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { IRecipe } from '../../types'
import Layout from '../../components/Layout'
import removeMd from 'remove-markdown'

export const Head: HeadFC = ({ pageContext }: any) => {
  const { name } = pageContext
  return <title>Tasty | {name}</title>
}

const RecipePage = ({ pageContext }: any) => {
  const {
    name,
    id,
    author,
    publishedAt,
    largePhoto,
    smallPhoto,
    introText,
    yields,
    prepTime,
    totalTime,
    ingredients,
    directions,
    recipeSlug,
  } = pageContext

  const saveRecipe = () => {
    const savedRecipes = localStorage.getItem('myRecipes')
    const newRecipe = {
      id: id,
      name: name,
      smallPhoto: smallPhoto,
      recipeSlug: recipeSlug,
    }
    if (
      savedRecipes !== null &&
      !JSON.parse(savedRecipes).find((recipe: IRecipe) => recipe.id === id)
    ) {
      localStorage.setItem(
        'myRecipes',
        JSON.stringify([...JSON.parse(savedRecipes), newRecipe])
      )
    } else {
      localStorage.setItem('myRecipes', JSON.stringify([newRecipe]))
    }
    toast('Saved!')
  }

  return (
    <Layout
      pageTitle={name}
      pageRoute={`/recipes/${recipeSlug}`}
      pageImage={largePhoto.localFile.url}
      pageDescription={`${removeMd(introText.data.introText)
        .replace(/\\/g, '')
        .replace(/\n/g, '')
        .slice(0, 160)}...`}
    >
      <>
        <div className="Recipe">
          <h1 className="font-black text-4xl mb-4">{name}</h1>
          <div className="About">
            <div className="AuthorPhoto__container">
              <GatsbyImage
                alt={author.name}
                image={author.photo.localFile.childImageSharp.gatsbyImageData}
                className="AuthorPhoto"
              />
            </div>
            <p className="About__author">
              by{' '}
              <Link
                className="underline underline-offset-4 hover:text-blue-1 focus:text-blue-1 uppercase"
                to={`/authors/${author.authorSlug}`}
              >
                {author.name}
              </Link>
            </p>
            <p className="About__published">
              Published:{' '}
              {DateTime.fromISO(publishedAt).toLocaleString(DateTime.DATE_MED)}
            </p>
          </div>
          <div className="Buttons">
            <button onClick={() => scrollTo('#recipe-top')} className="Button">
              Jump to recipe
            </button>
            <button onClick={saveRecipe} className="Button flex items-center">
              <FaBookmark className="mr-2 inline-block" /> Save to my recipes
            </button>
          </div>
          <div className="mt-4 mx-auto max-w-xl">
            <GatsbyImage
              alt={name}
              image={largePhoto.localFile.childImageSharp.gatsbyImageData}
            />
          </div>
          <div className="IntroText">
            <ReactMarkdown>{introText.data.introText}</ReactMarkdown>
          </div>
          <div className="Numbers" id="recipe-top">
            <div className="Numbers__container">
              <div>
                <p>Yields:</p>
                <p className="text-blue-1">{yields}</p>
              </div>
              <div className="PrepTime">
                <p>Prep time:</p>
                <p className="text-blue-1">{prepTime}</p>
              </div>
              <div>
                <p>Total time:</p>
                <p className="text-blue-1">{totalTime}</p>
              </div>
            </div>
          </div>
          <div className="Instructions">
            <div className="Ingredients">
              <h2 className="font-black text-xl mb-8">Ingredients</h2>
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                {ingredients.data.ingredients}
              </ReactMarkdown>
            </div>
            <div className="DirectionsContainer">
              <div className="flex justify-between">
                <h2 className="font-black text-xl mb-8">Directions</h2>
                <button
                  onClick={saveRecipe}
                  className="Button flex items-center"
                >
                  <FaBookmark className="mr-2 inline-block" /> Save to my
                  recipes
                </button>
              </div>
              <ReactMarkdown rehypePlugins={[rehypeRaw]} className="Directions">
                {directions.data.directions}
              </ReactMarkdown>
            </div>
          </div>
          <div className="AuthorSection">
            <div className="text-sm uppercase flex gap-4">
              <div>
                <p>
                  <Link
                    className="underline underline-offset-4 hover:text-blue-1 focus:text-blue-1"
                    to={`/authors/${author.authorSlug}`}
                  >
                    {author.name}
                  </Link>
                </p>
              </div>
              <div>
                <p>{author.jobTitle}</p>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-left">{author.bio}</p>
            </div>
          </div>
          <div>
            <RecipeCards
              title="More recipes"
              currentRecipeSlug={recipeSlug}
              numCards={4}
            />
          </div>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          closeOnClick
          pauseOnFocusLoss
          pauseOnHover
          theme="colored"
          toastStyle={{ backgroundColor: '#004685', color: '#FFFFFF' }}
        />
      </>
    </Layout>
  )
}

export default RecipePage
