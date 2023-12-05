import React from "react";
import { ShowContainer } from "../../Components/ShowContainer";
import { ShowCard } from "../../Components/ShowCard";
import { SectionOpcSelector } from "../../Components/SectionOpcSelector";
import { ShowsLoading } from "../../Components/ShowsLoading";
import { useLocation } from "react-router-dom";

function Home() {
    const [shows, setShows] = React.useState([]);
    const [section, setSection] = React.useState(1);
    const [cantShows, setCantShows] = React.useState(0);
    const [loading, setLoading] = React.useState(true);

    const location = useLocation();
    // console.log(section);
    // console.log(shows.length);

    // console.log("rendering");

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
              setShows(showsFetched.map(({ id, name, image }) => ({ id, name, image })))
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
  

  // React.useEffect(() => {
  //   if(cantShows > 0){
  //     setLoading(true);
  //     setTimeout(() => {
  //       const page = (pageShows)/section;
  //       console.log(page)
  //       fetch('https://api.tvmaze.com/shows?page='+0)
  //       .then(data => data.json())
  //       .then(data => {
  //         data.sort(compareContent);
  //         console.log(data.map(({ id, name, image }) => ({ id, name, image })));
  //         setShows(data.map(({ id, name, image }) => ({ id, name, image })));
  //         // setShows(data.slice((20 * (section-1)), (20 * section)));
  //         setLoading(false);
  //       });
  //     }, 2000)
  //   }
  // }, [section, cantShows])


  return(
    <>
        <ShowContainer >
            {!loading ? shows.slice((42 * (section-1)), (42 * section)).map(show => <ShowCard show={show} key={show.id}/>) : <ShowsLoading/>}
        </ShowContainer>
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

