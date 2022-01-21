export default function getTotalLikesFromUserTravelstories(travelstories) {
   let count = 0
   travelstories && travelstories.map(travelstory => {
      return count += travelstory.likes.length
   })
   return count
}