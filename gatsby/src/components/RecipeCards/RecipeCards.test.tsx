import { render, screen } from '@testing-library/react'
import RecipeCards from './RecipeCards'
import * as Gatsby from 'gatsby'

const mockRecipes = [
  {
    id: '3b831af9-a2b0-5b35-a7ac-044c599b751e',
    name: 'Lemon Cranberry Cheesecake Bars',
    recipeSlug: 'lemon-cranberry-cheescake-bars',
    smallPhoto: {
      alternativeText: 'lemon cranberry cheesecake bars',
      url: '/uploads/home_hero_sm_f31a80608f.jpeg',
      localFile: {
        childImageSharp: {
          gatsbyImageData: {
            backgroundColor: '#883808',
            height: 717,
            layout: 'constrained',
            width: 480,
            images: {
              fallback: {
                src: '/static/7df5c754138aeee47449a373fae6da66/fa956/home_hero_sm_f31a80608f.jpg',
                srcSet:
                  '/static/7df5c754138aeee47449a373fae6da66/fa956/home_hero_sm_f31a80608f.jpg',
              },
              sources: [
                {
                  srcSet:
                    '/static/7df5c754138aeee47449a373fae6da66/fa956/home_hero_sm_f31a80608f.jpg',
                  sizes: '(min-width: 480px) 480px, 100vw',
                  type: 'image/webp',
                },
              ],
            },
          },
        },
      },
    },
  },
  {
    id: 'eaec55f1-94b5-5f97-8185-2929fc586907',
    name: 'Air Fryer Beef & Broccoli',
    recipeSlug: 'air-fryer-beef-and-broccoli',
    smallPhoto: {
      alternativeText: 'air-fryer-beef-and-broccoli1-small.jpeg',
      url: '/uploads/air_fryer_beef_and_broccoli1_small_7dd6cf3be3.jpeg',
      localFile: {
        childImageSharp: {
          gatsbyImageData: {
            backgroundColor: '#883808',
            height: 717,
            layout: 'constrained',
            width: 480,
            images: {
              fallback: {
                src: '/static/7df5c754138aeee47449a373fae6da66/air_fryer_beef_and_broccoli1_small_7dd6cf3be3.jpeg',
                srcSet:
                  '/static/7df5c754138aeee47449a373fae6da66/air_fryer_beef_and_broccoli1_small_7dd6cf3be3.jpeg',
              },
              sources: [
                {
                  srcSet:
                    '/static/7df5c754138aeee47449a373fae6da66/air_fryer_beef_and_broccoli1_small_7dd6cf3be3.jpeg',
                  sizes: '(min-width: 480px) 480px, 100vw',
                  type: 'image/webp',
                },
              ],
            },
          },
        },
      },
    },
  },
]

const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery')
useStaticQuery.mockImplementation(() => ({
  allStrapiRecipe: {
    nodes: mockRecipes,
  },
}))

describe('RecipeCards', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('renders correctly', () => {
    render(<RecipeCards title="Section Title" />)
    expect(screen.getByText('Section Title')).toBeInTheDocument()
    expect(screen.queryByTestId('subtitle')).toBeNull()
    expect(screen.getAllByTestId('recipe').length).toEqual(mockRecipes.length)
    expect(screen.getByTestId('recipe-grid')).toBeInTheDocument()
    mockRecipes.forEach((recipe) => {
      expect(
        screen.getByTestId(`recipe-link-${recipe.recipeSlug}`)
      ).toBeInTheDocument()
      expect(
        screen.getByTestId(`recipe-link-${recipe.recipeSlug}`)
      ).toHaveAttribute('href', `/recipes/${recipe.recipeSlug}`)
      expect(screen.getByAltText(recipe.name)).toBeInTheDocument()
    })
  })

  test('renders with subtitle', () => {
    render(<RecipeCards title="Section Title" subtitle="Section Subtitle" />)
    expect(screen.getByText('Section Title')).toBeInTheDocument()
    expect(screen.queryByTestId('subtitle')).toBeInTheDocument()
    expect(screen.getByText('Section Subtitle')).toBeInTheDocument()
    expect(screen.getAllByTestId('recipe').length).toEqual(mockRecipes.length)
    expect(screen.getByTestId('recipe-grid')).toBeInTheDocument()
    mockRecipes.forEach((recipe) => {
      expect(
        screen.getByTestId(`recipe-link-${recipe.recipeSlug}`)
      ).toBeInTheDocument()
      expect(
        screen.getByTestId(`recipe-link-${recipe.recipeSlug}`)
      ).toHaveAttribute('href', `/recipes/${recipe.recipeSlug}`)
      expect(screen.getByAltText(recipe.name)).toBeInTheDocument()
    })
  })

  test('renders with a limited number of recipes', () => {
    render(<RecipeCards title="Section Title" numCards={1} />)
    expect(screen.getByText('Section Title')).toBeInTheDocument()
    expect(screen.queryByTestId('subtitle')).toBeNull()
    expect(screen.getAllByTestId('recipe').length).toEqual(
      mockRecipes.length - 1
    )
    expect(screen.getByTestId('recipe-grid')).toBeInTheDocument()
    expect(
      screen.getByTestId(`recipe-link-${mockRecipes[0].recipeSlug}`)
    ).toBeInTheDocument()
    expect(
      screen.getByTestId(`recipe-link-${mockRecipes[0].recipeSlug}`)
    ).toHaveAttribute('href', `/recipes/${mockRecipes[0].recipeSlug}`)
    expect(screen.getByAltText(mockRecipes[0].name)).toBeInTheDocument()
  })

  test('renders on the individual recipe page of one of the recipes', () => {
    render(
      <RecipeCards
        title="Section Title"
        currentRecipeSlug={mockRecipes[1].recipeSlug}
      />
    )
    expect(screen.getByText('Section Title')).toBeInTheDocument()
    expect(screen.queryByTestId('subtitle')).toBeNull()
    expect(screen.getAllByTestId('recipe').length).toEqual(
      mockRecipes.length - 1
    )
    expect(screen.getByTestId('recipe-grid')).toBeInTheDocument()
    expect(
      screen.getByTestId(`recipe-link-${mockRecipes[0].recipeSlug}`)
    ).toBeInTheDocument()
    expect(
      screen.getByTestId(`recipe-link-${mockRecipes[0].recipeSlug}`)
    ).toHaveAttribute('href', `/recipes/${mockRecipes[0].recipeSlug}`)
    expect(screen.getByAltText(mockRecipes[0].name)).toBeInTheDocument()
  })
})
