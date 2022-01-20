import React, {useContext} from "react";
import profileImageMask from "../assets/svg/profileImageMask.svg";
import styled from "styled-components";
import {AuthContext} from "../context/auth/AuthContext";
import {PUBLIC_BASE_URL} from "../utils/constants";


export default function ProfileImage({squareSize = 100}) {

   const {authUser} = useContext(AuthContext)

   console.log(authUser);

   //   check user profile image link
   let image
   if (authUser.profileImage.includes("https")){
      image = authUser.profileImage
   } else {
      image = `${PUBLIC_BASE_URL}/user/${authUser.id}/profile-image/download`
   }


   return (
      <StyledProfileImage mask={profileImageMask} squareSize={squareSize}>
         <div className="mask">
            <img src={image} alt="profile"/>
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