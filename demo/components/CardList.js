import { useQuery } from "react-query"
import styled from "styled-components"

import Card from "./Card"
import SkeletonCard from "./SkeletonCard"
import building1 from "../public/building1.png"
import building2 from "../public/building2.png"
import building3 from "../public/building3.png"

export default function CardList() {
  const { data: buildings, isLoading } = useQuery("buildings", async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return fetch("/buildings.json").then((res) => res.json())
  })

  if (isLoading) {
    return (
      <GridContainer>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </GridContainer>
    )
  }

  return (
    <GridContainer>
      <Card title="현진빌라" src={building1} price={buildings[0].price} />
      <Card title="소마빌라" src={building2} price={buildings[1].price} />
      <Card title="방슐랭빌라" src={building3} price={buildings[2].price} />
    </GridContainer>
  )
}

const GridContainer = styled.div`
  position: relative;
  display: grid;
  grid-row-gap: 3.5rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  width: 100%;
  margin: 0 auto;

  margin-top: 8rem;
`
