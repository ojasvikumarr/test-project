// context/UserContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserDetails = async () => {
    if (typeof window !== 'undefined') { // Check if window is defined (client-side)
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
            setUser(data.user); // Update user state with fetched user data
          } else {
            console.error('Error fetching user details:', response.error);
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    }
    setLoading(false);
  };
  useEffect(() => {

    fetchUserDetails();
  }, []); // Empty dependency array to fetch once on mount

  // Effect to update user on token change (client-side)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserDetails();
    }
  }, [typeof window !== 'undefined' ? localStorage.getItem('token') : null]);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};
