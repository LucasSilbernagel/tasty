/* eslint-disable @typescript-eslint/no-explicit-any */
import { HeadFC, Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import { DateTime } from 'luxon'
import { FaBookmark } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'
import './recipe.css'

export const Head: HeadFC = ({ pageContext }: any) => {
  const { name } = pageContext
  return <title>Tasty | {name}</title>
}

const RecipePage = ({ pageContext }: any) => {
  const { name, author, publishedAt, largePhoto, introText } = pageContext
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
          <button className="bg-blue-1 text-white uppercase p-2 text-sm">
            Jump to recipe
          </button>
          <button className="bg-blue-1 text-white flex items-center uppercase p-2 text-sm">
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
      </main>
      <Footer />
    </>
  )
}

export default RecipePage
