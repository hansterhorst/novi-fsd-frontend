import React from "react";
import profileImageMask from "../assets/svg/profileImageMask.svg";
import styled from "styled-components";

export default function ProfileImage({profileImage, squareSize = 100}) {

   return (
      <StyledProfileImage mask={profileImageMask} squareSize={squareSize}>
         <div className="mask">
            <img src={profileImage} alt="profile"/>
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
  width: ${({squareSize}) => `${squareSize}px`};
  height: ${({squareSize}) => `${squareSize}px`};

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