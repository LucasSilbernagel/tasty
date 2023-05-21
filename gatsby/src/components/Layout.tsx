import { ReactNode } from 'react'
import Seo from './Seo'
import Header from './Header/Header'
import Footer from './Footer/Footer'

interface ILayoutProps {
  pageTitle: string
  pageDescription: string
  pageImage: string
  pageRoute: string
  children: ReactNode
}

const Layout = (props: ILayoutProps) => {
  const { pageTitle, pageDescription, pageImage, pageRoute, children } = props

  return (
    <>
      <Header />
      <Seo
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        pageImage={pageImage}
        pageRoute={pageRoute}
      />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
