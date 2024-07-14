// context/UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const response = await fetch('/api/getUserDetails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
          });

          if (response.ok) {
            const data = await response.json();
            setUser(data);
          } else {
            console.error('Error fetching user details:', response.error);
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
      setLoading(false);
    };

    fetchUserDetails();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};
