import { graphql, HeadFC, useStaticQuery } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import RecipeCards from '../components/RecipeCards'

export const Head: HeadFC = () => <title>Tasty | All Recipes</title>

const AllRecipesPage = () => {
  const data = useStaticQuery(query)
  const recipesPageData = data.strapiRecipesPage
  const tastyLogo = data.strapiTastyLogo.tastyLogo
  return (
    <>
      <header>
        <NavBar tastyLogo={tastyLogo} />
        <div className="mt-1 relative">
          <GatsbyImage
            style={{
              gridArea: '1/1',
              aspectRatio: '3/1',
              width: '100%',
              height: '100%',
            }}
            alt=""
            image={
              recipesPageData.HeroImage.localFile.childImageSharp
                .gatsbyImageData
            }
          />
          <div className="bg-white absolute bottom-4 sm:bottom-14 left-14 uppercase font-bold text-4xl p-4">
            <h1>Recipes</h1>
          </div>
        </div>
      </header>
      <main>
        <div className="mb-8">
          <p className="text-lg tracking-wide text-left">
            {recipesPageData.description}
          </p>
        </div>
        <RecipeCards title="Most popular" subtitle="Must-try recipes." />
      </main>
      <Footer />
    </>
  )
}

export default AllRecipesPage

const query = graphql`
  query {
    strapiRecipesPage {
      HeroImage {
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      description
    }
    strapiTastyLogo {
      tastyLogo {
        alternativeText
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`
