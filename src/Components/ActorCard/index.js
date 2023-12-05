import './ActorCard.css';

function ActorCard ({name, image}) {
    return(
        <div className='actor_card_container'>
            <h1 className='actor_name'>{name}</h1>
            <img className='actor_image' src={image}/>
        </div>
    )
}

export {ActorCard}