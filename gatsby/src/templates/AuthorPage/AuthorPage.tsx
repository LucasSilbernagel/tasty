/* eslint-disable @typescript-eslint/no-explicit-any */
import { HeadFC, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { IRecipe } from '../../types'
import './AuthorPage.css'

export const Head: HeadFC = ({ pageContext }: any) => {
  return <title>Tasty | {pageContext.name}</title>
}

const AuthorPage = ({ pageContext }: any) => {
  return (
    <>
      <Header />
      <div className="AuthorPage">
        <div className="AuthorBio">
          <div className="AuthorPhoto__container">
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
            <h2 className="AuthorBio__jobTitle">{pageContext.jobTitle}</h2>
            <p className="text-lg">{pageContext.bio}</p>
          </div>
        </div>
        <div className="mt-12">
          <ul>
            {pageContext.recipes.map((recipe: IRecipe) => {
              return (
                <li key={recipe.id} className="Recipe">
                  <Link
                    to={`/recipes/${recipe.recipeSlug}`}
                    className="Recipe__textContainer"
                  >
                    <h3 className="Recipe__header">{recipe.name}</h3>
                    <p className="Recipe__tagline">{recipe.tagline}</p>
                    <p className="Recipe__authorName">
                      by <span className="uppercase">{pageContext.name}</span>
                    </p>
                  </Link>
                  <Link
                    to={`/recipes/${recipe.recipeSlug}`}
                    aria-label={recipe.name}
                    className="Recipe__imageContainer"
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
      </div>
      <Footer />
    </>
  )
}

export default AuthorPage
