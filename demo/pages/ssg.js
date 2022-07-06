import CardList from "../components/CardList.ssg"
import HeroSerach from "../components/HeroSearch"
import TopNav from "../components/TopNav"

export default function Home({ data }) {
  return (
    <div>
      <TopNav />
      <HeroSerach />
      <CardList data={data} />
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch("https://62c5840ba361f7251286da69.mockapi.io/api/ssg")
  const data = await res.json()

  return {
    props: { data },
  }
}
