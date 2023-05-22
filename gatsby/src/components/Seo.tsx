import { Helmet } from 'react-helmet'

interface ISeoProps {
  pageTitle: string
  pageRoute: string
  pageDescription?: string
  pageImage?: string
}

const Seo = ({
  pageTitle,
  pageRoute,
  pageDescription = `For home cooks who are hungry for something good: Find thousands of tested recipes, menus, cooking shortcuts, dinner ideas, family meals, and more at Tasty.`,
  pageImage = '/defaultSeoImage.png',
}: ISeoProps) => {
  const getPageTitle = () => `Tasty | ${pageTitle}`
  const getPageRoute = () =>
    `https://symphonious-croquembouche-c45916.netlify.app${pageRoute}`

  return (
    <Helmet>
      <title key="title">{getPageTitle()}</title>
      {/* Primary Meta Tags */}
      <meta name="title" content={getPageTitle()} />
      <meta name="description" content={pageDescription} />
      <meta name="image" content={pageImage} />
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={getPageRoute()} />
      <meta property="og:title" content={getPageTitle()} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Tasty" />
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={getPageRoute()} />
      <meta property="twitter:title" content={getPageTitle()} />
      <meta property="twitter:description" content={pageDescription} />
      <meta property="twitter:image" content={pageImage} />
    </Helmet>
  )
}

export default Seo
