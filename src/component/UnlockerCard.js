/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import firebase from '../Databse/firbase';

export default function UnlockerCard({cabinate}) {
    
    const userRef=firebase.database().ref('User');
    const cabinetRef=firebase.database().ref('Cabinet');
    const user=localStorage.getItem('User');
    const [key, setKey] = useState('');
    const handleLockerClick= (e) => {
        e.preventDefault();
        if (cabinate.key.localeCompare(key) === 0) {
            userRef.child(user)
            .get().then(snap=>{
                let res=snap.val();
                res.lockers=res.lockers.filter(k=>k.id!==cabinate.id);
                userRef.child(user).update(res);
                cabinetRef.child(cabinate.id).update({isoccupied:false,last_occupied:Date.now()});

            })
            .catch(e=>alert(e))

        }
        else {
            alert("Unlock keys have to be matched!!!")
        }
    }
    return (
        <>
            <div key={cabinate.id} className='col-3 mb-2 mt-2'>
                <div class="card text-center">
                    <div class="card-body">
                        <h5 class="card-title">Locker</h5>
                        <img alt='' src="https://img.icons8.com/color/48/null/unlock.png" />
                        <h6 class="card-title">{cabinate.code}</h6>
                        <button type="button" class='btn btn-danger' data-bs-toggle="modal" data-bs-target={`#${cabinate.code}`}>
                            Unlock
                        </button>
                    </div>
                </div>
            </div>
            <div class="modal fade" id={`${cabinate.code}`} tabindex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Unlock Locker</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <label for="key" class="form-label">Your Unlocker Key:</label>
                            <label for="key" class="form-label"><strong style={{color:'red',fontWeight:'bold'}}>{cabinate.key}</strong></label>
                            <input type="text" id="key" value={key} class="form-control" aria-describedby="textHelpBlock" onChange={e => setKey(e.target.value)} />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={handleLockerClick}>Unlock</button>
                        </div>
                    </div>

                </div>
            </div>

        </>

    )
}

