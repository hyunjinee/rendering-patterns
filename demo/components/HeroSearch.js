import Image from "next/image"
import styled from "styled-components"
import backgroundImg from "../public/background.png"
import search from "../public/search.svg"
import search2 from "../public/search2.svg"

export default function HeroSerach() {
  return (
    <Wrapper>
      <Container>
        <Image src={backgroundImg} layout="fill" />
      </Container>

      <InputContainer>
        <Input placeholder="주소, 도시, 학교등을 검색하세요" />
        {/* <img src="../public/search.svg" /> */}
        {/* <Image src={search} width="40" /> */}
        <Image src={search2} width="34" />
      </InputContainer>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  position: relative;
`
const Container = styled.div`
  margin-top: 3rem;
  width: 100vw;
  height: 400px;
  position: relative;
  img {
    object-fit: cover;
  }
`
const InputContainer = styled.div`
  display: flex;
  width: 50rem;
  position: absolute;
  left: 50%;
  margin-top: -2rem;
  transform: translateX(-50%);
  background-color: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding-right: 2rem;
`
const Input = styled.input`
  flex: 1;
  padding: 2rem;
  border: none;
  outline: none;
  font-size: 2rem;
`
