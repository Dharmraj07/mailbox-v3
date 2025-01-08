import React, { Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";


// Lazy load components
const SignUp = React.lazy(() => import("./pages/SignUp"));
const SignIn = React.lazy(() => import("./pages/SignIn"));
const Inbox = React.lazy(() => import("./components/Inbox"));
const SentBox = React.lazy(() => import("./components/SentBox"));

import AppNavbar from "./components/AppNavbar";
import { fetchInbox } from "./redux/mailSlice";

const App = () => {

  const dispatch=useDispatch();
   // Initialize Socket.IO connection
    const socket = io("http://localhost:5000", {
      withCredentials: true,
    });
    
  
  
    
      socket.on(localStorage.getItem("email"), (data) => {
        console.log("Notification received:", data.mail);
        dispatch(fetchInbox());
  
      });

  

 

  return (
    <div>
      <AppNavbar />

      {/* Suspense with fallback for lazy-loaded components */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/sent" element={<SentBox />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default React.memo(App);
