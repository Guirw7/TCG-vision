import { useDispatch } from 'react-redux';
import { setLoadingOff, setLoadingOn } from '../components/Loading/loadingSlice';

export const loadingChecker = async (response: any) => {
  // const dispatch = useDispatch();
  try {
    if (response.status === 200) {
      console.log(response.status);
      console.log('good');
    }
  } catch (error) {
    console.log(error);
    console.log("c'est pas good");
  };
};
