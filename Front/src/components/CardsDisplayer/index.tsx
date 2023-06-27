import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { openModal, setCardID } from '../CardModal/modalSlice';
// import { loadingChecker }  from '../../utils/loadingScreen';
import { axiosRequest } from '../../utils/axiosRequest';
import Loading from '../Loading';
import './styles.scss';


export default function CardDisplayer() {
  const dispatch = useDispatch();
  const [cards, setCards] = useState<any>(null);
  /**--NOTE IMPORTANTE--*/
  // Le setter ne met pas à jour le state immédiatement, mais déclenche une nouvelle renderisation du composant
  // Il faut donc attendre que le state soit mis à jour pour pouvoir l'utiliser
  // Ou alors boucler sur la data directement
  /**--FIN DE LA NOTE IMPORTANTE--*/
  const url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php?language=fr&fname=magicien';
  useEffect(() => {
    // méthode maison pour les requêtes 😎
    axiosRequest('get', url)
    .then(data => {
      setCards(data.data);
    })
    .catch(error => {
      console.log('Erreur lors de la requête', error);
    });
  }, [url]);

  // Closure 🧐
  const clickHandler = (id: number) => () => { 
    dispatch(setCardID(id));
    dispatch(openModal());
  };

  return (
    <div className='articles-container'>
      {
        cards && (
          cards.map((card: any) => (
            <article className='card-article' onClick={clickHandler(card.id)} key={card.id}>
              <img className='card-article-image' src={`http://daoust-jason-server.eddi.cloud/card_images/${card.id}.jpg`}/>
              <p className='card-article-name'>{card.name}</p>
            </article>
          ))
        )
      }
      {
        !cards && <Loading />
      }
    </div>
  )
};
