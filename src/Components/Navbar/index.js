import React from 'react';
import './Navbar.css'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'


function Navbar(){
    const location = useLocation();
    const navigate = useNavigate();

    const [genreSelected, setGenreSelected ] = React.useState(null);

    const changeGenre = (event) => {
        if(event.target.value == 'All'){
            navigate('/');
        }else {
            navigate('/'+event.target.value);
        }
    }

    React.useEffect(() => {
        setGenreSelected(location.pathname.slice(1, location.pathname.length))
    }, [location.pathname])

    const genres = ["All","Scary","Comedy","Drama","Crime","Thriller","Adventure","Science-Fiction","Fantasy","Mystery","Supernatural","War","Nature","Anime","Medical","Family","Romance","Western","History","Espionage"];

    return(
        <nav className="nav">
                <NavLink className="nav_item" to='/'>Menu</NavLink>
                <NavLink className="nav_item" to='favs'>Favoritos</NavLink>
                <select onChange={changeGenre} value={genreSelected} className='nav_item genere_selector' name="select">
                    {genres.map(genre => <option value={genre}>{genre}</option>)}
                </select>
        </nav>
    )
}

export {Navbar}