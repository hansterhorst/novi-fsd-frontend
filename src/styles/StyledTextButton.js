import styled from "styled-components";

const StyledTextButton = styled.button`
  font-weight: 700;
  font-size: 1.5rem;
  color: ${({theme: {colors}}) => colors.white};
  text-decoration: underline;
  background-color: transparent;
  border: none;

  &:hover {
    color: ${({theme: {colors}}) => colors.red};
  }
`

export default StyledTextButton