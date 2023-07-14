import { useForm, SubmitHandler } from 'react-hook-form';
// import "./styles.scss";
import config from '../../../config.json';

interface ContactData {
  userName: string;
  email: string;
  message: string;
  reason: string;
}

export default function ContactForm() {
  const {
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<ContactData>(); 

  const { REACT_APP_SERVER_URL } = config;
  console.log(REACT_APP_SERVER_URL)

  const onSubmit: SubmitHandler<ContactData> = data => console.log(data);

  return (
    <div className='contact-container'>
      <div className='contact-container-background'>
        <h1 className='page-title'>Contact</h1>
    <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className='contact-input-username-label' htmlFor="">Nom d'utilisateur :</label>
        <input
          className="contact-input contact-input-username"
          type="text"
          placeholder="Nom d'utilisateur"
          {...register("userName", {
          })}
        />
        {errors.userName && (
          <ErrorMessage>{errors.userName.message}</ErrorMessage>
        )}
      </div>

      <div>
      <label className='contact-input-email-label' htmlFor="">Adresse Mail :</label>
        <input
          type="email"
          className="contact-input contact-input-email"
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
      </div>

      <div>
        <label className='contact-input-reason-label' htmlFor="">Objet :</label>
        <input
          type="reason"
          className="contact-input contact-input-reason"
          placeholder="Objet de la demande"
          {...register("reason", {
            required: 'Ce champ est obligatoire.'
          })}
        />
        {errors.email && (
          <ErrorMessage>
            {errors.email.message || 'Une erreur est survenue.'}
          </ErrorMessage>
        )}
      </div>

      <div>
        <textarea
          className="contact-input contact-input-message"
          placeholder="Message"
          {...register("message", {
            required: 'Ce champ est obligatoire.', 
            maxLength: 1000 })}
        />
        {errors.message && (
          <ErrorMessage>
            {errors.message.message || 'Une erreur est survenue.'}
          </ErrorMessage>
        )}
      </div>

      <input className="contact-input-button" type="submit" />
    </form>
    </div>
    </div>
  );
}

function ErrorMessage({ children }: { children: React.ReactNode }) {
  return <p className='error-message'>{children}</p>;
}