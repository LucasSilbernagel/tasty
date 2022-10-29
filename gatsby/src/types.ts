interface IPhoto {
  url: string
}

export interface IRecipe {
  name: string
  largePhoto: IPhoto
  smallPhoto: IPhoto
  tagline: string
  recipeSlug: string
}
