import React from "react";
import { ShowContainer } from "../../Components/ShowContainer";
import { ShowCard } from "../../Components/ShowCard";
import { SectionOpcSelector } from "../../Components/SectionOpcSelector";
import { ShowsLoading } from "../../Components/ShowsLoading";
import { Link, useLocation } from "react-router-dom";
import './Home.css'
import searchIcon from '../../static/search.svg';
import { Searcher } from "../Searcher";
import { useLocalStorage } from "../../Utils/useLocalStorage";

function Home() {
    const [shows, setShows] = React.useState([]);
    const [section, setSection] = React.useState(1);
    const [cantShows, setCantShows] = React.useState(0);
    const [loading, setLoading] = React.useState(true);
    const [genre, setGenre] = React.useState('All');

    const location = useLocation();

    React.useEffect(() => {
      setLoading(true);
      let showsFetched = [];
        for (let i = 0; i < 10; i++) {    
          fetch('https://api.tvmaze.com/shows?page='+i)
          .then(data => data.json())
          .then(data => {
            setCantShows(prev => prev + data.length);
            data.sort(compareContent);
            showsFetched = [...showsFetched, ...data];
            if(i == 9){
              showsFetched.sort(compareContent);
              console.log(showsFetched);
              setShows(showsFetched.map(({ id, name, image, genres }) => ({ id, name, image, genres })))
              setLoading(false);
            }
          });
        }
    }, []);

    React.useEffect(() => {
      const queryParams = new URLSearchParams(location.search);
      const sectionValue = queryParams.get('section');
      if(sectionValue != null){
        setSection(sectionValue);
      } else {
        setSection(1);
      }
    }, [location.search]);

    React.useEffect(() => {
      console.log(location.pathname.slice(1, location.pathname.length));
      setGenre(location.pathname.slice(1, location.pathname.length));
    }, [location.pathname]);

    React.useEffect(() => {
      if(genre != 'All'){
        const genreShows = shows.filter(show => show.genres.includes(genre));
        console.log(genreShows);
        setShows(genreShows);
      }
    }, [genre])

    const {
      item: favouritesShows, 
      addItem: addShows,
      loadingFavs,
      error,
    } = useLocalStorage('favouritesShows', []);

  return(
    <>
        <h1>{genre}</h1>
      	<Link to='/search' state={{shows}}>
          <div className='search_button'>
              <span>Buscar</span>
              <img className='search_icon' src={searchIcon}/>
          </div>
        </Link>
        <ShowContainer loading={loading} shows={shows} section={section} favouritesShows={favouritesShows} favShowAction={addShows}/>
            {/* {!loading ? shows.slice((42 * (section-1)), (42 * section)).map(show => <ShowCard show={show} key={show.id} favouritesShows={favouritesShows} favShowAction={addShows}/>) : <ShowsLoading/>} */}
        {/* </ShowContainer> */}
        <SectionOpcSelector section={section} setSection={setSection} cantShows={cantShows}/>
    </>
    
  )
}

function compareContent(content1, content2) {
  if (content1.rating.average > content2.rating.average) {
    return -1;
  } else if (content1.rating.average < content2.rating.average) {
    return 1;
  }
  return 0;
}

export {Home}

