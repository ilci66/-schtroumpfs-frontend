import React, { useState } from 'react'
import axios from 'axios';


const SignUpForm = () => {
  const [nom, setNom] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [role, setRole] = useState("");
  const [errText, setErrText] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    if(nom === "" || password === ""|| password2 === "" || role === "") {
      setErrText("Merci de remplir tous les champs");
      return
    } else if(password !== password2) {
      setErrText("Passwords are not identical");
      return
    } else {
      const data = {nom, password, password2, role}
      axios.post('http://localhost:5000/sign-up', data)
        .then(async res => {
          const { expiresIn } = await res.data;
          const { token } = await res.data;
          
          sessionStorage.removeItem("id_token");
          sessionStorage.removeItem("expires_at");

          const expiresAt = Date.now() + Number.parseInt(expiresIn) * 86400 * 1000; // day

          sessionStorage.setItem('id_token', token);
          sessionStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));

          if(data){ window.location = '/'}
        })
        .catch(err => {
          alert("Le nom existe déjà dans la base de données ")
          console.log(err)
        })
    }

  }

  return (<>
    <h1 className="sign-up-title">S'inscrire</h1>
    <form onSubmit={handleSubmit} action="" className='sign-up-form'>
      <label htmlFor="nom">nom</label>
      <input required onChange={(e) => setNom(e.target.value)} type="text" id='nom' name='nom' />

      <label htmlFor="password">Password</label>
      <input required onChange={(e) => setPassword(e.target.value)} type="password" id='password' name='password' />

      <label htmlFor="password2">Rewrite Password</label>
      <input required onChange={(e) => setPassword2(e.target.value)} type="password" id='password2' name='password2' />

      <label htmlFor="select_role">Rôle</label>
      <select required onChange={(e) => setRole(e.target.value)} name="select_role" id="select_role">
        <option value="">Options</option>
        <option value="guerrier">Guerrier</option>
        <option value="alchimiste">Alchimiste</option>
        <option value="sorcier">Sorcier</option>
        <option value="espions">Espions</option>
        <option value="enchanteur">Enchanteur</option>
      </select>
      <button className="sign-btn">Sign Up</button>
    </form>
    <div className="sign-err-box">
      <p>{errText}</p>
    </div>
  </>)
}

export default SignUpForm