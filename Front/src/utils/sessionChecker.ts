import { useDispatch } from 'react-redux';
import { setStatus } from '../components/App/sessionSlice';
import { axiosRequest } from './axiosRequest';


export const sessionChecker = async () => {
  const dispatch = useDispatch();
  const token: string | null = sessionStorage.getItem('jwt');
  // Utile pour tester le cas où le token est invalide
  // const troll: string | null = token + 'troll';
  
    await axiosRequest('get', 'http://daoust-jason-server.eddi.cloud/private/profil', {
      headers: {'Authorization': `Bearer ${token}`},
    })
    .then((response) => {
      if (response.status === 200) {
        console.log(response);
        dispatch(setStatus(true));
      };
    });
};

