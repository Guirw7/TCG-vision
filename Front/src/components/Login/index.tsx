import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { openModal, closeModal, setModalMessage } from '../FormModal/modalSlice';
import LoginModal from '../LoginModal';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";

import { RootState } from '../../store';
import { axiosRequest } from '../../utils/axiosRequest';
import './styles.scss';


export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isConnected = useSelector((state: any) => state.session.status);
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

  const getUser = (form: any) => {
    axiosRequest('post', 'https://daoust-jason-server.eddi.cloud/user/login', {
      data: {
        username: form.username,
        password: form.password,
      },
    })
    .then(data => {
      sessionStorage.setItem('jwt', data);
      dispatch(openModal());
    })
    .catch(error => {
      console.log('Erreur lors de la requête', error);
    });
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
              <LoginModal />
            )
          }
      </div>
    </div>
  );
};
