import { graphql, HeadFC, Link, useStaticQuery } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { ChangeEvent, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
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
      <main>
        <h1 className="sr-only">Search recipes</h1>
        <div className="mt-12">
          <input
            className="mb-2 w-full text-4xl border border-b-gray-400 border-x-transparent border-t-transparent p-2"
            placeholder="Search recipes"
            id="search-form"
            type="text"
            onChange={(e) => handleSearch(e)}
          />
          <p className="text-left text-gray-400">Type keyword(s) to search</p>
        </div>
        <div className="mt-8">
          {searchValue &&
          allRecipes.filter((recipe: IRecipe) =>
            JSON.stringify(recipe)
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          ).length > 0 ? (
            <>
              <h2 className="font-bold text-4xl underline underline-offset-8 decoration-yellow-1 mb-8">
                Recipe results
              </h2>
              <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                {allRecipes
                  .filter((recipe: IRecipe) =>
                    JSON.stringify(recipe)
                      .toLowerCase()
                      .includes(searchValue.toLowerCase())
                  )
                  .map((recipe: IRecipe) => {
                    return (
                      <li key={recipe.id}>
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
          ) : (
            <div className="bg-teal-2 p-2">
              <h2 className="font-black text-4xl">No results</h2>
            </div>
          )}
        </div>
        <div className="mt-8"></div>
      </main>
      <Footer />
    </>
  )
}

export default SearchPage

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
