import { useState } from 'react';
import { useForm } from 'react-hook-form';
// import CryptoJS from 'crypto-js';


import './styles.scss';

interface Data {
  username: string;
  mail: string; 
  password: string;
  passwordConfirmation: string;
}

export default function SignUp() {
  
  // const [username, setUsername] = useState<any>('');
  // const [userEmail, setUserEmail] = useState<any>('');
  // const [userEmailConfirm, setUserEmailConfirm] = useState<any>('');

  // On importe ici toutes les dépendances de react-hook-form:
  const { 
    register, 
    handleSubmit, 
    // watch, 
    // clearErrors, 
    formState: { errors } 
  } = useForm<Data>({defaultValues : 
  {
    username: '',
    mail: '',
    password: '',
    passwordConfirmation: ''
  }});
  // const onSubmit = (data: Data) => console.log(data);
  console.log(errors);
  // Permet de voir les inputs en temps réel
  // console.log(watch("password"));

  return (
    <div className='signup-container'>
      <div className='signup-container-background'>
        <h1 className='page-title'>Création de compte</h1>
          <form className="signup-form" onSubmit={handleSubmit((data) => {console.log(data)})}>
            <input autoComplete='username' className="signup-input-username" type="text" placeholder="Nom d'utilisateur" 
              {...register(
                "username", 
                {required: 'Ce champ est obligatoire', 
                minLength: 4, 
                maxLength: 16
                })} />
            <p className='test'>{errors.username?.message}</p>
            <input autoComplete='email' className="signup-input-email" type="email" placeholder="Adresse mail" 
              {...register(
                "mail", 
                {required: 'Ce champ est obligatoire', 
                  maxLength: 64, 
                  pattern: /^\S+@\S+$/i
                })} />
            <input autoComplete='off' className="signup-input-password" type="password" placeholder="Mot de passe"
            {...register(
              "password", 
              {required: 'Ce champ est obligatoire', 
              maxLength: 32, 
              pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,32}$/i
              })} 
            />
            <input autoComplete='off' className="signup-input-password-confirm" type="password" placeholder="Confirmez votre mot de passe" 
              {...register("passwordConfirmation", 
              {maxLength: 32, 
              pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,32}$/i
              })} />
            <input className="signup-input-button" type="submit" />
          </form>
        </div>
      </div>
  );
} 