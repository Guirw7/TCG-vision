import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { openModal, setCardID } from '../CardModal/modalSlice';
import './styles.scss';


export default function Collection() {


  // const dispatch = useDispatch();
  // const [cards, setCards] = useState<any>(null);


  // useEffect(() => {
  //   const fetchCards = async () => {
  //     const response = await axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?format=Speed Duel&language=fr');
  //     const data = await response.data;
  //     if (data) {
  //       await setCards(data.data);
  //     }
  //   };
  //   fetchCards();
  // }, []);



  // const clickHandler = (id: number) => () => { 
  //   dispatch(setCardID(id));
  //   dispatch(openModal());
  // };


  return (
    

  )
};