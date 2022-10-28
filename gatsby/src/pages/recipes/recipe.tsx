/* eslint-disable @typescript-eslint/no-explicit-any */
import { HeadFC } from 'gatsby'

export const Head: HeadFC = ({ pageContext }: any) => {
  const { name } = pageContext
  return <title>Tasty | {name}</title>
}

const RecipePage = ({ pageContext }: any) => {
  const { name } = pageContext
  return (
    <main>
      <h2>{name}</h2>
    </main>
  )
}

export default RecipePage
