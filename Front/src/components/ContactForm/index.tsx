import { useForm, SubmitHandler } from 'react-hook-form';
import "./styles.scss";

interface ContactData {
  username: string;
  email: string;
  contactReason: string;
  Message: string;
}

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ContactData>();

  const onSubmit: SubmitHandler<ContactData> = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          type="text"
          autoComplete="username"
          placeholder="Nom d'utilisateur"
          {...register("username", {
            required: 'Ce champ est obligatoire',
            minLength: {
              value: 4,
              message: 'Votre nom d\'utilisateur doit contenir entre 4 et 16 caractères.',
            },
            maxLength: {
              value: 16,
              message: 'Votre nom d\'utilisateur doit contenir entre 4 et 16 caractères.',
            },
          })}
        />
        {errors.username && (
          <ErrorMessage>{errors.username.message}</ErrorMessage>
        )}
      </div>

      <div>
        <input
          type="email"
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

      <select {...register("contactReason")}>
        <option value="Bug/Erreur">Bug/Erreur</option>
        <option value="Autre">Autre</option>
      </select>

      <div>
        <input
          type="text"
          placeholder="Message"
          {...register("Message", { maxLength: 5000 })}
        />
      </div>

      <input type="submit" />
    </form>
  );
}

function ErrorMessage({ children }: { children: React.ReactNode }) {
  return <p className='error-message'>{children}</p>;
}