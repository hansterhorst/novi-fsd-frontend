export default function randomArrayIndexNumber(array) {
   const length = (array.length > 0) ? array.length : 0
   return Math.floor(Math.random() * length)
}