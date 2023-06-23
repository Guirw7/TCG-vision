import { closeModal } from './librarySlice';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import './styles.scss';


export default function LibraryModal() {
  const dispatch = useDispatch();

  const closeModalFunction = () => {
    dispatch(closeModal());
  };

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };
  console.log(errors);

  return (
    <>
      <div onClick={closeModalFunction} className='behind-library-modal'>
        <article onClick={(e) => e.stopPropagation()} className = "library-modal">
          <button onClick={(e) => {e.stopPropagation(); closeModalFunction();}} className='library-modal-exit'>X</button>
          <form className='library-modal-form' onSubmit={handleSubmit(onSubmit)}>
            <input className='library-modal-form-name' type="text" placeholder="Nom du Deck" {...register("Nom du Deck", {required: true, maxLength: 32})} />
            <input className='library-modal-form-description' type="text" placeholder="Description" {...register("Description", { maxLength: 280})} />
            <input className='library-modal-form-button' type="submit" />
          </form>
        </article>
      </div>
    </>
  )
}
