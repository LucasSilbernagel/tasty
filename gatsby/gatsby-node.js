exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: '@babel/plugin-transform-react-jsx',
    options: {
      runtime: 'automatic',
    },
  })
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    devtool: 'eval-source-map',
  })
}

exports.onCreateDevServer = ({ app }) => {
  app.get('/admin', (_, res) => {
    res.redirect('https://strapi-production-ff80.up.railway.app/admin')
  })
}

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allStrapiRecipe {
        nodes {
          author {
            name
            authorSlug
            jobTitle
            bio
            photo {
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
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
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          name
          prepTime
          publishedAt
          recipeSlug
          smallPhoto {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          totalTime
          yields
        }
      }
      allStrapiAuthor {
        nodes {
          bio
          jobTitle
          name
          authorSlug
          photo {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          recipes {
            name
            recipeSlug
            tagline
            id
            largePhoto {
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
          }
        }
      }
    }
  `)

  data.allStrapiRecipe.nodes.forEach((node) => {
    const slug = node.recipeSlug
    actions.createPage({
      path: `/recipes/${slug}`,
      component: require.resolve(`./src/templates/RecipePage/RecipePage.tsx`),
      context: node,
    })
  })
  data.allStrapiAuthor.nodes.forEach((node) => {
    const slug = node.authorSlug
    actions.createPage({
      path: `/authors/${slug}`,
      component: require.resolve(`./src/templates/AuthorPage/AuthorPage.tsx`),
      context: node,
    })
  })
}
