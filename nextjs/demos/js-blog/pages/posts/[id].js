import Layout from '../../components/layout'
import { getAllPostIds, getPostDta } from '../../lib/posts'

export default function Post({ postData }) {
  return <Layout>
    {postData.title}
    <br />
    {postData.id}
    <br />
    {postData.date}
  </Layout>
}

export const getStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths, // id array
    fallback: false
  }
}

export const getStaticProps = async ( {params} ) => {
  const postData = getPostDta(params.id)
  return {
    props: {
      postData
    }
  }
}

