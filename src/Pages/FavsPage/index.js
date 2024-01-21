import React from "react";
import { ShowCard } from "../../Components/ShowCard";
import { ShowContainer } from "../../Components/ShowContainer";
import { ShowsLoading } from "../../Components/ShowsLoading";
import { useLocalStorage } from "../../Utils/useLocalStorage";
import { SectionOpcSelector } from "../../Components/SectionOpcSelector";
import { useLocation } from "react-router-dom";

function FavsPage() {
    const [section, setSection] = React.useState(1);
    const location = useLocation();

    const {
        item: favouritesShows, 
        addItem: addShows,
        loading: loadingFavs,
        error,
    } = useLocalStorage('favouritesShows', []);

      React.useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const sectionValue = queryParams.get('section');
        if(sectionValue != null){
          setSection(sectionValue);
        } else {
          setSection(1);
        }
      }, [location.search]);

    return (
        <>
            <h1>YOUR FAVOURITES</h1>
            {/* <ShowContainer >
                {!loadingFavs ? favouritesShows.map(show => <ShowCard show={show} key={show.id} favouritesShows={favouritesShows} favShowAction={addShows}/>) : <ShowsLoading/>}
            </ShowContainer> */}
            <ShowContainer section={section} loading={loadingFavs} shows={favouritesShows} favouritesShows={favouritesShows} favShowAction={addShows}/>
            {favouritesShows?.length > 42 &&<SectionOpcSelector section={section} setSection={setSection} cantShows={favouritesShows?.length}/>}

        </>
    )
}

export { FavsPage }