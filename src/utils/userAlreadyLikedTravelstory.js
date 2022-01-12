export default function userAlreadyLikedTravelstory(likes, userId) {
   let isTrue = false
   likes.map(like => {
      return isTrue = like.userId === userId;
   })
   return isTrue
}