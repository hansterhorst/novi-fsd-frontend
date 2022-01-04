import styled from "styled-components";

const StyledButton = styled.button`
  font-size: 1.6rem;
  font-weight: bold;
  color: ${({theme: {colors}}) => colors.white};
  text-transform: uppercase;
  padding: 1rem 1.6rem 0.8rem;
  background-color: ${({theme: {colors}}) => colors.red};
  border: 3px solid ${({theme: {colors}}) => colors.red};
  line-height: 1;
  
  &:hover{
    color: ${({theme: {colors}}) => colors.red};
    background-color: ${({theme: {colors}}) => colors.white};
    border: 3px solid ${({theme: {colors}}) => colors.red};
    
  }
`

export default StyledButton