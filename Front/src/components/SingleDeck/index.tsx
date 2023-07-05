import './styles.scss';

export default function SingleDeck(deck: any) {
    return (

        <>
        <div className='single-deck-container'>
            <h1 className='single-deck-title'>{deck.deck.deck_name}</h1>
            <div className='single-deck-image-container'>
                <img src="https://images.ygoprodeck.com/images/cards_cropped/1861629.jpg" alt="" />
            </div>
            <div className='single-deck-description-container'>
                <p className='single-deck-description'>{deck.deck.deck_description}</p>
            </div>
        </div>
        </>
    );
}