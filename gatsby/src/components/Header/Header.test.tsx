import { render, screen } from '@testing-library/react'
import Header from './Header'
import * as Gatsby from 'gatsby'
import { Layout } from 'gatsby-plugin-image'

const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery')
useStaticQuery.mockImplementation(() => ({
  strapiTastyLogo: {
    tastyLogo: {
      alternativeText: 'Test alternative text',
      localFile: {
        childImageSharp: {
          gatsbyImageData: {
            backgroundColor: '#080808',
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
              layout: 'constrained' as Layout,
              width: 110,
            },
          },
        },
      },
    },
  },
}))

const mockImage = {
  altText: 'delish-2021-whiskeyginger-large.jpeg',
  url: '/uploads/delish_2021_whiskeyginger_large_dd5aa98d95.jpeg',
  localFile: {
    childImageSharp: {
      gatsbyImageData: {
        layout: 'constrained' as Layout,
        backgroundColor: '#f8f8f8',
        width: 1200,
        height: 800,
        images: {
          fallback: {
            src: '/static/1a5de5b8e0b2fdb8f4a162dd474c2c02/8dbcc/delish_2021_whiskeyginger_large_dd5aa98d95.jpg',
            srcSet:
              '/static/1a5de5b8e0b2fdb8f4a162dd474c2c02/8dbcc/delish_2021_whiskeyginger_large_dd5aa98d95.jpg',
          },
          sources: [
            {
              srcSet:
                '/static/1a5de5b8e0b2fdb8f4a162dd474c2c02/8dbcc/delish_2021_whiskeyginger_large_dd5aa98d95.jpg',
              sizes: '(min-width: 1200px) 1200px, 100vw',
              type: 'image/webp',
            },
          ],
        },
      },
    },
  },
}

const mockRandomRecipe = {
  name: 'Whiskey Ginger',
  recipeSlug: 'whiskey-ginger',
  tagline: 'The Iconic whiskey cocktail',
  id: '1',
  largePhoto: mockImage,
  smallPhoto: mockImage,
}

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('renders without a random recipe', () => {
    render(<Header />)
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.queryByTestId('random-recipe-image')).toBeNull()
    expect(screen.getByTestId('navbar')).toBeInTheDocument()
  })

  test('renders with a random recipe', () => {
    render(<Header randomRecipe={mockRandomRecipe} />)
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.queryByTestId('random-recipe-image')).toBeInTheDocument()
    expect(screen.getByTestId('home-link')).toBeInTheDocument()
    expect(screen.getByTestId('home-link')).toHaveAttribute('href', '/')
    expect(screen.queryByText(mockRandomRecipe.tagline)).toBeInTheDocument()
    expect(screen.getByTestId('random-recipe-link')).toBeInTheDocument()
    expect(screen.getByTestId('random-recipe-link')).toHaveAttribute(
      'href',
      `/recipes/${mockRandomRecipe.recipeSlug}`
    )
    expect(screen.queryByText(mockRandomRecipe.name)).toBeInTheDocument()
    expect(screen.getByTestId('navbar')).toBeInTheDocument()
  })
})
