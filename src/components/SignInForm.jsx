import React, { useState } from 'react'
import axios from 'axios'

const SignInForm = () => {

  const [nom, setNom] = useState("")
  const [password, setpassword] = useState("")
  const [errText, setErrtext] = useState("");

  const seConnecter = (e) => {
    e.preventDefault();
    console.log(nom, password);
    if(nom === "" || password === "") {
      setErrtext("Merci de remplir tous les champs")
      return 
    }
    const data = { nom, password }
    axios.post('http://localhost:5000/sign-in', data)
        .then(async res => {
          const { expiresIn } = await res.data;
          const { token } = await res.data;

          sessionStorage.removeItem("id_token");
          sessionStorage.removeItem("expires_at");


          const expiresAt = Date.now() + Number.parseInt(expiresIn) * 86400 * 1000; // day
          sessionStorage.setItem('id_token', token);
          sessionStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
          setErrtext("");
          if(data){ window.location = '/'}
        })
        .catch(err => {
          // alert("Abonnement n'existe pas!")
          setErrtext(err.response.data.error)
          console.log(err.response.data.error)
        })

  }
  

  return (<>
    <h1>Se Connnecter</h1>
    <form action="" className='sign-up-form'>
      <label htmlFor='nom'>nom</label>
      <input required onChange={e => setNom(e.target.value)} type="text" id='nom' name='nom' />

      <label htmlFor="password">Password</label>
      <input required  onChange={e => setpassword(e.target.value)} type="password" id='password' name='password' />
      
      <button onClick={seConnecter} className="sign-btn">Se Connnecter</button>
      <div className="sign-err-box">
        <p className='red-text'>{errText}</p>
      </div>
    </form>

  </>)
}

export default SignInForm