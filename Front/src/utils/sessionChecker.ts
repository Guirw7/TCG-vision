import { useDispatch } from 'react-redux';
import { setStatus } from '../components/App/sessionSlice';
import { axiosRequest } from './axiosRequest';


export const sessionChecker = async () => {
  const dispatch = useDispatch();
  const token: string | null = sessionStorage.getItem('jwt');
  // Utile pour tester le cas où le token est invalide
  // const troll: string | null = token + 'troll';
  
  if (token) {
    await axiosRequest('get', 'http://daoust-jason-server.eddi.cloud/private/profil', {
      headers: {'Authorization': `Bearer ${token}`},
    });
  };
  if (!token) {
    dispatch(setStatus(false));
  };
};
