/* eslint-disable @typescript-eslint/no-explicit-any */
import { HeadFC, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import { DateTime } from 'luxon'
import { FaBookmark } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'
import './recipe.css'
import rehypeRaw from 'rehype-raw'
import RecipeCards from '../../components/RecipeCards/RecipeCards'

export const Head: HeadFC = ({ pageContext }: any) => {
  const { name } = pageContext
  return <title>Tasty | {name}</title>
}

const RecipePage = ({ pageContext }: any) => {
  const {
    name,
    author,
    publishedAt,
    largePhoto,
    introText,
    yields,
    prepTime,
    totalTime,
    ingredients,
    directions,
    recipeSlug,
  } = pageContext

  return (
    <>
      <Header />
      <main className="Recipe">
        <h1 className="font-black text-4xl mb-4">{name}</h1>
        <div className="flex justify-center items-center">
          <GatsbyImage
            alt={author.name}
            image={author.photo.localFile.childImageSharp.gatsbyImageData}
            className="rounded-full h-[40px] w-[40px]"
          />
          <p className="font-bold text-sm ml-2 mr-3">
            by{' '}
            <Link
              className="underline underline-offset-4 hover:text-blue-1 focus:text-blue-1 uppercase"
              to={`/authors/${author.authorSlug}`}
            >
              {author.name}
            </Link>
          </p>
          <p className="uppercase text-gray-500 text-sm">
            Published:{' '}
            {DateTime.fromISO(publishedAt).toLocaleString(DateTime.DATE_MED)}
          </p>
        </div>
        <div className="flex max-w-max mx-auto gap-4 mt-8 flex-col sm:flex-row">
          <button className="bg-blue-1 text-white uppercase p-2 text-sm duration-300 hover:bg-black focus:bg-black">
            Jump to recipe
          </button>
          <button className="bg-blue-1 text-white flex items-center uppercase p-2 text-sm duration-300 hover:bg-black focus:bg-black">
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
        <div className="uppercase bg-teal-3 font-bold">
          <div className="flex justify-between py-4 mx-auto max-w-md">
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
          <div className="max-w-[300px]">
            <h2 className="font-black text-xl mb-8">Ingredients</h2>
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {ingredients.data.ingredients}
            </ReactMarkdown>
          </div>
          <div className="max-w-[650px]">
            <div className="flex justify-between">
              <h2 className="font-black text-xl mb-8">Directions</h2>
              <button className="bg-blue-1 text-white flex items-center uppercase p-2 text-sm h-[36px] duration-300 hover:bg-black focus:bg-black">
                <FaBookmark className="mr-2 inline-block" /> Save to my recipes
              </button>
            </div>
            <ReactMarkdown rehypePlugins={[rehypeRaw]} className="Directions">
              {directions.data.directions}
            </ReactMarkdown>
          </div>
        </div>
        <div className="my-8 max-w-xl mx-auto border border-y-gray-300 border-x-transparent py-8">
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
      </main>
      <Footer />
    </>
  )
}

export default RecipePage
