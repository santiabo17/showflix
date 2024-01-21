import { Link } from 'react-router-dom';
import './ActorCard.css';

function ActorCard ({name, image, personId}) {
    return(
        <Link to={'/actor/'+personId}>
            <div className='actor_card_container'>
                <h1 className='actor_name'>{name}</h1>
                <img className='actor_image' src={image}/>
            </div>
        </Link>
        
    )
}

export {ActorCard}