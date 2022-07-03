import styled from "styled-components"
import Card from "./Card"
import building1 from "../public/building1.png"
import building2 from "../public/building2.png"
import building3 from "../public/building3.png"

export default function CardList() {
  return (
    <GridContainer>
      <Card title="현진빌라" src={building1} price="100000000원" />
      <Card title="소마빌라" src={building2} price="2345000000원" />
      <Card title="방슐랭빌라" src={building3} price="92222900원" />
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
