import Link from 'next/link'
import Layout from '@components/Layout'

const AboutPage = () => (
  <Layout title="About | Next.js + TypeScript Example">
    <p>Roadmap</p>
    <hr/>
    <ul>
      <li>basic post layout</li>
      <li>support tag</li>
      <li>support markdown</li>
      <li>support mdx</li>
      <li>[page] author Portfolio</li>
      <li>analysis (google baidu)</li>
      <li>support comment</li>
    </ul>

    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
)

export default AboutPage
