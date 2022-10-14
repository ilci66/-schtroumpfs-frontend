import React, { useEffect, useState } from 'react'
import SmurfList from '../components/SmurfList'
import Profile from '../components/Profile'
import axios from 'axios';

const Home = () => {

  const [idToken, setIdToken] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [success, setSuccess] = useState(false)
  const [msg, setMsg] = useState("");
  const [nom, setNom] = useState("");
  const [role, setRole] = useState("");
  const [friends, setFriends] = useState([])

  useEffect(() => {

    setIdToken(sessionStorage.getItem("id_token"));
    setExpiresAt(sessionStorage.getItem("expires_at")); 

    
    if(idToken && expiresAt >= Date.now()){
      console.log("token is still valid");

      const config = {
        headers: { Authorization: idToken }
      };
      
      const bodyParameters = {
        key: "value"
      };
      
      axios.post('http://localhost:5000/verify', bodyParameters, config).then(res => {
        if(res.status === 200) setSuccess(true)
        else setSuccess(false)
      }).catch(() => {
        setSuccess(false)
        return
      });


    } else {
      setMsg("token expired")
      setSuccess(false)
    }
  }); 
  
  console.log(success);
  return (<div className='page home-page'>
    <Profile 
      nom={nom} 
      setNom={setNom}
      role={role} 
      setRole={setRole}
      friends={friends} 
      setFriends={setFriends}
    />
    <SmurfList 
      success={success} 
      setFriends={setFriends}
    />

  </div>)
}

export default Home