import React, {useContext} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/auth/AuthContext";

export default function TravelstoryCard({travelstory, maxWidth}) {

   const {isAuth} = useContext(AuthContext)

   const {title, country, author, imageUrl, article, id} = travelstory

   return (
      <StyledTravelstoryCard bgImage={imageUrl} maxWidth={maxWidth}>
         {/* route validation for public users */}
         <Link to={isAuth ? `/users/travelstory/${id}` : `/public/travelstory/${id}`}>
            <div className="header">
               <h3>{country}</h3>
               <h2>{title}</h2>
               <h4>by {author}</h4>
            </div>
            <div className="content">
               <p>{article}</p>
            </div>
         </Link>
      </StyledTravelstoryCard>
   )
}


const StyledTravelstoryCard = styled.div`
  background: rgba(0, 0, 0, 0.4) url(${({bgImage}) => bgImage}) no-repeat center;
  background-blend-mode: multiply;
  background-size: cover;
  height: calc((${({maxWidth}) => maxWidth + "px"} / 2) / 4 * 3);
  position: relative;
  margin: 0.5rem;
  text-align: center;

  &:hover {
    .header {
      opacity: 0;
    }

    .content {
      opacity: 1;
    }
  }

  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 1rem;
    transition: opacity 0.3s ease-in-out;
    opacity: 1;
  }

  .content {
    position: absolute;
    top: 0;
    display: flex;
    align-items: flex-end;
    height: 100%;
    padding: 1rem;
    transition: opacity 0.3s ease-in-out;
    opacity: 0;

    p {
      color: ${({theme: {colors}}) => colors.white};
      font-size: 1.6rem;
      text-align: center;
      display: -webkit-box;

      // show the first ... lines of text
      -webkit-line-clamp: 6;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`
