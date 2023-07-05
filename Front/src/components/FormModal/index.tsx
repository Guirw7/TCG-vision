import { openModal, closeModal, setModalMessage} from './modalSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';



import './styles.scss';


export default function FormModal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const closeModalFunction = () => {
    dispatch(closeModal());
    navigate('/login');
  }
  
  const requestStatus = useSelector((state: any) => state.formModal.message);
  console.log(requestStatus);
  return (
    <>
    <div onClick={closeModalFunction} className='behind-form-modal'>
      <article onClick={(e) => e.stopPropagation()} className = "form-modal">
        <button onClick={(e) => {e.stopPropagation(); closeModalFunction();}} className='form-modal-exit'>X</button>
        {

          requestStatus && (
            <p className='form-modal-message'>{requestStatus}</p>
          )
        }
      </article>
    </div>
    </>
  )
}
