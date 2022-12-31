/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import firebase from '../Databse/firbase';
import { v4 } from 'uuid';
import moment from 'moment';

export default function LockerCard({ cabinet, handleOpenAlert }) {
    const { id, code, isoccupied,last_occupied } = cabinet;
    const userRef = firebase.database().ref('User');
    const cabinetRef = firebase.database().ref('Cabinet');
    const user = localStorage.getItem('User');
    const [key, setKey] = useState('');
    const handleLockerClick = (e) => {
        e.preventDefault();
        console.log(code, key);
        if (code.localeCompare(key) === 0) {
            userRef.child(user)
                .get().then(snap => {
                    let res = snap.val();
                    if (res.lockers)
                        res.lockers.push({ id, key: v4(), code });
                    else {
                        res.lockers = [{ id, key: v4(), code }];

                    }
                    userRef.child(user).update(res);
                    cabinetRef.child(id).update({ isoccupied: true });

                })
                .catch(e => alert(e))

        }
        else {
            handleOpenAlert();
        }
    }
    return (
        <>
            <div key={id} className='col-3 mb-2 mt-2' style={{height:'250px'}}>
                <div class="card text-center">
                    <div class="card-body">
                        <h5 class="card-title">Locker</h5>
                        <img alt='' src="https://img.icons8.com/color/48/null/unlock.png" />
                        <h6 class="card-title">{code}</h6>
                        <button type="button" class={`btn ${isoccupied ? 'btn-danger' : 'btn-success'}`} data-bs-toggle="modal" data-bs-target={`#${code}`} disabled={isoccupied}>
                            {isoccupied ? "Occupied" : "unoccupied"}
                        </button>
                    </div>
                    {last_occupied&&
                    <div class="card-footer text-muted">
                        {moment(last_occupied).fromNow(false)}
                    </div>
}
                </div>
            </div>
            <div class="modal fade" id={`${code}`} tabindex="-1" aria-labelledby="exampleModalLabel1" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Open Locker</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <label for="key" class="form-label">Add code to open the locker</label>
                            <input type="text" id="key" value={key} class="form-control" aria-describedby="textHelpBlock" onChange={e => setKey(e.target.value)} />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={handleLockerClick}>Open</button>
                        </div>
                    </div>

                </div>
            </div>

        </>

    )
}
