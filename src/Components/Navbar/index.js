import React from 'react';
import './Navbar.css'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { GenreSelector } from '../GenreSelector';
import searchIcon from '../../static/search.svg';


function Navbar(){
    const location = useLocation();
    const navigate = useNavigate();
    console.log('rendering navbar');

    const [genreSelected, setGenreSelected ] = React.useState(null);

    const changeGenre = (event) => {
        if(event.target.value == 'All'){
            navigate('/');
        }else {
            navigate('/'+event.target.value);
        }
    }

    React.useEffect(() => {
        if(genres.includes(location.pathname.slice(1, location.pathname.length))){
            setGenreSelected(location.pathname.slice(1, location.pathname.length));
        } else {
            setGenreSelected("All");
        }
        
    }, [location.pathname])

    const genres = ["All","Scary","Comedy","Drama","Crime","Thriller","Adventure","Science-Fiction","Fantasy","Mystery","Supernatural","War","Nature","Anime","Medical","Family","Romance","Western","History","Espionage"];

    return(
        <nav className="nav">
            <div className='nav_right'>
                <NavLink className={({isActive}) => `nav_item ${isActive && 'nav_item_selected'}`} to='/'>Menu</NavLink>
                <NavLink className={({isActive}) => `nav_item ${isActive && 'nav_item_selected'}`} to='favs'>Favoritos</NavLink>
                <GenreSelector values={genres} onChange={changeGenre} selectedValue={genreSelected} columns={3}/>
            </div>
            <Link to='/search'>
                <div className='search_button'>
                    <span>Buscar</span>
                    <img className='search_icon' src={searchIcon}/>
                </div>
            </Link>
        </nav>
    )
}

export {Navbar}