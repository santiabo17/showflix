import { Link } from 'react-router-dom';
import './ShowCard.css';
import { FavIcon } from '../FavIcon';
import React from 'react';
function ShowCard ({show, loading, favShowAction, favouritesShows}) {
    const [isFavourite, setIsFavourite] = React.useState(false);
    
    React.useEffect(()=>{
      // for (let i = 0; i < favouritesShows.length; i++) {
      //   if(favouritesShows[i].id == show.id){
      //     setIsFavourite(true);
      //   }
      // }
      const isShowFavourite = favouritesShows.some(favShow => favShow.id === show.id);
      setIsFavourite(isShowFavourite);
    }, [favouritesShows])
    
    return (
        <div 
        className="show_box"
        >
          <Link to={'/show/'+show.id}>
            <div className='favIcon_container' 
              onClick={(event) => {
                favShowAction(show); 
                event.preventDefault()
              }}>
              <FavIcon size="40" fill={isFavourite}/>
            </div>
            <h1 className='show_title'>{show.name}</h1>
            {<img src={show.image?.medium}/>}
          </Link>
        </div>
      )
}

export {ShowCard};