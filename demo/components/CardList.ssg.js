import styled from "styled-components"
import Card from "./Card"

export default function CardList({ data }) {
  return (
    <GridContainer>
      {data.map((building) => (
        <Card
          title={building.title}
          src={building.src}
          price={building.price}
        />
      ))}
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
