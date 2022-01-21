import {PUBLIC_BASE_URL} from "./constants";

export default function awsGetTravelstoryImage(userId, travelstoryId) {
    return (userId && travelstoryId) && `${PUBLIC_BASE_URL}/user/${userId}/travelstory/${travelstoryId}/images/download`
}