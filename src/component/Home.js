import React,{useEffect, useState} from 'react';
import AddCabinet from './AddCabinet';
import LockerCard from './LockerCard';
import Navbar from './Navbar';
import firebase from 'firebase';
import Alert from './Alert';

export default function Home() {
    const cabinetRef=firebase.database().ref('Cabinet');
    const [cabinets,setCabinets]=useState([]);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertType,setType]=useState('alert-primary');
    const [alertText,setText]=useState('');
    useEffect(()=>{
        
        cabinetRef.on('value',(snap)=>{
            setCabinets(snap.val());
        })
    },[])

    const cabinetKeys=cabinets?Object.keys(cabinets):[];
  return (
    <div>
                <Navbar />
                {openAlert &&
                    <Alert handleClick={()=>setOpenAlert(false)} text={alertText} type={alertType} />
                }
                <AddCabinet handleOpenAlert={()=>{setOpenAlert(true);setType('alert-primary');setText('Successfully created!')}} />
                <div class="container">
                    <div class="row">
                        {cabinetKeys&& cabinetKeys.map(id => <LockerCard cabinet={cabinets[id]} handleOpenAlert={()=>{setOpenAlert(true);setType('alert-danger');setText('Codes are not matched!')}} />)}
                    </div>
                </div>
    
            </div>
  )
}
