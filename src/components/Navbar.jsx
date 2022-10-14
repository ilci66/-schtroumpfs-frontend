import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const disconnect = () => {
    sessionStorage.removeItem('expires_at')
    sessionStorage.removeItem('id_token')

    window.location = '/sign-in'
  }

  return (
    <nav className='navbar'>
      <Link to="/">Home</Link>
      <ul className='navbar__ul'>
        <li><Link to="/sign-in">Se Connecter</Link></li>
        <li><Link to="/sign-up">S'inscrire</Link></li>
        <li><button onClick={disconnect} className='dc-btn'>Déconnecter</button></li>
      </ul>
    </nav>
  )
}

export default Navbar