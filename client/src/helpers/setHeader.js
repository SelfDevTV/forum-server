const setHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.token) {
    const config = {
      headers: {
        "auth-token": user.token
      }
    };
    return config;
  } else {
    return {};
  }
};

export default setHeader;
