export default function userAlreadyFollowingUser(follows, authUserId) {
   let isTrue = false
   follows.map((follow) => {
      return isTrue = follow.authUserId === authUserId;
   })
   return isTrue
}