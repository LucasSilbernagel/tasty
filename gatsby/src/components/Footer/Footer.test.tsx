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
    // expect(screen.getByTestId('home-link')).toHaveAttribute('src', '/')
    // expect(screen.getByText('Architecture')).toBeInTheDocument()
    // expect(screen.getByText('Privacy Policy')).toBeInTheDocument()
    // expect(screen.getByText('Terms of Service')).toBeInTheDocument()
    console.log(screen.debug())
  })
})
