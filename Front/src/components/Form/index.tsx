

import { openModal, closeModal } from './modalSlice';
import { useSelector, useDispatch } from 'react-redux';


import './styles.scss';

interface FormModalProps {
  isSuccessfull: any;
  setIsFormSubmitted: any;
}

export default function FormModal({isSuccessfull, setIsFormSubmitted }: FormModalProps) {
  
  const dispatch = useDispatch();
  const closeModalFunction = () => {
    dispatch(closeModal());
    setIsFormSubmitted(false);
  }
  return (
    <>
    <div className='behind-form-modal'>
      <article onClick={(e) => e.stopPropagation()} className = "from-modal">
        <button onClick={(e) => {e.stopPropagation(); closeModalFunction();}} className='form-modal-exit'>X</button>
        
        {/* Conditionnel de message par ici */}
        
        {/* {
          isSuccessfull === false && (
            <p>échec de la requête</p>
          )
        }
        {
          isSuccessfull === true && (
            <p>c'est good</p>
        )} */}

        
      </article>
    </div>
    </>
  )
}
