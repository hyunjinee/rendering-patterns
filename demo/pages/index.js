import CardList from "../components/CardList"
import HeroSerach from "../components/HeroSearch"
import TopNav from "../components/TopNav"

export default function Home({ data = [] }) {
  return (
    <div>
      <TopNav />
      <HeroSerach />
      <CardList />
    </div>
  )
}

// export async function getServerSideProps() {
//   // const res = await fetch("https://jsonplaceholder.typicode.com/todos/1")
//   const res = await fetch("https://my.cms.com/listings?limit=3")
//   const data = await res.json()

//   console.log(res)
//   console.log(data)
//   return {
//     props: { data },
//   }
// }
