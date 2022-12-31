import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';


import Welcomepage from './component/Welcomepage';
import Signup from './component/Signup';
import Signin from './component/Signin';
import './app.css';
import Profile from './component/Profile';
import Home from './component/Home';
import AuthContext from './component/Context';


export default function App() {
    const [user,setUser]=useState(localStorage.getItem('User'));

    return (
        <AuthContext.Provider value={{user,setUser}}>
        <Router>
            <Routes>
                <Route path="/" element={<Welcomepage />} />
                <Route path="/home" element={
                    user?<Home />:<Navigate replace to="/" />
                } />
                <Route path="/register" element={<Signup />} />
                <Route path="/login" element={<Signin />} />
                <Route path="/profile" element={user?<Profile />:<Navigate replace to="/" />} />
            </Routes>
        </Router>
        </AuthContext.Provider>

    )
}
