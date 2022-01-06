import styled from "styled-components";
import {Link} from "react-router-dom";

const StyledLink = styled(Link)`
  font-size: 1.6rem;
  font-weight: bold;
  color: ${({theme: {colors}}) => colors.white};
  text-transform: uppercase;
  padding: 0.8rem 1.6rem;
  background-color: ${({theme: {colors}}) => colors.red};
  border: 3px solid ${({theme: {colors}}) => colors.red};
  line-height: 1;
  display: flex;
  align-items: center;
  column-gap: 1rem;
  
  
  &:hover{
    color: ${({theme: {colors}}) => colors.red};
    background-color: ${({theme: {colors}}) => colors.white};
    border: 3px solid ${({theme: {colors}}) => colors.red};
  }
`

export default StyledLink