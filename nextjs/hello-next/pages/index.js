import Link from 'next/link'
import Layout from '../components/MyLayout'

const PostLink = props => (
  <li>
    <Link href={`/post?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
)

export default function Index() {
  return (
    <Layout>
      {/* <p>Hello Next.js</p> */}
      <h1>Little Blog</h1>
      <ul>
        <PostLink title="Hello Next.js" />
        <PostLink title="Learn Next.js is awesome" />
        <PostLink title="Deploy apps with Zeit" />
      </ul>
    </Layout>
  )
}


// import Header from '../components/Header'

// const Index = () => (
//   <div>
//     <Header />
//     <p>Hello Next.js</p>
//   </div>
// )

// export default Index;