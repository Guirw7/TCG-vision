import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openModal, closeModal } from '../FormModal/modalSlice';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { RootState } from '../../store';
import { storeToken, storeID, storeUsername } from '../App/sessionSlice';
import './styles.scss';


export default function Login() {
  const dispatch = useDispatch();
  const [isSuccessful, setIsSuccessful] = useState<boolean | null >(null);
  const modal = useSelector((state: RootState) => state.formModal.value);

  /* Logique ici : */
  const { 
    register, 
    handleSubmit,
    // permet de générer des erreurs personnalisées
    setError,
    // watch, 
    // clearErrors, 
    formState: { errors } 
  } = useForm(
    // {defaultValues : 
    //   {
    //     username: 'kevin',
    //     password: 'LolXd69240',
    //   },
    // }
  );

  /*-- Actualiser les noms de classe pour match avec 'Login' --*/

  // const checkToken = async (token: string) => {
  //   const response = fetch('https://daoust-jason-server.eddi.cloud/1', { //404 ? :'(
  //     method: 'POST',
  //   });
  //   await response;
  // };

  const getUser = async (form: any) => {
      const response = await axios.post(
        'https://daoust-jason-server.eddi.cloud/user/login', {
          username: form.username,
          password: form.password,
        }
      );
      if (response.status === 200) {
        const token: string = response.data;
        // On split le token pour récupérer le payload qui contient les données d'utilisateur
        const parts = token.split('.');
        let payload = JSON.parse(atob(parts[1]));
        console.log(payload, token);
        // Dispatch de l'action pour stocker le token dans le store
        dispatch(storeToken(token));


        // setIsSuccessful(true);
        // dispatch(openModal());

        // Copier le code de Raf ici
      };
      // Si c'est good, on affiche la modale de succès

      
      // On redirige vers la page d'accueil
      // Si c'est pas good, on affiche la modale d'erreur

  };

  const testConnection = async () => {
    const response = await axios.get(
      'http://daoust-jason-server.eddi.cloud/profil', 
      /* Exemple de gestion avec JWT :P
      {
        headers: {
          // Gestion du token dans le header de la requête
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      },
      */
    );
    console.log(response);
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
        {
          (!modal) && (
            <h1>pas de hello world</h1>
          )
        }
        <button onClick={testConnection}>SALUT</button>
      </div>
    </div>
  )
};
