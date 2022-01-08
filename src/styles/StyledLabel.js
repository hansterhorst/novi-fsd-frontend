import styled from "styled-components";

const StyledLabel = styled.label`
  font-size: 1.6rem;
  font-weight: 500;
  display: block;
  color: ${({theme: {colors}}) => colors.green};
  width: 100%;
`

export default StyledLabel