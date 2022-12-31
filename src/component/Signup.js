/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState,useContext } from 'react';
import firebase from '../Databse/firbase';
import {useNavigate} from 'react-router-dom';
import AuthContext from './Context';

export default function Signup() {
    const {setUser}=useContext(AuthContext);
    const navigate=useNavigate();
    const userRef=firebase.database().ref('User');
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const handleSubmit=(e)=>{
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(email,password)
        .then(createdUser=>{
            userRef.child(createdUser.user.uid).set({
                name,
                email,
                photo:createdUser.user.photoURL,
                admin:false,
                locker:[]
                
            });
            localStorage.setItem('User',createdUser.user.uid);
            setUser(createdUser.user.uid);
            navigate('/home')
        })
        .catch(e=>alert(e));

    }
    return (
        <main class="form-signin">
            <form>
                <h1 class="h3 mb-3 fw-normal" style={{ textAlign: 'center', fontWeight: 'bold' }}>Register</h1>

                <div class="form-floating">
                    <input type="text" class="form-control" id="floatingText" placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)} />
                    <label for="floatingText">Name</label>
                </div>
                <div class="form-floating">
                    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
                    <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating">
                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
                    <label for="floatingPassword">Password</label>
                </div>

                <div class="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me" /> Remember me
                    </label>
                </div>
                <button class="w-100 btn btn-lg btn-primary" type="submit" onClick={handleSubmit}>Register</button>
                <a href='/login' class="w-100 btn btn-lg btn-primary mt-4" type="submit">Login</a>
            </form>
        </main>

    )
}
