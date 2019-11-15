import Layout from '../components/MyLayout'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const Index = props => (
  <Layout>
    <h1>Batman TV shows</h1>
    <ul>
      {props.shows.map(show => (
        <li key={show.id}>
          <Link href="/p/batman/[id]" as={`/p/batman/${show.id}`}>
            <a>{show.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </Layout>
)

Index.getInitialProps = async function () {
  const apiURL = 'https://api.tvmaze.com/search/shows?q=batman'
  const res = await fetch(apiURL)
  const data = await res.json()

  // server side : 数据获取在服务端完成
  console.log(`Show data fetched. Count: ${data.length}`)

  return {
    shows: data.map(entry => entry.show)
  }
}

export default Index