import styled from "styled-components";
import {Link} from "react-router-dom";

const StyledTextLink = styled(Link)`
  font-weight: 700;
  font-size: 1.5rem;
  color: ${({theme: {colors}}) => colors.green};
  text-decoration: underline;

  &:hover {
    color: ${({theme: {colors}}) => colors.red};
  }
`

export default StyledTextLink