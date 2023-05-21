import defaultSeoImage from '../images/defaultSeoImage.png'

interface ISeoProps {
  pageTitle: string
  pageDescription: string
  pageImage: string
  pageRoute: string
}

const Seo = ({
  pageTitle,
  pageDescription,
  pageImage = defaultSeoImage,
  pageRoute,
}: ISeoProps) => {
  const getPageTitle = () => `Tasty | ${pageTitle}`
  const getPageRoute = () =>
    `https://symphonious-croquembouche-c45916.netlify.app${pageRoute}`

  return (
    <>
      <title>{getPageTitle()}</title>
      <meta name="description" content={pageDescription} />
      <meta name="image" content={pageImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={getPageTitle()} />
      <meta name="twitter:url" content={getPageRoute()} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
      <meta property="og:url" content={getPageRoute()} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={getPageTitle()} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
    </>
  )
}

export default Seo
