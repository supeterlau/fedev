import { useRouter } from 'next/router'
import Layout from '../components/MyLayout'

const Page = () => {
  // useRouter a React Hook, and it works with functional components
  const router = useRouter()

  return (
    <Layout>
      <h1>{router.query.title}</h1>
      <p>Post Content</p>
    </Layout>
  )
}

export default Page