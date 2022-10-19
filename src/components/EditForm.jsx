import React, {useState} from 'react'
import axios from 'axios';

const EditForm = ({
  nomAModifier, 
  setNomAModifier, 
  roleAModifier, 
  setRoleAModifier, 
  setNom,
  setRole,
  setFriends,
}) => {
  const [password, setPassword] = useState("")
  const [errText, setErrText] = useState("")
  const soumettreFormulaire = (e) => {
    e.preventDefault()
    const config = {
      headers: { Authorization: sessionStorage.getItem("id_token") }
    };
    
    console.log(nomAModifier, roleAModifier, password);

    if(nomAModifier === "" || roleAModifier === "" || password === "") {
      alert("Merci de remplir tous les champs");
      return
    }

    const data = { nomAModifier, role: roleAModifier, password } 


    const idToken = sessionStorage.getItem("id_token");
    const expiresAt = sessionStorage.getItem("expires_at"); 

    if(idToken && expiresAt >= Date.now()){ 
      axios.post("http://localhost:5000/modifier", data, config)
        .then(res => {
          console.log("res from mofied", res);
          if(res.status===200) {
            const {nom:n, role:r, friends:f} = res.data
            console.log(n, r, f)
            setNom(n);
            setRole(r);
            setFriends(f);
            setErrText("")
          }
        })
        .catch(err => {
          setErrText(err.response.data.error)
          console.log(err)
          
        })

    } else {
      setErrText("Jeton expiré")
      console.log("Jeton expiré");

    }
  }

  return (<div className='edit-box'>
    <h2>Modifier Profil</h2>
    <form action="" className='edit-form'>
    <label htmlFor="nom">nom</label>
      <input defaultValue={nomAModifier} required onChange={(e) => setNomAModifier(e.target.value)} type="text" id='nom' name='nom' />

      <label htmlFor="select_role">Rôle</label>
      <select value={roleAModifier} required onChange={(e) => setRoleAModifier(e.target.value)} name="select_role" id="select_role">
        <option value="">Options</option>
        <option value="guerrier">Guerrier</option>
        <option value="alchimiste">Alchimiste</option>
        <option value="sorcier">Sorcier</option>
        <option value="espions">Espions</option>
        <option value="enchanteur">Enchanteur</option>
      </select>

      <label htmlFor="password">Mot de passe pour vérification</label>
      <input required onChange={(e) => setPassword(e.target.value)} type="password" id='password' name='password' />
      
      <button disabled={password === "" && nomAModifier === ""} onClick={(e) => soumettreFormulaire(e)} className="sign-btn">Soumettre</button>
      <p className='red-text'>{errText}</p>
    </form>
  </div>)
}

export default EditForm