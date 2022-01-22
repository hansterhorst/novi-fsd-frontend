import React, {useContext} from "react";
import {AlertContext} from "../../context/alert/AlertContext";
import styled from "styled-components";

export default function Alert() {

   const {alerts} = useContext(AlertContext)

   return (
      alerts && alerts.map(alert => {

         return (
            <StyledAlert key={alert.message} className={alert.isError ? `error` : `success`}>
               <p>{alert.message}</p>
            </StyledAlert>
         )
      })
   )
}

const StyledAlert = styled.div`
  padding: 1rem 1.6rem 0.8rem;
  text-align: center;

  &.error {
    background-color: ${({theme}) => theme.colors.red + `33`}; // 33, HEX-value for alfa
    border: 3px solid ${({theme}) => theme.colors.red};
  }

  &.success {
    background-color: ${({theme}) => theme.colors.green + `33`}; // 33, HEX-value for alfa
    border: 3px solid ${({theme}) => theme.colors.green};
  }

`