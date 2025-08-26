import { useUserAuth } from "../context/UserAuthContext";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const useLoggedinUser = () => {
  const { user } = useUserAuth();
  const [loggedinUser, setLoggedinUser] = useState({});

  async function fetchUserData(email) {
    try {
      const response = await axios.get(
        `http://localhost:5000/user?email=${email}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  }

  useEffect(() => {
    if (!user?.email) return;
    const fetchedUser = fetchUserData(user?.email);
    if (!fetchedUser) return;
    setLoggedinUser(fetchedUser);
  }, [user]);

  return [loggedinUser, setLoggedinUser];
};

export default useLoggedinUser;
