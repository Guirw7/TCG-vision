import { useDispatch } from 'react-redux';

import { openModal, closeModal } from './modalSlice';

import './styles.scss';

export default function FormModal(queryResult: boolean) {
  const dispatch = useDispatch();
  const closeModalFunction = () => {
    dispatch(closeModal());
  }
  return (
    <>
    <div className='behind-form-modal'>
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
