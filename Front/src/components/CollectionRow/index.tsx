import { useEffect, useState } from "react"
import { axiosRequest } from '../../utils/axiosRequest';
import './styles.scss';
import { getIDFromToken } from "../../utils/getIDFromToken";
import { set } from "react-hook-form";

export default function CollectionRow ({set_code, collectionID, userCollection, setRefresh}: any) {

    const [cardInfo, setCardInfo] = useState<any>(null);
    const [selectedCard, setSelectedCard] = useState<any>(null);
    const [newCollection, setNewCollection] = useState<any>([]);

    const url = `https://db.ygoprodeck.com/api/v7/cardsetsinfo.php?setcode=${set_code}`;

    useEffect(() => {
      axiosRequest('get', url)
      .then(data => {
        setCardInfo(data);
        setNewCollection(userCollection);
      })
      .catch(error => {
        console.log('Erreur lors de la requête', error);
      });
    }, [newCollection]);
  
    const handleDelete = () => {
        const index = newCollection.indexOf(set_code);
            if (index !== -1) {
                const updatedCollection = [...newCollection];
                updatedCollection.splice(index, 1);
                setNewCollection(updatedCollection);
                updateCollection(newCollection);
                setRefresh(true);
            }
    }

    const updateCollection = async (data: string[]) => {
        const id = getIDFromToken();
        const route = `collection/${collectionID}`;
        const url = `https://daoust-jason-server.eddi.cloud/private/${route}`;
        axiosRequest('put', url, {
            data: {
            set_code: data,
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
            console.log(data);
        });
        };


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
                <button onClick={handleDelete}>Delete</button>
            </div>
                )


    )
}