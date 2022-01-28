import React, {useContext, useEffect, useState} from "react";
import TextArea from "./form-inputs/TextArea";
import StyledButton from "../styles/StyledButton";
import ProfileImage from "./ProfileImage";
import styled from "styled-components";
import {AuthContext} from "../context/auth/AuthContext";
import {useForm} from "react-hook-form";
import axios from "axios";
import dateToLocalString from "../utils/dateToLocalString";
import {USERS_BASE_URL} from "../utils/constants";
import awsGetProfileImage from "../utils/awsGetProfileImage";
import {AlertContext} from "../context/alert/AlertContext";
import Alert from "./layout/Alert";

export default function Commit({travelstoryId}) {

   const {isAuth, authUser} = useContext(AuthContext)
   const {setAlert} = useContext(AlertContext)

   const defaultValues = {comment: ""}
   const {register, handleSubmit, reset} = useForm({defaultValues})

   const [comments, setComments] = useState([])


   async function getComments() {

      const config = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
         }
      }

      try {

         const response = await axios.get(`${USERS_BASE_URL}/travelstories/${travelstoryId}/comments/`, config)

         setComments(response.data)

      } catch (error) {
         console.log(error.response)
      }
   }


   async function onSubmit(data) {

      const config = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
         }
      }

      try {
         const response = await axios.post(`${USERS_BASE_URL}/travelstories/${travelstoryId}/comments/user/${authUser.id}`, data, config)

         if (response.status === 201) {
            await getComments()
            reset(defaultValues)
         }

      } catch (error) {
         const message = error.response.data.message
         const status = error.response.data.status
         setAlert(message, status, true)
      }

   }

   useEffect(() => {
      getComments()
      // eslint-disable-next-line
   }, [])

   return (
      isAuth && <>
         <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <h3>Houd uw reactie beschaafd, constructief en inclusief, anders wordt uw
               reactie
               verwijderd.</h3>

            <Alert/>

            <TextArea labelTitle="Reactie" name="comment" register={register}
                      height={100} required={false}/>

            <div className="form-footer">
               <StyledButton type="onsubmit">Verstuur reactie</StyledButton>
            </div>
         </StyledForm>

         {comments && comments.map(({id, userId, fullname, createdAt, comment}) => (
            <StyledComments key={id}>

               <ProfileImage profileImage={awsGetProfileImage(userId)}/>

               <div className="comment">
                  <div className="comment-profile">
                     <h3>{fullname}</h3>
                     <h2>•</h2>
                     <p>{dateToLocalString(createdAt)}</p>
                  </div>

                  <p>{comment}</p>

               </div>
            </StyledComments>
         ))}
         <StyledComments>
            {comments.length === 0 && <p>Nog geen reacties geplaatst, wees de eerste.</p>}
         </StyledComments>
      </>
   )
}


const StyledForm = styled.form`
  padding: 5rem 0 5rem;

  h3 {
    color: ${({theme: {colors}}) => colors.red};
    font-weight: bold;
    margin: 2rem 0;
  }

  label {
    color: ${({theme: {colors}}) => colors.white};
  }

  .form-footer {
    display: flex;
    justify-content: flex-end;
    margin: 2rem 0 0;
  }
`

const StyledComments = styled.section`
  display: flex;
  align-items: flex-start;
  padding: 1rem 0;

  &:last-child {
    padding-bottom: 5rem;
  }

  .comment {
    padding: 0 1rem;
    width: 90%;

    p {
      font-size: 1.6rem;
    }

    .comment-profile {
      display: flex;
      align-items: center;
      gap: 1rem;

      h3 {
        color: ${({theme: {colors}}) => colors.red};
        font-weight: 900;
      }
    }
  }
`