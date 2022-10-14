import React, { useEffect, useState } from 'react'
import EditForm from './EditForm';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Profile = ({
  nom, 
  setNom,
  role, 
  setRole,
  friends, 
  setFriends,
}) => {


  const [nomAModifier, setNomAModifier] = useState("");
  const [roleAModifier, setRoleAModifier] = useState("");

  const enleverAmi = (n, nomAmi) => {
    const idToken = sessionStorage.getItem("id_token");
    const expiresAt = sessionStorage.getItem("expires_at"); 

    console.log("wanna delete")
    let data = {nom:n, nomAmi}
    console.log(data)
    const config = {
      headers: { Authorization: sessionStorage.getItem("id_token") }
    };
    axios.delete(`http://localhost:5000/enlever-ami/${nomAmi}`, config)
      .then(res => {
        console.log(res);
        setFriends(res.data.friends)
      }).catch(console.log)
  };

  const modifierProfile = () => {
    setNomAModifier(nom)
    setRoleAModifier(role)
  }

  useEffect(() => {
    const idToken = sessionStorage.getItem("id_token");
    const expiresAt = sessionStorage.getItem("expires_at"); 
    if(idToken && expiresAt >= Date.now()){
      console.log("get user")
      const config = {
        headers: { Authorization: sessionStorage.getItem("id_token") }
      };
      axios.get('http://localhost:5000/user', config)
      .then(res => {
        console.log("asdasd=> ",res.data)
        const {nom:n, role:r, friends:f} = res.data
        console.log(n, r, f)
        setNom(n);
        setRole(r);
        setFriends(f);
      })
      .catch(err => console.log(err))
    }
  }, [])
    
  return (<>
    <div className='profile-box'>
      {nom !== "" ? <>
        <h2>Profil</h2>
        <img src="https://cdn.imgbin.com/13/18/15/imgbin-smurfette-papa-smurf-baby-smurf-grouchy-smurf-de-smurfen-schtroumpf-sauvage-3Tk06daJFYjAGe4ke54nF2mCK.jpg" alt="smurf" />
        <p>Nom: {nom}</p>
        <p>Role: {role}</p>
        <p>Amis: {Array.isArray(friends) && friends.length}</p>
        <h3 className='amis-title'>Mes Amis</h3>
        <ul className='amis-ul'>{Array.isArray(friends) && friends.map(f => <li key={f}>{f} <button className='enlever-btn' onClick={() => enleverAmi(nom, f)}>Enlever</button></li>)}
        </ul>
        <button 
        onClick={modifierProfile} 
        className='modifier-btn'>
          Modifier
        </button>
      </>
      :<p>Vous ne pouvez pas voir votre profil tant que vous n'êtes pas connecté.<Link to="/sign-in"> Connectez-vous </Link> </p>}
    <EditForm 
      nomAModifier={nomAModifier} 
      setNomAModifier={setNomAModifier}
      roleAModifier={roleAModifier}
      setRoleAModifier={setRoleAModifier}
      nom={nom}
      setNom={setNom}
      role={role}
      setRole={setRole}
      friends={friends}
      setFriends={setFriends}
    />
    </div>
  </>)
}

export default Profile