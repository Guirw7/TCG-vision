

import { openModal, closeModal, setModalFailureMessage, setModalSuccessMessage } from './modalSlice';
import { useSelector, useDispatch } from 'react-redux';


import './styles.scss';




export default function FormModal() {
  
  const dispatch = useDispatch();
  const closeModalFunction = () => {
    dispatch(closeModal());
  }
  
  const requestStatus = useSelector((state: any) => state.formModal.message);
  console.log(requestStatus);
  return (
    <>
    <div onClick={closeModalFunction} className='behind-form-modal'>
      <article onClick={(e) => e.stopPropagation()} className = "from-modal">
        <button onClick={(e) => {e.stopPropagation(); closeModalFunction();}} className='form-modal-exit'>X</button>
        {
          requestStatus && (
            <p>{requestStatus}</p>
          )
        }
      </article>
    </div>
    </>
  )
}
