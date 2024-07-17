import React from "react";
import { ShowContainer } from "../../Components/ShowContainer";
import { SectionOpcSelector } from "../../Components/SectionOpcSelector";
import { useLocation } from "react-router-dom";
import './Home.css'
import { useLocalStorage } from "../../Utils/useLocalStorage";
import { useApi } from "../../Utils/useApi";

function Home() {
    const [section, setSection] = React.useState(1);
    const location = useLocation();

    const {shows, setShows, cantShows, loading} = useApi();

    React.useEffect(() => {
      const queryParams = new URLSearchParams(location.search);
      const sectionValue = queryParams.get('section');
      if(sectionValue != null){
        setSection(sectionValue);
      } else {
        setSection(1);
      }
    }, [location.search]);

    const {
      item: favouritesShows, 
      addItem: addShows,
      loadingFavs,
      error,
    } = useLocalStorage('favouritesShows', []);

  return(
    <>
        <ShowContainer loading={loading} shows={shows} section={section} favouritesShows={favouritesShows} favShowAction={addShows}/>
        <SectionOpcSelector section={section} setSection={setSection} cantShows={cantShows}/>
    </>
    
  )
}

export {Home}

