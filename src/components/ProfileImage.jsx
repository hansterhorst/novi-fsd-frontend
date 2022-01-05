import React from "react";
import profileImageMask from "../assets/svg/profileImageMask.svg";
import bgImage from "../assets/images/lage-mountains.png";
import styled from "styled-components";

export default function ProfileImage() {

   return (
      <StyledProfileImage mask={profileImageMask}>
         <div className="mask">
            <img src={bgImage} alt="profile"/>
         </div>
      </StyledProfileImage>
   )
}


const StyledProfileImage = styled.div`
  background-color: ${({theme: {colors}}) => colors.red};

  display: flex;
  align-items: center;
  justify-content: center;

  mask: url(${({mask}) => mask});
  mask-repeat: no-repeat;
  mask-size: cover;
  width: 100%;
  height: 100%;

  .mask {
    mask: url(${({mask}) => mask});
    mask-size: cover;
    mask-position: center;
    mask-repeat: no-repeat;
    width: 90%;
    height: 90%;

    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }

`