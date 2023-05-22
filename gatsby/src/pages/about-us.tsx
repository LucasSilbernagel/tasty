import { graphql, HeadFC, Link, useStaticQuery } from 'gatsby'
import ReactMarkdown from 'react-markdown'
import '../styles/about-us.css'
import { IAuthor } from '../types'
import { GatsbyImage } from 'gatsby-plugin-image'
import Layout from '../components/Layout'
import removeMd from 'remove-markdown'

export const Head: HeadFC = () => <title>Tasty | About Us</title>

const AboutUsPage = () => {
  const data = useStaticQuery(query)
  const aboutPageData = data.strapiAboutPage
  const authorData = data.allStrapiAuthor

  return (
    <Layout
      pageTitle="About Us"
      pageDescription={`${removeMd(aboutPageData.description.data.description)
        .replace(/\\/g, '')
        .replace(/\n/g, '')
        .slice(0, 160)}...`}
      pageRoute="/about-us"
    >
      <h1 className="font-black text-4xl mb-4">About Us</h1>
      <div className="Video-Container">
        <video autoPlay controls loop muted width="100%" height="100%">
          <source src={aboutPageData.VideoHero.localFile.url} />
        </video>
      </div>
      <div className="mt-8">
        <ReactMarkdown className="text-left max-w-xl mx-auto text-lg tracking-wide">
          {aboutPageData.description.data.description}
        </ReactMarkdown>
      </div>
      <div className="mt-4">
        <h2 className="SectionHeader mb-8">Contributors</h2>
        <ul className="flex flex-col sm:flex-row items-center gap-4 flex-wrap">
          {authorData.nodes.map((author: IAuthor) => {
            return (
              <li
                key={author.id}
                className="p-2 duration-300 hover:shadow-xl focus:shadow-xl"
              >
                <Link to={`/authors/${author.authorSlug}`}>
                  <div className="w-[224px]">
                    <GatsbyImage
                      className="w-full h-full"
                      alt={author.name}
                      image={
                        author.photo.localFile.childImageSharp.gatsbyImageData
                      }
                    />
                  </div>
                  <h3 className="font-bold my-1 text-lg">{author.name}</h3>
                  <h4 className="capitalize">{author.jobTitle}</h4>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </Layout>
  )
}

export default AboutUsPage

const query = graphql`
  query {
    strapiAboutPage {
      description {
        data {
          description
        }
      }
      VideoHero {
        localFile {
          url
        }
      }
    }
    allStrapiAuthor {
      nodes {
        id
        authorSlug
        name
        jobTitle
        photo {
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
