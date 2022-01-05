export default function dateToLocalString(date) {
   return new Date(date).toLocaleString("nl-NL",
      {year: 'numeric', month: 'long', day: 'numeric'}
   )
}