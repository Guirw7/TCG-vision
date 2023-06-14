import "./styles.scss";
import { useForm, SubmitHandler } from 'react-hook-form';

type FormData = {
  email: string;
};

export default function PasswordReset() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);

  return (
    <div className='password_reset-container'>
        <div className='password_reset-container-background'>
        <h1 className='page-title'>Mot de Passe oublié</h1>
      <form className="password_reset-form" onSubmit={handleSubmit(onSubmit)}>
        <label className='password_reset-input-email-label' htmlFor="">Adresse Mail :</label>
        <input
          type="email"
          className="password_reset-input-email"
          autoComplete="email"
          placeholder="Adresse mail"
          {...register("email", {
            required: 'Ce champ est obligatoire.',
            maxLength: {
              value: 64,
              message: 'Votre adresse mail ne peut pas dépasser 64 caractères.',
            },
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
              message: 'Le format de l\'adresse mail est incorrect.',
            },
          })}
        />
        {errors.email && (
          <ErrorMessage>
            {errors.email.message || 'Une erreur est survenue.'}
          </ErrorMessage>
        )}
        <input className="password_reset-input-button" type="submit" />
      </form>
      </div>
    </div>
  );
}

function ErrorMessage({ children }: { children: React.ReactNode }) {
  return <p className='error-message'>{children}</p>;
}