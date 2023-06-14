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
  return (
    <div className='signin-container'>
      <div className='signin-container-background'>
        <h1 className='page-title'>Connexion</h1>
        <form className="signup-form"
            >
          <label htmlFor="">Nom d'utilisateur</label>
          <input type="text" />
          <label htmlFor="">Mot de passe</label>
          <input type="password" name="" id="" />
          <button>Se connecter</button>
        </form>
      </div>
    </div>
  )
};
