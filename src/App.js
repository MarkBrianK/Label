import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import SignUpForm from './Components/Auth/Signup';
import SignInForm from './Components/Auth/Signin';
import User from "./Components/User"

function App() {
  const [session, setSession] = useState('');
  const [userId, setUserId] = useState('');
  console.log(userId)

  return (
    <div>
      <Routes>
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/" element={<SignInForm setSession={setSession}  setUserId={setUserId} />} />
        <Route path="/user" element={<User session={session} user={userId}/>} />
      </Routes>
    </div>
  );
}

export default App;
