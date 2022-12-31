import React, { useState } from 'react';
import firebase from '../Databse/firbase';
import {v4} from 'uuid';

export default function AddCabinet({handleOpenAlert}) {
    const cabinetRef=firebase.database().ref('Cabinet');
    const [code,setcode]=useState('');
    const handleClick=()=>{
        let id=v4();
        cabinetRef.child(id).set({
            id:id,
            isoccupied:false,
            last_occupied:new Date.now(),
            code:code
        })
        .then(()=>handleOpenAlert())
        .catch(e=>alert(e));
    }

    return (
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add Cabinet</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <label for="code" class="form-label">Add code for the cabinet</label>
                        <input type="text" id="code" value={code} class="form-control" aria-describedby="textHelpBlock" onChange={e=>setcode(e.target.value)} />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={handleClick}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
