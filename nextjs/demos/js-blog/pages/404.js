import Layout from "../components/layout";
import Head from 'next/head';

export default function Custom404() {
  return <Layout>
    <Head>
      <title>Not Found</title>
    </Head>
    <h1>404 - Simple 404 Page</h1>
  </Layout>
}