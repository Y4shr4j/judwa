import React, { createContext, useState, useEffect } from "react";
import SummaryApi from "../common/index"; // Adjust the path according to your project structure

const Contexty = createContext();

const ContextProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(SummaryApi.current_user.url, {
          method: SummaryApi.current_user.method,
          credentials: "include",
        });
        const data = await response.json();
        if (data.success) {
          setUserDetails(data.data);
        } else {
          console.error("Failed to fetch user details:", data.message);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <Contexty.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </Contexty.Provider>
  );
};

export { Contexty, ContextProvider };
