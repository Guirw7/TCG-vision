import { useState, useEffect } from 'react';
import axios from 'axios';

import './styles.scss';

export default function CardDisplayer() {
  //https://db.ygoprodeck.com/api/v7/cardinfo.php?language=fr&fname=yeux%20bleus
  const [cards, setCards] = useState<any>(null);
  /**-- Axios --**/

  useEffect(() => {

    const fetchCards = async () => {
      const response = await axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?language=fr&fname=yeux%20bleus');
      const data = await response.data;
      if (data) {
        await setCards(data.data);
        /**--NOTE IMPORTANTE--*/
        // Le setter ne met pas à jour le state immédiatement, mais déclenche une nouvelle renderisation du composant
        // Il faut donc attendre que le state soit mis à jour pour pouvoir l'utiliser
        // Ou alors boucler sur la data directement
        /**--FIN DE LA NOTE IMPORTANTE--*/
        data.data.forEach((card: any) => {
          console.log(card);
        })
      }
      // Faire une gestion d'erreur :P
    };
    fetchCards();
  }, []);

  return (
    <p>slt</p>
  )
};
