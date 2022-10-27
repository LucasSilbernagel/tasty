/* eslint-disable @typescript-eslint/no-explicit-any */
import { HeadFC, PageProps } from 'gatsby'

interface IDirectionData {
  directions: string
}

interface IIngredientData {
  ingredients: string
}

interface IIntroText {
  introText: string
}

interface IPhoto {
  url: string
  alternativeText: string
}

interface IAuthor {
  bio: string
  jobTitle: string
  name: string
  photo: IPhoto
}

interface RecipeContext {
  author: IAuthor
  id: string
  directions: IDirectionData
  ingredients: IIngredientData
  introText: IIntroText
  largePhoto: IPhoto
  smallPhoto: IPhoto
  name: string
  prepTime: string
  publishedAt: string
  recipeSlug: string
  tagline: string
  totalTime: string
  yields: string
}

export const Head: HeadFC = ({ pageContext }: any) => {
  const { name } = pageContext
  return <title>Tasty | {name}</title>
}

const RecipePage = ({ pageContext }: any) => {
  // eslint-disable-next-line react/prop-types
  // const { name } = data.strapiRecipe
  const { name, recipeSlug } = pageContext
  // const data = useStaticQuery(query)
  // console.log(query)
  // console.log(window.location.pathname.split('/')[2])
  return (
    <main>
      <h1>{name}</h1>
    </main>
  )
}

export default RecipePage
