export default (subscriptionId, subscriptionArray) => {
  for (let subscription of subscriptionArray) {
    if (subscription._id === subscriptionId) {
      return subscription;
    }
  }
  return false;
};
