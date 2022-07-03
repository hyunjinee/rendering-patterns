import styled from "styled-components"
import { Container } from "./Card"

export default function SkeletonCard() {
  return (
    <Container>
      <SkeletonImageContainer />
      <SkeletonTitle />
      <SkeletonPrice />
    </Container>
  )
}

const SkeletonItem = styled.div`
  width: 100%;
  height: 30px;
  background-color: #f2f2f2;
  position: relative;
  overflow: hidden;
  border-radius: 4px;

  @keyframes skeleton-gradient {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: skeleton-gradient 1.5s infinite ease-in-out;
  }
`

const SkeletonImageContainer = styled(SkeletonItem)`
  position: relative;
  height: 18rem;
  width: 100%;
  img {
    object-fit: cover;
  }
  margin-bottom: 2rem;
`
const SkeletonTitle = styled(SkeletonItem)`
  padding-left: 2rem;
  font-size: 1.6rem;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: bold;
  margin-left: 1rem;
  width: 10rem;
  margin-top: -1rem;
`
const SkeletonPrice = styled(SkeletonItem)`
  width: 5rem;
  margin-top: 1rem;
  width: 17rem;
  margin-left: 1rem;
  margin-bottom: 1rem;
`
