export default function SingleCollection(collection: any) {

    
    return(
        <div className='single-deck-container'>
        <h1 className='single-deck-title'>{collection.collection_name}</h1>
        <div className='single-deck-image-container'>
          <img src="https://images.ygoprodeck.com/images/cards_cropped/89631139.jpg" alt="" />
        </div>
        <div className='single-deck-description-container'>
          {/* <p className='single-deck-description'>{collection.deck_description}</p> */}
        </div>
        <div className='single-deck-actions-container'>
            <button className='single-deck-actions-item'>Voir</button>
        {/* {user.id === collection.user_id && (
            <>
            <button onClick={deckEditor} className='single-deck-actions-item'>Éditer</button>
            <button onClick={openConfirmModal} className='single-deck-actions-item'>Supprimer</button>
            </>
        )} */}
        </div>
      </div>
    )
}