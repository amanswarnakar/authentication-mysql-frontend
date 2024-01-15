import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  // const history = useHistory();
  // useEffect(() => {
  //   if (!session.user) {
  //     history.push("/login");
  //   }
  // }, [history]);
  
  const token = localStorage.getItem("jwtToken");
  console.log("Token", token);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const isUserLoggedIn = async () => {
    try {
      const response = await axios.get("http://localhost:8000/", { headers });
      console.log(response.data);
      const isLoggedIn = response.data.loggedIn;
      if (!isLoggedIn) {
        // Navigate to login page and replace the current entry in the history
        navigate("/login", { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  return <div>Homepage</div>;
};

export default HomePage;
