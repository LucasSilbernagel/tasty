exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: '@babel/plugin-transform-react-jsx',
    options: {
      runtime: 'automatic',
    },
  })
}

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allStrapiRecipe {
        nodes {
          author {
            bio
            jobTitle
            name
            photo {
              alternativeText
              url
            }
          }
          id
          directions {
            data {
              directions
            }
          }
          ingredients {
            data {
              ingredients
            }
          }
          introText {
            data {
              introText
            }
          }
          largePhoto {
            alternativeText
            url
          }
          name
          prepTime
          publishedAt
          recipeSlug
          smallPhoto {
            alternativeText
            url
          }
          tagline
          totalTime
          yields
        }
      }
    }
  `)
  data.allStrapiRecipe.nodes.forEach((node) => {
    const slug = node.recipeSlug
    actions.createPage({
      path: `/recipes/${slug}`,
      component: require.resolve(`./src/pages/recipes/recipe.tsx`),
      context: node,
    })
  })
}
