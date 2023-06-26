import { closeModal } from './librarySlice';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

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

  const decodeToken = (token: any) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    const jsonObject = JSON.parse(jsonPayload);
    const id = jsonObject.data.id;
    return id;
  };

  const { register, handleSubmit, formState: { errors } } = useForm();


  const createCollection = (data: any) => {
        // On récupère l'ID de l'utilisateur connecté depuis le sessionStorage
    // On envoie la requête à l'API
    let token = sessionStorage.getItem('jwt');
    // decodeToken(token);
    const route = 'collection';
    const testID = decodeToken(token);
    const url = `http://daoust-jason-server.eddi.cloud/private/${route}`;
    axiosRequest('post', url, {
      data: {
        collection_name: data.collection_name, // Obligatoire
        user_id: testID,
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

  const createDeck = async (data: DeckProps) => {
    // On récupère l'ID de l'utilisateur connecté depuis le sessionStorage
    // On envoie la requête à l'API
    let token = sessionStorage.getItem('jwt');
    const route = 'deck';
    const url = `http://daoust-jason-server.eddi.cloud/private/${route}`;
    axiosRequest('post', url, {
      data: {
        deck_name: data.deckName, // Obligatoire
        deck_description: data.description, //Facultatif
        // user_id:,// Obligatoire
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

  const onSubmit = (data: any) => {
    // La méthode ne retourne si le forumlaire n'est pas valide
    createCollection(data);
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
            <input className='library-modal-form-name' type="text" placeholder="Nom du Deck" {...register("collection_name", {required: true, minLength: 4, maxLength: 32})} />
            {/* <label>Description :</label>
            <textarea className='library-modal-form-description' placeholder="Description" {...register("description", { maxLength: 280})} /> */}
            <input className='library-modal-form-button' type="submit" />
          </form>
        </article>
      </div>
    </>
  )
};
