import styled from "styled-components"
import Image from "next/image"
import bclguide from "../public/bclguide.png"

export default function TopNav() {
  return (
    <Container>
      <ImageContainer>
        <Image src={bclguide} width={265} height={47} />
      </ImageContainer>

      <RightWrapper>
        <A>About</A>
        <B>Contact</B>
        <C>Sign In</C>
      </RightWrapper>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  height: 5rem;
`
const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-left: 3rem;
  margin-top: 3rem;
`

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 3rem;
  margin-right: 3rem;

  div {
    font-size: 2rem;
  }
`

const A = styled.div`
  margin-right: 3rem;
`
const B = styled.div`
  margin-right: 3rem;
`
const C = styled.div`
  width: 10rem;
  padding: 1rem 0;
  border-radius: 0.4rem;
  background-color: #0c8fef;
  text-align: center;
  color: white;
`
