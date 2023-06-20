import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { openModal, setCardID } from '../CardModal/modalSlice';
import './styles.scss';


export default function CardDisplayer() {
  const dispatch = useDispatch();
  const [cards, setCards] = useState<any>(null);
  useEffect(() => {
    const fetchCards = async () => {
      // Ici on se sert du thème des 'yeux bleus'
      const response = await axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?language=fr&fname=yeux%20bleus');
      const data = await response.data;
      if (data) {
        await setCards(data.data);
        /**--NOTE IMPORTANTE--*/
        // Le setter ne met pas à jour le state immédiatement, mais déclenche une nouvelle renderisation du composant
        // Il faut donc attendre que le state soit mis à jour pour pouvoir l'utiliser
        // Ou alors boucler sur la data directement
        /**--FIN DE LA NOTE IMPORTANTE--*/
      }
      // Faire une gestion d'erreur :P
    };
    fetchCards();
  }, []);

  // Closure 🧐
  const clickHandler = (id: number) => () => { 
    dispatch(setCardID(id));
    dispatch(openModal());
  };
/*
  return (
    <ul>
      {
        cards && (
          cards.map((card: any) => (
            <li key={card.id}>
              <button onClick={clickHandler(card.id)} >{card.name}</button>
            </li>
          ))
        )
      }
    </ul>
  )
  */
  return (
    <div>
      {
        cards && (
          cards.map((card: any) => (
            <article key={card.id}>
              <p>{card.name}</p>
            </article>
          ))
        )
      }
    </div>

  )
};
