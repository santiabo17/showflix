import React from "react"
import { useParams } from "react-router-dom";
import { PaperActorCard } from "../../Components/PaperActorCard/PaperActorCard";
import './ActorPage.css'

function ActorPage() {
    const {id} = useParams();
    const [actor, setActor] = React.useState([]);
    const [papers, setPapers] = React.useState([]);
    React.useEffect(() => {
        fetch('https://api.tvmaze.com/people/'+id+'?embed=castcredits')
          .then(data => data.json())
          .then(data => {
            console.log(data);
            console.log(data._embedded.castcredits)
            setActor(data);
            setPapers(data._embedded.castcredits);
          });
    }, []);

    console.log(papers);

    return(
        <>
            <div className="actor_data_container">
                <img className="actorPage_image" src={actor.image?.medium}/>
                <div className="actor_info_container">
                    <h1 className="actorPage_name">{actor?.name}</h1>
                    <h3>GENERO: {actor?.gender}</h3>
                    <h3>PAIS: {actor.country?.name}</h3>
                    <h3>CUMPLEANOS: {actor?.birthday}</h3>
                </div>
            </div>
            <h3>CANTIDAD DE PAPELES: {papers.length}</h3>
            <div className="papers_container">
                {papers?.map(paper => 
                    <PaperActorCard characterId={paper._links.character.href} showId={paper._links.show.href}/>
                )}
            </div>
        </>
    )
}

export {ActorPage}