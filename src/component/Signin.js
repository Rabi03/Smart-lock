import React,{useContext, useState} from 'react'
import firebase from '../Databse/firbase';
import {useNavigate} from 'react-router-dom';
import AuthContext from './Context';

export default function Signin() {
  const {setUser}=useContext(AuthContext);
    const navigate=useNavigate();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const handleSubmit=(e)=>{
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(email,password)
        .then(user=>{
            localStorage.setItem('User',user.user.uid);
            setUser(user.user.uid);
            navigate('/home');
        })
        .catch(e=>alert(e))
        

    }

  return (
    <main class="form-signin">
  <form>
    <h1 class="h3 mb-3 fw-normal" style={{textAlign:'center',fontWeight:'bold'}}>Login</h1>

    <div class="form-floating">
      <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" value={email} onChange={e=>setEmail(e.target.value)}/>
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/>
      <label for="floatingPassword">Password</label>
    </div>

    <div class="checkbox mb-3">
      <label>
        <input type="checkbox" value="remember-me"/> Remember me
      </label>
    </div>
    <button class="w-100 btn btn-lg btn-primary" type="submit" onClick={handleSubmit}>Login</button>
    <a href='/register' class="w-100 btn btn-lg btn-primary mt-4" type="submit">Register</a>
  </form>
</main>

  )
}
