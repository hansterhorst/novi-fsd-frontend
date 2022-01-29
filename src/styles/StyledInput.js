import styled from "styled-components";

const StyledInput = styled.input`
  padding: 0.8rem 1.6rem;
  font-family: "Merriweather", serif;
  font-size: 1.8rem;
  color: ${({theme: {colors}}) => colors.black};
  border: 3px solid ${({theme: {colors}}) => colors.darkGreen};
  width: 100%;
  background-color: ${({theme: {colors}}) => colors.white};
  margin-bottom: 1.5rem;
`

export default StyledInput