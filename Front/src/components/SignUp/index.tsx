import { set, useForm } from 'react-hook-form';
import axios from 'axios';
// import CryptoJS from 'crypto-js';
import { useSelector, useDispatch } from 'react-redux';
import FormModal from '../FormModal';
import { openModal, setModalMessage } from '../FormModal/modalSlice';
// import { useState } from 'react';

import './styles.scss';

interface Data {
  username: string;
  email: string; 
  password: string;
  passwordConfirmation: string;
}

export default function SignUp() {
  // On importe ici toutes les dépendances de react-hook-form:
  const { 
    register, 
    handleSubmit,
    // permet de générer des erreurs personnalisées
    setError,
    // watch, 
    // clearErrors, 
    formState: { errors } 
  } = useForm<Data>(
    // {defaultValues : 
    //   {
    //     username: 'kevin',
    //     mail: 'kk@k.com',
    //     password: 'LolXd69240',
    //     passwordConfirmation: 'LolXd69240',
    //   },
    // }
  );

  // const [queryResult, setQueryResult] = useState<boolean | null >(null);
  const modal = useSelector((state: RootState) => state.formModal.value);
  const dispatch = useDispatch();
  // const querySuccess = {
  //   message: 'Votre compte a bien été créé.',
  // }
  // const queryFailure = {
  //   message: 'Une erreur est survenue, veuillez réessayer ultérieurement.',
  // }
  
  // Créé un objet contenant les erreurs, est vide s'il n'y a pas d'erreurs
  // console.log(errors);
  // Permet de voir les inputs en temps réel
  // console.log(watch("password"));

  return (
    <div className='signup-container'>
      <div className='signup-container-background'>
        <h1 className='page-title'>Création de compte</h1>
          {/* onSubmit gère la soumission du formulaire */}
          <form className="signup-form" onSubmit={handleSubmit((data) => {
            // console.log(data);
            // On vérifie que les mots de passe correspondent :
            if (data.password !== data.passwordConfirmation) {
              setError('passwordConfirmation', {
                type: 'custom',
                message: 'Les mots de passe ne correspondent pas.',
              });
            };
            if (data.password === data.passwordConfirmation) {
              // On peut crypter le mot de passe ici
              // On envoie les données au back
              axios.post(
                'https://daoust-jason-server.eddi.cloud/user/signup', {
                email: data.email,
                username: data.username,
                password: data.password,
              })
              .then(function (response) {
                // setQueryResult(true);
                dispatch(setModalMessage('Votre compte a bien été créé.'));
                // console.log(response);
                dispatch(openModal());
              })
              .catch(function (error) {
                // setQueryResult(false);
                dispatch(setModalMessage('Une erreur est survenue, veuillez réessayer ultérieurement.'));
                // console.log(error);
                dispatch(openModal());

              });
            };
          })}
            >
            <label className='signup-input-username-label' htmlFor="">Nom d'utilisateur :</label>
            <input autoComplete='username' className="signup-input-username" type="text" placeholder="Nom d'utilisateur"
              // Méthode de react-hook form:
              {...register(
                "username", 
                {required: 'Ce champ est obligatoire', 
                minLength: {
                  value: 4, 
                  message: 'Votre nom d\'utilisateur doit contenir entre 4 et 16 caractères.',
                },
                maxLength: {
                  value: 16,
                  message: 'Votre nom d\'utilisateur doit contenir entre 4 et 16 caractères.',
                },
                })} />
            {/* Message d'erreur à placer à l'endroit désiré: */}
            {
              errors.username?.message && (
                <p className='error-message'>{errors.username?.message}</p>
              )
            }
            <label className="signup-input-email-label" htmlFor="">Adresse mail :</label>
            <input autoComplete='email' className="signup-input-email" type="email" placeholder="Adresse mail" 
              {...register(
                "email", 
                {required: 'Ce champ est obligatoire.', 
                  maxLength: 64, 
                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                })} />
                {/* <p className='error-message'>{errors.mail?.message}</p>
                {errors.mail && errors.mail.type === 'pattern' && (
                <p className='error-message'>Le format de l'adresse mail est incorrect.</p>)
                } */}
                {
                  errors.email?.message && (
                    <p className='error-message'>{errors.email?.message}</p>
                  )
                }
                {
                  errors.email && errors.email.type === 'pattern' && (
                    <p className='error-message'>Le format de l'adresse mail est incorrect.</p>
                  )
                }
            <label className='signup-input-password-label' htmlFor="">Mot de passe :</label>
            <input autoComplete='off' className="signup-input-password" type="password" placeholder="Mot de passe"
            {...register(
              "password", 
              {required: 'Ce champ est obligatoire.', 
              minLength: {
                value: 8,
                message: 'Votre mot de passe doit contenir entre 8 et 32 caractères.',
              },
              maxLength: {
                value: 32,
                message: 'Votre mot de passe doit contenir entre 8 et 32 caractères.',
              }, 
              pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-z]{8,}$/i
              })} 
            />
            {errors.password && errors.password.type === 'required' && (
              <p className='error-message'>Le mot de passe est obligatoire.</p>)
            }
            <label className='signup-input-password-confirm-label' htmlFor="">Confirmez votre mot de passe :</label>
            <input autoComplete='off' className="signup-input-password-confirm" type="password" placeholder="Confirmez votre mot de passe" 
              {...register(
                "passwordConfirmation", {
                  required: 'Veuillez confirmer votre mot de passe.',
                }
              )}
              />
              {
                errors.passwordConfirmation && (
                <p className='error-message'>{errors.passwordConfirmation.message}</p>
                )
              }
            <input className="signup-input-button" type="submit"/>
          </form>
          {
            (modal) && (
              <FormModal />
            )
          }
        </div>
      </div>
  );
} 