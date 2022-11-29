import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const HomePage = () => {
  const [privateMessage, setPrivateMessage] = useState("");
  const navigate = useNavigate();

  const fetchPrivateDate = async () => {
    try {
      const response = await fetch("/api/private", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("auth")).token
          }`,
        },
      });
      const data = await response.json();

      if (data.success) {
        setPrivateMessage(data.data);
        return toast.success(data.data, {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        navigate("/login");
        return toast.warn("You are not authorized please login", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      localStorage.removeItem("auth");
      navigate("/login");
      return toast.error("Internal server error", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    fetchPrivateDate();
    // eslint-disable-next-line
  }, []);

  return <span>{privateMessage}</span>;
};

export default HomePage;
