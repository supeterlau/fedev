import Layout from '../../components/layout'
import Date from '../../components/date'
import { getAllPostIds, getPostDta } from '../../lib/posts'
import Head from 'next/head'

export default function Post({ postData }) {
  return <Layout>
    <Head>
      <title>{postData.title}</title>
    </Head>
    {postData.title}
    <br />
    {postData.id}
    <br />
    {/* {postData.date} */}
    <Date dateString={postData.date} />
    <br />
    {/* render contentHtml using dangerouslySetInnerHTML */}
    <div dangerouslySetInnerHTML={{ __html: postData.contentHTML}} />
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
  const postData = await getPostDta(params.id)
  return {
    props: {
      postData
    }
  }
}

