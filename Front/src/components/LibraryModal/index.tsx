import { closeModal } from './librarySlice';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { getIDFromToken } from '../../utils/getIDFromToken';
import { axiosRequest } from '../../utils/axiosRequest';
import './styles.scss';


export interface DeckProps {
  deckName: string;
  description: string | undefined;
}

export interface CollectionProps {
  collection_name: string,
  set_code: string,
  quantity: number,
  user_id: string | number,
}

export default function LibraryModal() {
  const dispatch = useDispatch();

  const closeModalFunction = () => {
    dispatch(closeModal());
  };
  const { register, handleSubmit, formState: { errors } } = useForm();


  /*
  const createCollection = (data: any) => {

    const route = 'collection';
    const id = getIDFromToken();
    console.log(id);
    const url = `http://daoust-jason-server.eddi.cloud/private/${route}`;
    axiosRequest('post', url, {
      data: {
        collection_name: data.collection_name, // Obligatoire
        user_id: id,
        set_code: '', //Facultatif
        quantity: 0, //Facultatif
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
      console.log('data : ', data);
      console.log('Erreur lors de la requête', error);
    });
  };
  */

  const createDeck = async (data: DeckProps) => {
    const id = getIDFromToken();
    const route = 'deck';
    const url = `https://daoust-jason-server.eddi.cloud/private/${route}`;
    axiosRequest('post', url, {
      data: {
        deck_name: data.deckName, // Obligatoire
        deck_description: data.description, //Facultatif
        set_code: ['hzgebygvbzi', 'hzbeifegzinfugbzkbfhkzhebfz'],
        user_id: id,// Obligatoire
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
      console.log(data);
      console.log('Erreur lors de la requête', error);
    });
  };

  /*
  ⚠️⚠️⚠️
  Gérer les erreurs de remplissage du formulaire ⚠️
  ⚠️⚠️⚠️
  */

  const onSubmit = (data: any) => {
    // La méthode ne retourne rien si le formulaire n'est pas valide
    createDeck(data);
  };
    // La méthode renvoie dans tous les cas un objet d'erreurs qui est vide s'il n'y en pas
    console.log('error :', errors);


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
