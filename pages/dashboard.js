// pages/profile.js
import React, { useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Profile = () => {
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login'); // Redirect to login if user data isn't available
    }
  }, [loading, user, router]);

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, 'yyyy-MM-dd HH:mm:ss');
    } catch (err) {
      return 'Invalid Date';
    }
  };

  const logout = () => {
    if (typeof window !== 'undefined') { // Check if window is defined (client-side)
      localStorage.removeItem('token');
      router.push('/login');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
        <div>loading... please wait</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
        <div>No user found. Please refresh or log in again.</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-gray-100 p-8 flex flex-col items-center"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl"
      >
        <div className="flex items-center space-x-4">
          <Image
            src="https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FydG9vbnxlbnwwfHwwfHx8MA%3D%3D"
            // Replace with actual profile image path
            alt="Profile Picture"
            width={100}
            height={100}
            className="rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
          <button
            onClick={logout}
            className="font-bold text-xl bg-violet-200 hover:bg-violet-950 hover:text-white transition rounded p-1 px-2"
          >
            LogOut
          </button>
        </div>
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-6"
        >
          <h3 className="text-xl font-semibold text-gray-800">Profile Details</h3>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Company</p>
              <p className="font-medium text-gray-800">{user.company}</p>
            </div>
            <div>
              <p className="text-gray-600">Birthday :</p>
              <p className="font-medium text-gray-800">{formatDate(user.bday)}</p>
            </div>
            <div>
              <p className="text-gray-600">Phone:</p>
              <p className="font-medium text-gray-800">+{user.code} {user.phone}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Profile;
