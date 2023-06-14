import { useForm } from 'react-hook-form';

import './styles.scss';

// const { 
//   register, 
//   handleSubmit,
//   // permet de générer des erreurs personnalisées
//   // setError,
//   // watch, 
//   // clearErrors, 
//   formState: { errors } 
// } = useForm<any>(
//   {defaultValues : 
//     {
//       // username: 'kevin',
//       // mail: 'kk@k.com',
//       // password: 'LolXd69240',
//       // passwordConfirmation: 'LolXd69240',
//     },
//   }
// );

export default function SignIn() {

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
    {defaultValues : 
      {
        username: 'kevin',
        password: 'LolXd69240',
      },
    }
  );

  return (
    <div className='signin-container'>
      <div className='signin-container-background'>
        <h1 className='page-title'>Connexion</h1>
        <form className="signin-form" onSubmit={handleSubmit((data) => {
          console.log(data);
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

      </div>
    </div>
  )
};
