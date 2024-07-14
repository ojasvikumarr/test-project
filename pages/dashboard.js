import {React , useState , useEffect} from 'react';
import { useUser } from "../context/UserContext";
import { ToastContainer, toast , Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import Image from 'next/image';
const InternProfile = () => {
    const { user, loading } = useUser();
    // console.log(user.user);
    if(loading){
        return <div>loading...</div>
    }
    const formatDate = (dateString) => {
        try {
          const date = new Date(dateString);
          return format(date, 'yyyy-MM-dd HH:mm:ss');
        } catch (err) {
          return 'Invalid Date';
        }
      };
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
            src="https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FydG9vbnxlbnwwfHwwfHx8MA%3D%3D" // Replace with actual profile image path
            alt="Profile Picture"
            width={100}
            height={100}
            className="rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{user.user.name}</h2>
            <p className="text-gray-600">{user.user.email}</p>
          </div>
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
              <p className="text-gray-600">Roll Number:</p>
              <p className="font-medium text-gray-800">{user.user.roll}</p>
            </div>
            <div>
              <p className="text-gray-600">Year:</p>
              <p className="font-medium text-gray-800">{user.user.year}</p>
            </div>
            <div>
              <p className="text-gray-600">Phone:</p>
              <p className="font-medium text-gray-800">{user.user.phone}</p>
            </div>
            <div>
              <p className="text-gray-600">Department:</p>
              <p className="font-medium text-gray-800">{user.user.department}</p>
            </div>
            <div>
              <p className="text-gray-600">CGPA:</p>
              <p className="font-medium text-gray-800">{user.user.cgpa}</p>
            </div>
            <div>
              <p className="text-gray-600">Back:</p>
              <p className="font-medium text-gray-800">{user.user.back}</p>
            </div>
            <div>
              <p className="text-gray-600">Account Number:</p>
              <p className="font-medium text-gray-800">{user.user.acc}</p>
            </div>
            <div>
              <p className="text-gray-600">IFSC Code:</p>
              <p className="font-medium text-gray-800">{user.user.code}</p>
            </div>
            <div>
              <p className="text-gray-600">Reporting Officer:</p>
              <p className="font-medium text-gray-800">{user.user.reportingofficer || 'N/A'}</p>
            </div>
            <div>
              <p className="text-gray-600">Departure Date:</p>
              <p className="font-medium text-gray-800">{new Date(user.user.depdate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-gray-600">Departure Number:</p>
              <p className="font-medium text-gray-800">{user.user.depno}</p>
            </div>
            <div>
              <p className="text-gray-600">Period:</p>
              <p className="font-medium text-gray-800">{user.user.period}</p>
            </div>
            <div>
              <p className="text-gray-600">Stay:</p>
              <p className="font-medium text-gray-800">{user.user.stay}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default InternProfile;

const ProfileItem = ({ icon, label, value }) => (
    <div className="flex items-center">
      <div className="p-2 bg-indigo-500 text-white rounded-full mr-4">
        {icon}
      </div>
      <div>
        <h2 className="text-gray-700 font-bold">{label}</h2>
        <p className="text-gray-600">{value}</p>
      </div>
    </div>
  );
