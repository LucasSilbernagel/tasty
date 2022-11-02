import { IGatsbyImageData } from 'gatsby-plugin-image'

interface IPhoto {
  altText: string
  url: string
  localFile: { childImageSharp: { gatsbyImageData: IGatsbyImageData } }
}
export interface IRecipe {
  name: string
  largePhoto: IPhoto
  smallPhoto: IPhoto
  tagline: string
  recipeSlug: string
  id: string
}
