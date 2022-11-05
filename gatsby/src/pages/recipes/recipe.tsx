/* eslint-disable @typescript-eslint/no-explicit-any */
import { HeadFC, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'

export const Head: HeadFC = ({ pageContext }: any) => {
  const { name } = pageContext
  return <title>Tasty | {name}</title>
}

const RecipePage = ({ pageContext }: any) => {
  const { name, author } = pageContext
  return (
    <>
      <Header />
      <main>
        <h1 className="font-black text-4xl">{name}</h1>
        <div>
          <GatsbyImage
            alt={author.name}
            image={author.photo.localFile.childImageSharp.gatsbyImageData}
            className="rounded-full h-[40px] w-[40px]"
          />
          <p>
            by <Link to={`/authors/${author.authorSlug}`}>{author.name}</Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default RecipePage
