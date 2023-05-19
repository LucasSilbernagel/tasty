import { render, screen } from '@testing-library/react'
import NavBar from './NavBar'
import { Layout } from 'gatsby-plugin-image'

const mockTastyLogo = {
  alternativeText: 'Test alternative text',
  localFile: {
    childImageSharp: {
      gatsbyImageData: {
        backgroundColor: '#080808',
        layout: 'constrained' as Layout,
        width: 110,
        height: 48,
        images: {
          fallback: {
            src: '/static/0e43753957fe70cae17ec53771420440/e9ed8/tasty_logo_05c0c01462.png',
            srcSet:
              '/static/0e43753957fe70cae17ec53771420440/e9ed8/tasty_logo_05c0c01462.png',
            sizes: '(min-width: 110px) 110px, 100vw',
          },
          sources: [
            {
              sizes: '(min-width: 110px) 110px, 100vw',
              srcSet:
                '/static/0e43753957fe70cae17ec53771420440/e9ed8/tasty_logo_05c0c01462.png',
              type: 'image/webp',
            },
          ],
        },
      },
    },
  },
}

describe('NavBar', () => {
  test('renders correctly', () => {
    render(<NavBar tastyLogo={mockTastyLogo} />)
    expect(screen.getByTestId('navbar')).toBeInTheDocument()
    expect(screen.getByTestId('menu-button')).toBeInTheDocument()
    expect(screen.getByTestId('home-link-nav-bar')).toBeInTheDocument()
    expect(screen.getByTestId('home-link-nav-bar')).toHaveAttribute('href', '/')
    expect(screen.getByAltText('Test alternative text')).toBeInTheDocument()
    expect(screen.getByTestId('all-recipes-link')).toBeInTheDocument()
    expect(screen.getByTestId('all-recipes-link')).toHaveAttribute(
      'href',
      '/all-recipes'
    )
    expect(screen.getByTestId('subscribe-button')).toBeInTheDocument()
    expect(screen.getByTestId('search-link')).toBeInTheDocument()
    expect(screen.getByTestId('search-link')).toHaveAttribute('href', '/search')
    expect(screen.getByText('Search')).toBeInTheDocument()
    expect(screen.getByTestId('close-menu-button')).toBeInTheDocument()
    expect(screen.getByTestId('subscribe-in-menu')).toBeInTheDocument()
    expect(screen.getAllByText('Subscribe')[1]).toBeInTheDocument()
    expect(screen.getByTestId('my-recipes-link')).toBeInTheDocument()
    expect(screen.getByTestId('my-recipes-link')).toHaveAttribute(
      'href',
      '/my-recipes'
    )
    expect(screen.getByText('My Recipes')).toBeInTheDocument()
    expect(screen.getByTestId('all-recipes-in-menu')).toBeInTheDocument()
    expect(screen.getByTestId('all-recipes-in-menu')).toHaveAttribute(
      'href',
      '/all-recipes'
    )
    expect(screen.getByText('All Recipes')).toBeInTheDocument()
    expect(screen.getByTestId('about-us-link')).toBeInTheDocument()
    expect(screen.getByTestId('about-us-link')).toHaveAttribute(
      'href',
      '/about-us'
    )
    expect(screen.getByText('About Us')).toBeInTheDocument()
  })
})
