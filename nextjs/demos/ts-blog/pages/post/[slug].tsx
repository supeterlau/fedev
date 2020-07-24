// post template

import React from 'react'

type Props = {
  slug?: string
}
const PostTemplate = (props: Props) => (
  <div>
    load "{props.slug}"
  </div>
)

// PostTemplate.getInitialProps = async (context) => {
//   const { slug } = context.query 
//   return { slug }
// }
export default PostTemplate