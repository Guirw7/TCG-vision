import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openModal, closeModal } from '../FormModal/modalSlice';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { RootState } from '../../store';
import './styles.scss';


export default function Login() {
  const dispatch = useDispatch();
  const [isSuccessful, setIsSuccessful] = useState<boolean | null >(null);
  const modal = useSelector((state: RootState) => state.formModal.value);
  const { 
    register, 
    handleSubmit,
    setError, // permet de générer des erreur personnalisées
    formState: { errors } 
  } = useForm(
    // {defaultValues : 
    //   {
    //     username: 'kevin',
    //     password: 'LolXd69240',
    //   },
    // }
  );

  const getUser = async (form: any) => {
    try {
      const response = await axios.post(
        'https://daoust-jason-server.eddi.cloud/user/login', {
          username: form.username,
          password: form.password,
        }
      );
      if (response.status === 200) {
        const token = response.data;
        // On split le token pour récupérer le payload qui contient les données d'utilisateur
        const parts = token.split('.');
        let payload = JSON.parse(atob(parts[1]));
        console.log(response);
        // setIsSuccessful(true);
        dispatch(openModal());
        sessionStorage.setItem('jwt', token);
      // On redirige vers la page d'accueil
      };
    } catch (error) {
      console.error(error);
      dispatch(openModal());
      // Logique d'erreur
    };
  };

  return (
    <div className='signin-container'>
      <div className='signin-container-background'>
        <h1 className='page-title'>Connexion</h1>
        <form className="signin-form" onSubmit={handleSubmit((data) => {
          getUser(data);
        })}
            >
          <label className='signin-input-username-label' htmlFor="">Nom d'utilisateur :</label>
          <input className="signin-input-username" type="text" 
            {...register(
              "username", 
              {required: 'Ce champ est obligatoire'})}/>
          <label className='signin-input-password-label' htmlFor="">Mot de passe :</label>
          <input className='signin-input-password' type ="password" id="" 
            {...register(
              "password", 
              {required: 'Ce champ est obligatoire'})}/>
          <input className="signin-input-button" type="submit"/>
          <a className='signin-forgotten-password-message' href="">Mot de passe oublié</a>
          <p className='signup-message'>Pas encore inscrit ?</p>
          <a className='signup-message-link'href="/signup">Inscrivez vous!</a>
        </form>
        {
          (modal) && (
            <h1>hello world</h1>
          )
        }
      </div>
    </div>
  )
};
