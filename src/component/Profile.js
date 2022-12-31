import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import firebase from '../Databse/firbase';
import UnlockerCard from './UnlockerCard';

export default function Profile() {
    const [lockers, setLockers] = useState([]);
    const userRef = firebase.database().ref('User');
    const user = localStorage.getItem('User');

    useEffect(() => {
        userRef.child(user)
            .get().then(snap => {
                setLockers(snap.val().lockers);
            });
        userRef.child(user).child('lockers').on('child_removed',(snap)=>{
            userRef.child(user)
            .get().then(snap => {
                setLockers(snap.val().lockers);
            });
        })
    }, [])



    return (
        <div>
            <Navbar />
            <h4 className='ms-4'>{lockers?"Your available lockers":"No Locker available"}</h4>
            <div class="container">
                <div class="row">
                    {lockers && lockers.map(cabinate => <UnlockerCard cabinate={cabinate} />)}
                </div>
            </div>


        </div>
    )
}
