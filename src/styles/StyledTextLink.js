import styled from "styled-components";
import {Link} from "react-router-dom";

const StyledTextLink = styled(Link)`
  font-weight: 700;
  color: ${({theme: {colors}}) => colors.darkGreen};
  text-decoration: underline;

  &:hover {
    color: ${({theme: {colors}}) => colors.red};
  }
`

export default StyledTextLink