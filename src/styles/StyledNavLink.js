import styled from "styled-components";
import {NavLink} from "react-router-dom";

const StyledNavLink = styled(NavLink)`
  font-size: 1.6rem;
  line-height: 1;
  padding: 10px 16px 8px;
  border: 3px solid transparent;
  color: ${({theme: {colors}}) => colors.white};
  background-color: ${({theme}) => theme.colors.green};
  text-transform: uppercase;
  font-weight: 700;
  display: flex;
  align-items: center;
  
  span {
    margin-right: 1rem;
  }

  &[aria-current=page] {
    background: ${({theme}) => theme.colors.red};
  }

  &:hover {
    border: 3px solid ${({theme: {colors}}) => colors.red};
  }
`

export default StyledNavLink