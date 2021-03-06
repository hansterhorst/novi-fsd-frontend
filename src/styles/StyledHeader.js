import styled from "styled-components";


const StyledHeader = styled.div`
  background: url(${({bgImage}) => bgImage}) no-repeat center;
  background-size: cover;
  width: 100%;
  aspect-ratio: 16/9;
  height: calc(100vw /16 * 9); // fallback safari browser
  display: block;
`

export default StyledHeader