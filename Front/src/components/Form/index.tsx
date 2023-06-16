import { useDispatch } from 'react-redux';

import { openModal, closeModal } from './modalSlice';

import './styles.scss';

export default function FormModal(queryResult: any) {
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
          queryResult && (
            // gérer le message avec un slice Redux
            <p>hello world</p>
          )
        }

      </article>
    </div>
    </>
  )
}
