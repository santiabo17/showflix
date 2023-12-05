import './Navbar.css'
import { NavLink } from 'react-router-dom'

function Navbar(){
    return(
        <nav className="nav">
            <NavLink className="nav_item" to='/'>Menu</NavLink>
            <NavLink className="nav_item" to='movies'>Peliculas</NavLink>
            <NavLink className="nav_item" to='series'>Series</NavLink>
            <NavLink className="nav_item" to='favs'>Favoritos</NavLink>
        </nav>
    )
}

export {Navbar}