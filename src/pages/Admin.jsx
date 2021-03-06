import React, {useContext, useEffect, useState} from "react";
import styled from "styled-components"
import Layout from "../components/layout/Layout";
import Container from "../components/Container";
import axios from "axios";
import InputField from "../components/form-inputs/InputField";
import {useForm} from "react-hook-form";
import StyledButton from "../styles/StyledButton";
import StyledLink from "../styles/StyledLink";
import whiteAltitudeLines from "../assets/images/white-altitude-lines.png"
import {ADMIN_BASE_URL, USERS_BASE_URL} from "../utils/constants";
import {AuthContext} from "../context/auth/AuthContext";
import awsGetProfileImage from "../utils/awsGetProfileImage";
import TextArea from "../components/form-inputs/TextArea";

export default function Admin() {

   const {authUser} = useContext(AuthContext)
   const [users, setUsers] = useState([]);

   // react hook form
   const {register, handleSubmit, reset} = useForm()

   const navLinks = [
      {
         title: "Home",
         url: "/"
      },
      {
         title: "Travelstories",
         url: "/users/travelstories"
      },
      {
         title: authUser.firstname,
         url: `/users/user/${authUser.id}`,
         image: awsGetProfileImage(authUser.id)
      }
   ]


   useEffect(() => {
      getUsers()
   }, []);


   async function getUsers() {

      const config = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
         }
      }

      try {
         const response = await axios.get(`${USERS_BASE_URL}`, config)

         setUsers(response.data)

      } catch (error) {
         console.log(error.response)
      }
   }


   async function deleteUser(data) {
      console.log(data.id)

      try {

         const config = {
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
         }

         const response = await axios.delete(`${ADMIN_BASE_URL}/user/${data.id}`, config)

         if (response.status === 200) {
            await getUsers()
         }

      } catch (error) {
         console.log(error.response)
      }
   }

   async function deleteTravelstory(travelstoryId) {

      const config = {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
         }
      }

      try {
         const response = await axios.delete(`${USERS_BASE_URL}/travelstories/${travelstoryId}`, config)

         if (response.status === 200) {
            await getUsers()
         }

      } catch (error) {
         console.log(error.response)
      }
   }


   function handleCollapseList(id, users) {
      const usersData = users.map((user) => {
         if (user.id === id) {
            // react hook form, reset the form data
            reset(user)

            if (user.isUserCollapse === true) {
               return {
                  ...user,
                  isUserCollapse: false,
               };
            } else {
               return {
                  ...user,
                  isUserCollapse: true,
               };
            }
         } else {
            return {
               ...user,
               isUserCollapse: false,
            };
         }
      });
      setUsers(usersData);
   }


   return (
      <Layout navLinks={navLinks}>
         <Container bgImage={whiteAltitudeLines}>
            <StyledAdmin>
               <h1>Admin</h1>
               <StyledCollapseList>
                  {users && users.map((user) => (
                     <div key={user.id}>

                        <StyledCollapseButton
                           key={user.id}
                           isCollapse={user.isUserCollapse}
                           onClick={() => handleCollapseList(user.id, users)}
                        >
                           <h3>{`${user.firstname} ${user.lastname}`}</h3> <span>???</span>
                        </StyledCollapseButton>

                        <StyledCollapseContent isCollapse={user.isUserCollapse}>

                           <InputField labelTitle="Voornaam" name="firstname"
                                       register={register} readOnly={true}/>

                           <InputField labelTitle="Achternaam" name="lastname"
                                       register={register} readOnly={true}/>

                           <InputField labelTitle="Email" name="email" type="email"
                                       register={register} readOnly={true}/>

                           <InputField labelTitle="Woonplaats" name="city"
                                       register={register} readOnly={true}/>

                           <InputField labelTitle="Land" name="country"
                                       register={register} readOnly={true}/>

                           <TextArea labelTitle="Bio" name="bio" register={register} height={150} readOnly={true}/>

                           <div className="buttons">
                              <StyledButton type="submit"
                                            onClick={handleSubmit(deleteUser)}>Delete
                                 User</StyledButton>
                           </div>

                           {user.travelstories.map(story => (
                              <div key={story.id}>

                                 <div className="link">
                                    <StyledLink
                                       to={`/admin/travelstory/${story.id}`}>{story.title}
                                       <span>
                                          <StyledButton type="submit"
                                                        onClick={handleSubmit(() => deleteTravelstory(story.id))}>Delete Travelstory
                                          </StyledButton>
                                    </span>
                                    </StyledLink>
                                 </div>

                              </div>
                           ))}
                        </StyledCollapseContent>
                     </div>
                  ))}
               </StyledCollapseList>
            </StyledAdmin>
         </Container>
      </Layout>
   )
}

const StyledAdmin = styled.div`

  padding: 30rem 0 5rem;

  h1 {
    color: ${({theme: {colors}}) => colors.red};
    text-align: center;
  }

  @media only screen and ${({theme: {breakpoints}}) => breakpoints.md} {
    padding: 10rem 0 5rem;

  }

`

const StyledCollapseList = styled.div`
  padding-top: 5rem;
  padding-bottom: 5rem;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;

  h4 {
    font-size: 3rem;
    font-weight: 400;
  }

  p {
    color: ${({theme: {colors}}) => colors.black};
  }
`

const StyledCollapseContent = styled.div`
  border: 3px solid ${({theme: {colors}}) => colors.red};
  background-color: ${({theme: {colors}}) => colors.white};
  color: ${({theme}) => theme.colors.green};
  padding: 0.5rem;
  display: ${({isCollapse}) => (isCollapse ? 'block' : 'none')};

  label {
    color: ${({theme}) => theme.colors.red};
  }

  input, textarea {
    border-color: ${({theme}) => theme.colors.red};
  }

  .buttons {
    display: flex;
    align-items: center;
    column-gap: 2rem;
  }

  .link {
    margin: 1rem 0;

    a {
      background-color: ${({theme}) => theme.colors.green};
      border: 3px solid ${({theme}) => theme.colors.green};
      display: flex;
      justify-content: space-between;

      //span {
      //  text-align: end;
      //  transform: rotate(180deg);
      //  font-size: 2rem;
      //}
    }
  }
`

const StyledCollapseButton = styled.button`
  background-color: ${({isCollapse}) => isCollapse ? `#A04340` : `#8B9678`};
  border: 3px solid ${({isCollapse}) => isCollapse ? `#A04340` : `#8B9678`};
  padding: 0.3rem 0.5rem;
  width: 100%;
  margin-top: 0.5rem;
  text-align: start;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({isCollapse}) => !isCollapse && `
      &:hover {
         background-color: #A04340;
         border: 3px solid #A04340;
      }`
  };

  span {
    color: white;
    font-size: 2rem;
    transform: ${({isCollapse}) => isCollapse ? `rotate(180deg)` : `rotate(0deg)`};
  }
`
