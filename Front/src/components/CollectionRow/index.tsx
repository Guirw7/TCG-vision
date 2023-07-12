import { useEffect, useState } from "react"
import { axiosRequest } from '../../utils/axiosRequest';
import './styles.scss';


export default function CollectionRow (set_code: any) {

    const [cardInfo, setCardInfo] = useState<any>(null);

    const url = `https://db.ygoprodeck.com/api/v7/cardsetsinfo.php?setcode=${set_code.set_code}`;

    useEffect(() => {
      axiosRequest('get', url)
      .then(data => {
        setCardInfo(data);
      })
      .catch(error => {
        console.log('Erreur lors de la requête', error);
      });
    }, []);
  



    return (
        cardInfo && (

            <div className="collection-row">
                <section className="collection-row-section">
                    <p>{cardInfo.name}</p>
                </section>
                <section className="collection-row-section">
                    <p>{cardInfo.set_name}</p>
                </section>
                <section className="collection-row-section">
                    <p>{cardInfo.set_rarity}</p>
                </section>
                <section className="collection-row-section">
                    <p>{cardInfo.set_price}$</p>
                </section>
            </div>
                )


    )
}