import { ReactNode } from 'react'
import Seo from './Seo'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import { IRecipe } from '../types'

interface ILayoutProps {
  pageTitle: string
  pageRoute: string
  children: ReactNode
  pageDescription?: string
  pageImage?: string
  randomRecipe?: IRecipe | null
}

const Layout = (props: ILayoutProps) => {
  const {
    pageTitle,
    pageDescription,
    pageImage,
    pageRoute,
    children,
    randomRecipe,
  } = props

  return (
    <>
      <Seo
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        pageImage={pageImage}
        pageRoute={pageRoute}
      />
      <Header randomRecipe={randomRecipe} />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Layout
