import { Link } from 'react-router-dom';
import './ShowCard.css';
function ShowCard ({show, loading}) {
    return (
        <div 
        className="show_box"
        >
          <Link to={'/show/'+show.id}>
            <h1 className='show_title'>{show.name}</h1>
            {<img src={show.image.medium}/>}
          </Link>
        </div>
      )
}

export {ShowCard};