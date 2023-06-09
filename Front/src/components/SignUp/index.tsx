import { useState } from 'react';

import './styles.scss';

export default function SignUp() {
  const [username, setUsername] = useState<any>('');
  const [email, setEmail] = useState<any>('');
  const [emailConfirm, setEmailConfirm] = useState<any>('');
  const [password, setPassword] = useState<any>('');
  const [passwordConfirm, setPasswordConfirm] = useState<any>('');

  const handleSubmit = (e: any) => {
    console.log(
      username.target.value, 
      email.target.value, 
      emailConfirm.target.value, 
      password.target.value, 
      passwordConfirm.target.value
      );
    e.preventDefault();
  }

  // Faire des vérifications sur les inputs :

  // Vérifier que le username soit valide

  // Vérifier que l'email soit valide
  // Vérifier que les deux emails soient identiques
  // Vérifier que les deux mots de passe soient identiques

  // Vérifier que le mot de passe contienne au moins 8 caractères
  // Vérifier que le mot de passe contienne au moins une majuscule
  // Vérifier que le mot de passe contienne au moins un chiffre
  // Vérifier que le mot de passe contienne au moins un caractère spécial

  return(
    <div className='signup-container'>
      <div className='signup-container-background'>
        <h1 className='page-title'>Se connecter</h1>
        <form className="signup-form" action="">
          <input className="signup-input-username" type="text" onChange={setUsername} placeholder="Username"/>
          <input className="signup-input-email" type="email" onChange={setEmail} placeholder="Email"/>
          <input className="signup-input-email-confirm" type="email" onChange={setEmailConfirm} placeholder="Confirm Email" />
          <input className="signup-input-password" type="password" onChange={setPassword} placeholder="Password"/>
          <input className="signup-input-password-confirm" type="password" onChange={setPasswordConfirm} placeholder="Confirm Password" />
          <button className="signup-input-button" type="submit" onClick={handleSubmit}>Sign Up</button>
        </form>
      </div>
    </div>

  )
} 