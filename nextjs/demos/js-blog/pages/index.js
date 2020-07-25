import Head from 'next/head'
import Link from 'next/link'
import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'

export default function Home({ allPostsData }) {
  console.log(allPostsData)
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Intro]</p>
        <p>
          Example
        </p>
        <p>
          <a href="https:/nextjs.org/learn">Next.js Tutorial</a>
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>{allPostsData.map(
          ({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
            {/* list blog  */}
            <Link href="/posts/[id]" as={`/posts/${id}`}>
              <a>{title}</a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
              {/* {title}
              <br />
              {id}
              <br />
              {date} */}
            </li>
            
          ))}</ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  // props will be passed to Home component
  return {
    props: {
      allPostsData
    }
  }
}
