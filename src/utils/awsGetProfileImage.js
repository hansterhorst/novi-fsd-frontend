import {PUBLIC_BASE_URL} from "./constants";

export default function awsGetProfileImage(userId){
   return `${PUBLIC_BASE_URL}/user/${userId}/profile-image/download`
}