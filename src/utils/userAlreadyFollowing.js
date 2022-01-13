export default function userAlreadyFollowingUser(follows, userId) {
   let isTrue = false
   follows.map(({followingId}) => {
      return isTrue = followingId === userId;
   })
   return isTrue
}