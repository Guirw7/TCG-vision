import { useSelector } from "react-redux";
import { RootState } from '../../store';

import Collection from "../Collections"
import CardModal from "../CardModal"

export default function CollectionPage() {

    const modal = useSelector((state: RootState) => state.cardModal.value);



    return (
          <>
            <Collection />
            {
              (modal && <CardModal/>)
            }

          </>
      )
    };
