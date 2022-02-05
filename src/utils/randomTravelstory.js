export default function randomTravelstory(travelstories) {
   const index = Math.floor(Math.random() * travelstories.length)
   return travelstories[index]
}