import { useState } from 'react';

// import '../Yugioh/Card';
import dragon from '../../../../../../../../kevin/Desktop/91998119.jpg';
import './styles.scss';

export default function Card(singleCard: any) {
  // const [counter, setCounter] = useState(0);
  const data = singleCard.singleCard;


  console.log(data);

  return (
    <article className = "card-modal">
        <h2 className='card-modal-name'>{data.name}</h2>
      <section className='card-modal-informations'>
        <img className="card-modal-image" src={dragon}></img>
        <div className='card-modal-data'>
        <p className='card-modal-type'>Type: {data.type}</p>
        <p className='card-modal-level'>Niveau: {data.level}</p>
        <p className='card-modal-archetype'>Archetype: {data.archetype}</p>
        <p className='card-modal-attribute'>Attribut: {data.attribute}</p>
        <p className='card-modal-stats'>Attaque: {data.atk} Défense: {data.def}</p>
        </div>
      </section>
      <section className='card-modal-description'>
        <p className='card-modal-desc'>{data.desc}</p>
      </section>
      <form action="">
        <section className="card-modal-extension">
          <label className="card-modal-extension-label"htmlFor="">Nom de l'extension</label>
          <select className='card-modal-extension-select'>
            {data.card_sets.map((extension: any) => {
              return (
                <option value={extension.set_name}>{extension.set_name}</option>
              )
            })}
          </select>
        </section>
        <div className='card-modal-buttons'>
          <div>
            <section className='card-modal-quantity'>
              <button className='card-modal-quantity-increment'>-</button>
              <p className='card-modal-quantity-counter'>placeholder</p>
              <button className='card-modal-quantity-decrement'>+</button>
            </section>
          </div>
          <button className='card-modal-submit-button'>Ajouter à la Collection</button>
        </div>
      </form>
    </article>
  )
}
