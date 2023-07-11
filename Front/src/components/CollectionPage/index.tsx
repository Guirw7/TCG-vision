import { useSelector } from "react-redux";
import { RootState } from '../../store';

import Collection from "../Collections"
import CardModal from "../CardModal"

export default function CollectionPage() {

    const modal = useSelector((state: RootState) => state.cardModal.value);



    return (
        <div className='game-container'>
          <div className="game-container-background">
            <h1 className="game-title">Collection</h1>
            <Collection />
            {
              (modal && <CardModal/>)
            }
          </div>
        </div>
      )
    };
