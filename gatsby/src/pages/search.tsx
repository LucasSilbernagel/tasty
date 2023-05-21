import { graphql, HeadFC, Link, useStaticQuery } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { ChangeEvent, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { IRecipe } from '../types'

export const Head: HeadFC = () => <title>Tasty | Search</title>

const SearchPage = () => {
  const data = useStaticQuery(query)
  const allRecipes = data.allStrapiRecipe.nodes

  const [searchValue, setSearchValue] = useState('')

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 3) {
      setSearchValue(e.target.value)
    } else if (e.target.value.length < 1) {
      setSearchValue('')
    }
  }

  return (
    <>
      <Header />
      <>
        <h1 className="sr-only">Search recipes</h1>
        <div className="mt-12">
          <input
            className="mb-2 w-full text-4xl border border-b-gray-400 border-x-transparent border-t-transparent p-2"
            placeholder="Search recipes"
            id="search-form"
            type="text"
            onChange={(e) => handleSearch(e)}
          />
          <p className="text-left text-gray-600">Type keyword(s) to search</p>
        </div>
        <div className="mt-8">
          {searchValue &&
          allRecipes.filter((recipe: IRecipe) =>
            JSON.stringify(recipe)
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          ).length > 0 ? (
            <>
              <h2 className="SectionHeader mb-8">Recipe results</h2>
              <ul className="RecipeGrid">
                {allRecipes
                  .filter((recipe: IRecipe) =>
                    JSON.stringify(recipe)
                      .toLowerCase()
                      .includes(searchValue.toLowerCase())
                  )
                  .map((recipe: IRecipe) => {
                    return (
                      <li
                        key={recipe.id}
                        className="p-2 duration-300 hover:shadow-xl focus:shadow-xl"
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
          ) : (
            <div className="bg-teal-2 p-2">
              <h2 className="font-black text-4xl">No results</h2>
            </div>
          )}
        </div>
        <div className="mt-8"></div>
      </>
      <Footer />
    </>
  )
}

export default SearchPage

const query = graphql`
  query {
    allStrapiRecipe {
      nodes {
        author {
          name
        }
        introText {
          data {
            introText
          }
        }
        tagline
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
