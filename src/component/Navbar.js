/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import firebase from '../Databse/firbase';
import {useNavigate} from 'react-router-dom';
export default function Navbar() {
    const navigate=useNavigate();
    const userRef = firebase.database().ref('User');
    const user = localStorage.getItem('User');
    const [userInfo, setUserInfo] = useState({});
    useEffect(() => {
        if (user) {
            userRef.child(user).get().then(snap => {
                setUserInfo(snap.val());
            })
        }
    }, [])

    const handleLogout=()=>{
        localStorage.removeItem('User');
        navigate('/');
    }
    return (
        <nav class="navbar navbar-light bg-light m-4">
            <div class="container-fluid">
                <h4 class="navbar-brand">Smart Locker</h4>
                <div class="d-flex" id="navbarSupportedContent">
                    {userInfo && userInfo.admin &&
                        <button type="button" class="btn btn-primary me-5" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ float: 'right' }}>
                            + Add Cabinet
                        </button>
                    }
                    {user &&
                        <div class="dropdown me-5">
                            <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                {userInfo.name}
                            </button>
                            <ul class="dropdown-menu me-3" aria-labelledby="dropdownMenuButton1">
                                <li><a class="dropdown-item" href="/profile">Profile</a></li>
                                <li><h6 class="dropdown-item" onClick={handleLogout} style={{cursor:true}}>Logout</h6></li>
                            </ul>
                        </div>
                    }
                    {!user && <>
                        <button type="button" class="btn btn-primary me-2">Login</button>
                        <button type="button" class="btn btn-danger">Signup</button>
                    </>
                    }
                </div>
            </div>
        </nav>
    )
}
