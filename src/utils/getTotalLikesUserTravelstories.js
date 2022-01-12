export default function getTotalLikesFromUserTravelstories(travelstories) {
   let count = 0
   travelstories.map(travelstory => {
      return count += travelstory.likes.length
   })
   return count
}