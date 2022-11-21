/* eslint-disable @typescript-eslint/no-explicit-any */
import { HeadFC, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Header from '../Header'
import Footer from '../Footer'
import { IRecipe } from '../../types'

export const Head: HeadFC = ({ pageContext }: any) => {
  return <title>Tasty | {pageContext.name}</title>
}

const AuthorPage = ({ pageContext }: any) => {
  return (
    <>
      <Header />
      <main className="AuthorPage">
        <div className="flex text-left gap-6 flex-col sm:flex-row">
          <div>
            <GatsbyImage
              className="AuthorPhoto"
              alt={pageContext.name}
              image={
                pageContext.photo.localFile.childImageSharp.gatsbyImageData
              }
            />
          </div>
          <div>
            <h1 className="font-black text-5xl">{pageContext.name}</h1>
            <h2 className="text-teal-4 uppercase font-bold my-3">
              {pageContext.jobTitle}
            </h2>
            <p className="text-lg">{pageContext.bio}</p>
          </div>
        </div>
        <div className="mt-12">
          <ul>
            {pageContext.recipes.map((recipe: IRecipe) => {
              return (
                <li
                  key={recipe.id}
                  className="flex justify-between mb-8 flex-col lg:flex-row p-2 duration-300 hover:shadow-xl"
                >
                  <Link
                    to={`/recipes/${recipe.recipeSlug}`}
                    className="text-left pt-4"
                  >
                    <h3 className="font-black text-3xl tracking-wide duration-300 hover:text-teal-4 focus:text-teal-1">
                      {recipe.name}
                    </h3>
                    <p className="tracking-wide my-2">{recipe.tagline}</p>
                    <p className="font-bold text-sm">
                      by <span className="uppercase">{pageContext.name}</span>
                    </p>
                  </Link>
                  <Link
                    to={`/recipes/${recipe.recipeSlug}`}
                    aria-label={recipe.name}
                    className="max-w-[548px] max-h-[275px]"
                  >
                    <GatsbyImage
                      className="w-full h-full max-h-[275px] object-contain"
                      alt={recipe.name}
                      image={
                        recipe.largePhoto.localFile.childImageSharp
                          .gatsbyImageData
                      }
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default AuthorPage
