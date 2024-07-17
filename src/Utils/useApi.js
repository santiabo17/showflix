import React from "react";

function useApi() {
    const [shows, setShows] = React.useState([]);
    const [cantShows, setCantShows] = React.useState(0);
    const [loading, setLoading] = React.useState(true);
    
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

    return {
        shows,
        setShows,
        loading,
        cantShows
    }
}

export { useApi }

function compareContent(content1, content2) {
    if (content1.rating.average > content2.rating.average) {
      return -1;
    } else if (content1.rating.average < content2.rating.average) {
      return 1;
    }
    return 0;
}