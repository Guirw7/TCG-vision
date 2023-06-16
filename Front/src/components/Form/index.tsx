

import { openModal, closeModal } from './modalSlice';
import { useSelector, useDispatch } from 'react-redux';


import './styles.scss';

interface FormModalProps {
  isSuccessfull: any;
  setIsFormSubmitted: any;
}

export default function FormModal(queryResult: any) {
  
  const dispatch = useDispatch();
  const closeModalFunction = () => {
    dispatch(closeModal());
  }


  return (
    <>
    <div onClick={closeModalFunction} className='behind-form-modal'>
      <article onClick={(e) => e.stopPropagation()} className = "from-modal">
        <button onClick={(e) => {e.stopPropagation(); closeModalFunction();}} className='form-modal-exit'>X</button>
        {
          !queryResult && (
            <p>échec de la requête</p>
          )
        }
        {
          queryResult && (
            <p>c'est good</p>
        )}
      </article>
    </div>
    </>
  )
}
