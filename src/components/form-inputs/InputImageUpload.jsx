import React, {useEffect, useState} from "react";
import styled from "styled-components";
import StyledLabel from "../../styles/StyledLabel";
import StyledInput from "../../styles/StyledInput";

export default function InputImageUpload({
                                            labelTitle,
                                            type = "file",
                                            name,
                                            required = false,
                                            register,
                                            image
                                         }) {

   const [selectedFile, setSelectedFile] = useState()
   const [preview, setPreview] = useState("")


   useEffect(() => {
      if (!selectedFile) {
         setPreview(undefined)
         return
      }

      const objectUrl = URL.createObjectURL(selectedFile)
      setPreview(objectUrl)

      return () => URL.revokeObjectURL(objectUrl)
   }, [selectedFile])


   function onSelectFile(e) {
      if (e.target.files || e.target.files.length !== 0) {
         setSelectedFile(e.target.files[0])
      }
   }


   return (
      <StyledPreview>
         <StyledLabel>{labelTitle}
            <StyledInput type={type} {...register(`${name}`)} required={required} onChange={onSelectFile}/>
            {selectedFile ? <img src={preview} alt="preview"/> :
               <img src={image} alt="preview"/>}
         </StyledLabel>
      </StyledPreview>
   )

}


const StyledPreview = styled.div`
  width: 50%;

  img {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
    border: 3px solid ${({theme: {colors}}) => colors.darkGreen};
    margin-bottom: 1.5rem;

  }

  @media only screen and ${({theme: {breakpoints}}) => breakpoints.md} {
    width: 100%;
  }
`
