import { useForm, SubmitHandler } from 'react-hook-form';
import "./styles.scss";

interface ContactData {
    username: string;
    email: string;
    contactReason: string;
    Message: string;
  }

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactData>();
  const onSubmit: SubmitHandler<ContactData> = data => console.log(data);
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" autoComplete='username' placeholder="Nom d'utilisateur" {...register(
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
                 {
              errors.username?.message && (
                <p className='error-message'>{errors.username?.message}</p>
              )
            } 
      <input autoComplete='email' type="email" placeholder="Adresse mail" 
              {...register(
                "email", 
                {required: 'Ce champ est obligatoire.', 
                  maxLength: 64, 
                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                })} />
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
      <select {...register("contactReason")}>
        <option value="Bug/Erreur">Bug/Erreur</option>
        <option value="Autre">Autre</option>
      </select>
      <input type="text" placeholder="Message" {...register("Message", { maxLength: 5000 })} />

      <input type="submit" />
    </form>
  );
}