import React from "react";
import './Show.css'
import { ActorCard } from "../../Components/ActorCard";
import { SeasonCard, SeasonSelector } from "../../Components/SeasonSelector";
import { EpisodeCard } from "../../Components/EpisodeCard";
import { EpisodesSection } from "../../Components/EpisodesSection";
import { removeHtmlTags } from "../../Utils/removeHtmlTags";
import { LoadingCard } from "../../Components/LoadingCard";
import { ImageCard } from "../../Components/ImageCard";

function Show () {
    const [loading, setLoading] = React.useState(true);
    const [show, setShow] =  React.useState(null);
    const [cast, setCast] = React.useState(null);
    const [showAllActors, setShowAllActors] = React.useState(false);
    const [favourites, setFavourites] = React.useState([]);
    const currentPath = window.location.pathname;
    let index = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    
    async function fetchSeasons () {
        const response = await fetch('https://api.tvmaze.com/shows/'+index+'/seasons');
        return await response.json();
    }

    async function fetchShow () {
        const response = await fetch('https://api.tvmaze.com/shows/'+index);
        return await response.json();
    }

    async function fetchCast () {
        const response = await fetch('https://api.tvmaze.com/shows/'+index+'/cast');
        return await response.json();
    }

    React.useEffect(() => {
        let cantSeasons = 0;
        fetchSeasons().then(seasonsData => {cantSeasons = seasonsData.length;});
        fetchShow().then(showData => {showData.cantSeasons = cantSeasons; setShow(showData);});
        fetchCast().then(castData => {setCast(castData); dropDuplicatedCast(castData);});
        setTimeout(() => setLoading(false), 1000)
    }, []);


    console.log(show); 
    console.log(cast);   
    console.log("rendering1")

    const dateConverter = (date) => {
        const dateParts = date.split("-");
        return(dateParts[2]+"/"+dateParts[1]+"/"+dateParts[0])
    }

    return (
        <>
            <h1 className="showpage_title">{show?.name}</h1>
            <section className="show_content">
                <ImageCard url={show?.image.original} height='500px' width='340px' loading={loading}/>
                {/* <img className="show_image" src={show?.image.original}/> */}
                <div className="show_info">
                    <h3 className='show_desc'>{show && removeHtmlTags(show?.summary)}</h3>
                    <h3 className="show_info_elements"><u>ESTRENO:</u> {show && dateConverter(show.premiered)}</h3>
                    <h3 className="show_info_elements"><u>RATING:</u> {show?.rating.average}</h3>
                    <h3 className="show_info_elements"><u>TEMPORADAS:</u> {show?.cantSeasons}</h3>
                    <h3 className="show_info_elements"><u>GENEROS:</u> {show?.genres.map(genre => <span>{genre}, </span>)}</h3>
                    <a className="link_official_site" href={show?.officialSite}>Official site</a>
                </div>
            </section>
            <h2 className="cast_title">CAST</h2>
            <div className="cast_container">
                {showAllActors ? 
                cast?.map(actor => <ActorCard name={actor.person.name} image={actor.person.image.medium} personId={actor.person.id}/>) : 
                cast?.slice(0, 12).map(actor => <ActorCard name={actor.person.name} image={actor.person.image.medium} personId={actor.person.id}/>)
                }
            </div>
            {cast?.length > 12 && 
                <button className="btn_show-actors" onClick={() => {
                    setShowAllActors(!showAllActors);
                    if(showAllActors){
                        const castTitle = document.querySelector(".cast_title");
                        const castBound = castTitle.getBoundingClientRect();
                        const distanceToTop = castBound.top + window.scrollY;
                        window.scrollTo({top: distanceToTop, behavior: "smooth"});
                    }
                }}> 
                    {showAllActors ? 'Watch less' : 'Watch more'}
                </button>
            }
            <EpisodesSection showIndex={index}></EpisodesSection>
            <section className="green">
                <div className="red"></div>
            </section>
        </>
    )
}

export {Show}

const dropDuplicatedCast = (cast) => {
    let result = cast.filter((item,index)=>{
        return cast.indexOf(item) === index;
    })
    console.log(result);
}

