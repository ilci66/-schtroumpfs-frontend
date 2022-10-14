import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SmurfList = ({setFriends, getUserInfo}) => {

  const [schtroumpfs, SetSchtroumpfs] = useState([])

  const ajoutAmi = (nomAmi) => {
    const data = {nomAmi}

    const config = {
      headers: { Authorization: sessionStorage.getItem("id_token") }
    };

    const idToken = sessionStorage.getItem("id_token");
    const expiresAt = sessionStorage.getItem("expires_at"); 
    if(idToken && expiresAt >= Date.now()){ 

      axios.post("http://localhost:5000/ajout-ami", data, config)
      .then(res => {
        console.log("respnnse in add friends", res.data.friends)
        if(res.status === 200) {
          setFriends(res.data.friends)
          let f = JSON.stringify(res.data.friends)
          localStorage.setItem('friends', f)
          getUserInfo()
          window.alert("Ajoutée")
          return 
        }
        alert("Pas Ajouté")
      }).catch(console.log)
    } else {
      alert("Vous n'êtes pas connecté");
      return 
    }
  }

  useEffect(() => {
    axios.get("http://localhost:5000/get-all")
      .then(res => {
        SetSchtroumpfs(res.data.schtroumpf)
      }).catch(console.log)
  },[])

  return (<div className='smurf-list-container'>
    <h2>Tous les abonnés</h2>
    <div className='smurf-list-cards'>

        {schtroumpfs.map(s => <div className='smurf-list-card' key={s.nom}>
          <img src="https://cdn.imgbin.com/13/18/15/imgbin-smurfette-papa-smurf-baby-smurf-grouchy-smurf-de-smurfen-schtroumpf-sauvage-3Tk06daJFYjAGe4ke54nF2mCK.jpg" alt="smurf" />
          <p>Nom: <span className='blue-text'>{s.nom}</span></p>
          <p>role: <span  className='blue-text'>{s.role}</span></p>
            <button className='ajoutez-ami' onClick={() => ajoutAmi(s.nom)}>Ajoutez</button>
        </div>)}
    </div>
</div>)
}

export default SmurfList