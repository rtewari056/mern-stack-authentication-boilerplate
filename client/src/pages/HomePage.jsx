import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [allowUser, setAllowUser] = useState({
    status: false,
    message: "",
  });
  const navigate = useNavigate();

  const fetchPrivateDate = async () => {
    try {
      const response = await fetch("/api/private", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("auth")).token}`,
        },
      });
      const data = await response.json();

      setAllowUser({
        status: true,
        message: data.data,
      });
    } catch (error) {
      localStorage.removeItem("authToken");
      setAllowUser({
        status: false,
        message: "You are not authorized please login",
      });
    }
  };

  useEffect(() => {
    fetchPrivateDate();
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <div>
      {allowUser.status ? (
        <>
          <span className="success-message">{allowUser.message}</span>
          <button onClick={logoutHandler}>Logout</button>
        </>
      ) : (
        <span className="error-message">{allowUser.message}</span>
      )}
    </div>
  );
};

export default HomePage;
