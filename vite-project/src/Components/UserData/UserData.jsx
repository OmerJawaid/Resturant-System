import axios from "axios";
import { useEffect, useState } from "react";

const useUserData = () => {
  const [User_Data, setUser_Data] = useState([]);
  const User_Data_Server = async () => {
    try {
      const result = await axios.get("http://localhost:8081/getuserdata");
      console.log("API Response: ", result);
      setUser_Data(result.data.Userdata);
    } catch (err) {
      console.log("Err in getting user data client side: ", err);
    }
  };

  useEffect(() => {
    User_Data_Server();
  }, []);

  return { User_Data, User_Data_Server };
};

export default useUserData;
