import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Searcher.css'
import React from 'react';
import { ShowContainer } from '../../Components/ShowContainer';
import { useLocalStorage } from '../../Utils/useLocalStorage';
import { useApi } from '../../Utils/useApi';

function Searcher () {
    const {shows, loading} = useApi();
    const [searchValue, setSearchValue] = React.useState('');
    const [filteredShows, setFilteredShows] = React.useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    const {
        item: favouritesShows, 
        addItem: addShows,
        loading: loadingFavs,
        error,
      } = useLocalStorage('favouritesShows', []);

    React.useEffect(() => {
        if(searchValue.length > 0){
            setFilteredShows(shows.filter(show => show.name.toLowerCase().includes(searchValue.toLowerCase())));
        } else {
            setFilteredShows([]);
        }
    }, [searchValue])

    React.useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const searchValue = queryParams.get('searchValue');
        console.log(searchValue);
        if(searchValue != null){
          setSearchValue(searchValue);
        } else {
          setSearchValue('');
        }
      }, [location.search]);

    return(
        <div className='searcher_modal'>
            <div className='searcher_input'>
                <span>BUSCAR</span>
                <input value={searchValue} type='text' onChange={(event) => {
                    setSearchValue(event.target.value);
                    if(event.target.value.length > 0){
                        navigate(location.pathname+'?searchValue='+event.target.value);
                    } else {
                        navigate('/search');
                    }
                    
                }}/>
            </div>
            {/* <ShowContainer>
                {searchValue.length > 0 && filteredShows.slice(0, 20).map(show => <ShowCard show={show} key={show.id}/>)}
            </ShowContainer> */}
            <ShowContainer loading={loading} shows={filteredShows} section={1} favouritesShows={favouritesShows} favShowAction={addShows}/>
            <Link to='/'><span className='close_btn'>X</span></Link>
        </div>
    )
}

export {Searcher}