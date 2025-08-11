import React from "react";
import { useUserAuth } from "../context/UserAuthContext";
import { useState } from "react";
import { useEffect } from "react";

const useLoggedinUser = () => {
  const { user } = useUserAuth();
  const email = user?.email;
  const [loggedinUser, setLoggedinUser] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/loggedinuser?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoggedinUser(data);
      });
  }, [email]);

  return [loggedinUser, setLoggedinUser];
};

export default useLoggedinUser;
