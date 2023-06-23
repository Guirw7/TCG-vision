import { closeModal } from './librarySlice';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { axiosRequest } from '../../utils/axiosRequest';
import './styles.scss';


export interface DataProps {
  deckName: string;
  description: string | undefined;
}

export default function LibraryModal() {
  const dispatch = useDispatch();

  const closeModalFunction = () => {
    dispatch(closeModal());
  };

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data: any) => {
    // La méthode ne retourne si le forumlaire n'est pas valide
    createDeck(data);
  };
    // La méthode renvoie dans tous les cas un objet d'erreurs qui est vide s'il n'y en pas
    console.log('error :', errors);


  const createDeck = async (data: DataProps) => {
    const route = 'deck';
    const url = `http://daoust-jason-server.eddi.cloud/${route}`;
    axiosRequest('post', url, {
      data: {
        deck_name: data.deckName, // Obligatoire
        deck_description: data.description, //Facultatif
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
      },
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.log('Erreur lors de la requête', error);
    });
  };

  /*
  ⚠️⚠️⚠️
  Gérer les erreurs de remplissage du formulaire ⚠️
  ⚠️⚠️⚠️
  */

  return (
    <>
      <div onClick={closeModalFunction} className='behind-library-modal'>
        <article onClick={(e) => e.stopPropagation()} className = "library-modal">
          <button onClick={(e) => {e.stopPropagation(); closeModalFunction();}} className='library-modal-exit'>X</button>
          <form className='library-modal-form' onSubmit={handleSubmit(onSubmit)}>
            <label>Nom du deck :</label>
            <input className='library-modal-form-name' type="text" placeholder="Nom du Deck" {...register("deckName", {required: true, minLength: 4, maxLength: 32})} />
            <label>Description :</label>
            <textarea className='library-modal-form-description' placeholder="Description" {...register("description", { maxLength: 280})} />
            <input className='library-modal-form-button' type="submit" />
          </form>
        </article>
      </div>
    </>
  )
};
