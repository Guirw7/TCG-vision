import { setSingleCollection } from '../SingleCollection/singleCollectionSlice';
import { RootState } from "../../store";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'



export default function SingleCollection(collection: any) {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const viewCollection = (event: any) => {
      dispatch(setSingleCollection(collection.collection.id))
      navigate('/collection');
  };
    
    return(
        <div className='single-deck-container'>
        <h1 className='single-deck-title'>{collection.collection_name}</h1>
        <div className='single-deck-image-container'>
          <img src="https://images.ygoprodeck.com/images/cards_cropped/89631139.jpg" alt="" />
        </div>
        <div className='single-deck-description-container'>
        </div>
        <div className='single-deck-actions-container'>
            <button onClick={viewCollection} className='single-deck-actions-item'>Voir</button>
        </div>
      </div>
    )
}