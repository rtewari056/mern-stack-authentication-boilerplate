import { useContext, useState } from "react";
import { createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // If "auth" !== null and token is not expired, save the auth details inside "auth" state else set it to null
  const [auth, setAuth] = useState(
    (localStorage.getItem("auth") !== null &&
      new Date() < new Date(JSON.parse(localStorage.getItem("auth")).expires_at))
      ? JSON.parse(localStorage.getItem("auth"))
      : null
  );

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthState = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
