import React, {useEffect, useState} from "react";
import styled from "styled-components";
import StyledLabel from "../../styles/StyledLabel";

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


   // create a preview as a side effect, whenever selected file is changed
   useEffect(() => {
      if (!selectedFile) {
         setPreview(undefined)
         return
      }

      const objectUrl = URL.createObjectURL(selectedFile)
      setPreview(objectUrl)

      // free memory when ever this component is unmounted
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

const StyledInput = styled.input`
  padding: 0.8rem 1.6rem;
  font-family: "Merriweather", serif;
  font-size: 1.8rem;
  color: ${({theme: {colors}}) => colors.black};
  border: 3px solid ${({theme: {colors}}) => colors.green};
  width: 100%;
  background-color: ${({theme: {colors}}) => colors.white};

`

const StyledPreview = styled.div`
  width: 50%;

  img {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
    border: 3px solid ${({theme: {colors}}) => colors.green};
    margin-bottom: 1.5rem;

  }

`
