import React from 'react'

type Props = {
  blogCategory?: string
}

const IndexPage = (props: Props) => (
  <div>
    My Blog: AwesomeFE.dev
    <p>About {props.blogCategory}</p>
  </div>
)

IndexPage.getInitialProps = () => {
  return {
    blogCategory: 'Books'
  }
}
export default IndexPage