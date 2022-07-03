import styled from "styled-components"
import Image from "next/image"

import building from "../public/building1.png"

export default function Card({ title, building, src, price }) {
  return (
    <Container>
      <ImageContainer>
        <Image src={src} layout="fill" />
      </ImageContainer>
      <Title>{title}</Title>
      <Price>{price}</Price>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  width: 80%;
  /* height: 80%; */
  border-radius: 1rem;
  overflow: hidden;
  margin: 0 auto;
`

const ImageContainer = styled.div`
  position: relative;
  height: 18rem;
  width: 100%;
  img {
    object-fit: cover;
  }
  margin-bottom: 2rem;
`

const Title = styled.div`
  /* color: #f06595;  */

  padding-left: 2rem;
  font-size: 1.6rem;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: bold;
`

const Price = styled.div`
  color: #f06595;
  font-size: 2rem;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: bold;
  padding-left: 2rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`
