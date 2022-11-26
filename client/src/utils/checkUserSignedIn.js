const checkUserSignedIn = () => {
  // const expires_at = JSON.parse(localStorage.getItem("auth")).expires_at;
  if (JSON.parse(localStorage.getItem("auth")) !== null) {
    console.log(new Date());
    console.log(new Date(JSON.parse(localStorage.getItem("auth")).expires_at));
    return (
      new Date() < new Date(JSON.parse(localStorage.getItem("auth")).expires_at)
    ); // Return true if token is not expired
  } else {
    return false; // Else return false
  }
};

export default checkUserSignedIn;
