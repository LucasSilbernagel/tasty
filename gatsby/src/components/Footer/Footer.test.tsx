import { render, screen } from '@testing-library/react'
import Footer from './Footer'
import * as Gatsby from 'gatsby'

const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery')
useStaticQuery.mockImplementation(() => ({
  strapiTastyLogoWhite: {
    tastyLogoWhite: {
      alternativeText: 'Test alternative text',
      localFile: {
        childImageSharp: {
          gatsbyImageData: {
            backgroundColor: '#080808',
            height: 48,
            images: {
              fallback: {
                src: '/static/0e43753957fe70cae17ec53771420440/e9ed8/tasty_logo_white_05c0c01462.png',
                srcSet:
                  '/static/0e43753957fe70cae17ec53771420440/e9ed8/tasty_logo_white_05c0c01462.png',
                sizes: '(min-width: 110px) 110px, 100vw',
              },
              sources: [
                {
                  sizes: '(min-width: 110px) 110px, 100vw',
                  srcSet:
                    '/static/0e43753957fe70cae17ec53771420440/e9ed8/tasty_logo_white_05c0c01462.png',
                  type: 'image/webp',
                },
              ],
              layout: 'constrained',
              width: 110,
            },
          },
        },
      },
    },
  },
}))

describe('Footer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('renders correctly', () => {
    render(<Footer />)
    expect(screen.getByTestId('footer')).toBeInTheDocument()
    expect(screen.getByTestId('home-link')).toBeInTheDocument()
    expect(screen.getByTestId('home-link')).toHaveAttribute('href', '/')
    expect(screen.getByAltText('Test alternative text')).toBeInTheDocument()
    expect(screen.getByTestId('twitter-link')).toBeInTheDocument()
    expect(screen.getByTestId('twitter-link')).toHaveAttribute('href', '#')
    expect(screen.getByTestId('youtube-link')).toBeInTheDocument()
    expect(screen.getByTestId('youtube-link')).toHaveAttribute('href', '#')
    expect(screen.getByTestId('facebook-link')).toBeInTheDocument()
    expect(screen.getByTestId('facebook-link')).toHaveAttribute('href', '#')
    expect(screen.getByTestId('instagram-link')).toBeInTheDocument()
    expect(screen.getByTestId('instagram-link')).toHaveAttribute('href', '#')
    expect(screen.getByTestId('pinterest-link')).toBeInTheDocument()
    expect(screen.getByTestId('pinterest-link')).toHaveAttribute('href', '#')
    expect(screen.getByTestId('subscribe-button')).toBeInTheDocument()
    expect(screen.getByTestId('about-us-link')).toBeInTheDocument()
    expect(screen.getByTestId('about-us-link')).toHaveAttribute(
      'href',
      '/about-us'
    )
    expect(screen.getByText('Inspired by')).toBeInTheDocument()
    expect(screen.getByTestId('delish-link')).toBeInTheDocument()
    expect(screen.getByTestId('delish-link')).toHaveAttribute(
      'href',
      'https://www.delish.com/'
    )
    expect(screen.getByText('Built by')).toBeInTheDocument()
    expect(screen.getByTestId('portfolio-link')).toBeInTheDocument()
    expect(screen.getByTestId('portfolio-link')).toHaveAttribute(
      'href',
      'https://lucassilbernagel.com/'
    )
  })
})
