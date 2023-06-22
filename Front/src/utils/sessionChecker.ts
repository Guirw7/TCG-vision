import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setStatus } from '../components/App/sessionSlice';

export const sessionChecker = async () => {
  const dispatch = useDispatch();
  const token: string | null = sessionStorage.getItem('jwt');
  // Utile pour tester le cas où le token est invalide
  const troll: string | null = token + 'troll';
  
  if (token) {
    try {
      const response = await axios.get('http://daoust-jason-server.eddi.cloud/profil', {
        headers: {'Authorization': `Bearer ${token}`},
      });
      if (response.status === 200) {
        dispatch(setStatus(true))
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(false));
    }
  };
  if (!token) {
    dispatch(setStatus(false));
  };
};
