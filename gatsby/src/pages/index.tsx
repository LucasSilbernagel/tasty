import type { HeadFC } from 'gatsby'

export const Head: HeadFC = () => <title>Tasty Recipes</title>

const IndexPage = () => {
  return (
    <div>
      <h1>Tasty recipes</h1>
    </div>
  )
}

export default IndexPage
