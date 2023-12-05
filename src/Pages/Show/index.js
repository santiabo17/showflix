import React from "react";
import './Show.css'
import { ActorCard } from "../../Components/ActorCard";
import { SeasonCard, SeasonSelector } from "../../Components/SeasonSelector";
import { EpisodeCard } from "../../Components/EpisodeCard";
import { EpisodesSection } from "../../Components/EpisodesSection";

function Show () {
    const [show, setShow] =  React.useState(null);
    const [cast, setCast] = React.useState(null);
    const [showAllActors, setShowAllActors] = React.useState(false);
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
        fetchCast().then(castData => setCast(castData));
    }, []);

    console.log(show);     
    
    console.log("rendering1")

    const fechaEstreno = new Date(show?.premiered);
    console.log(fechaEstreno);


    return (
        <>
            <h1 className="showpage_title">{show?.name}</h1>
            <section className="show_content">
                <img className="show_image" src={show?.image.original}/>
                <div className="show_info">
                    <h3 className='show_desc'>{show && removeHtmlTags(show?.summary)}</h3>
                    <h3 className="show_info_elements">ESTRENO: {show?.premiered}</h3>
                    <h3 className="show_info_elements">RATING: {show?.rating.average}</h3>
                    <h3 className="show_info_elements">TEMPORADAS: {show?.cantSeasons}</h3>
                    <h3 className="show_info_elements">GENEROS: {show?.genres.map(genre => <span>{genre}, </span>)}</h3>
                    <a className="link_official_site" href={show?.officialSite}>Official site</a>
                </div>
            </section>
            
            <h2 className="cast_title">CAST</h2>
            <div className="cast_container">
                {showAllActors ? 
                cast?.map(actor => <ActorCard name={actor.person.name} image={actor.person.image.medium}/>) : 
                cast?.slice(0, 12).map(actor => <ActorCard name={actor.person.name} image={actor.person.image.medium}/>)}
            </div>
            <button className="btn_show-actors" onClick={() => {
                setShowAllActors(!showAllActors);
                if(showAllActors){
                    const castTitle = document.querySelector(".cast_title");
                    const castBound = castTitle.getBoundingClientRect();
                    const distanceToTop = castBound.top + window.scrollY;
                    window.scrollTo(0, distanceToTop);
                }
            }}> 
                {showAllActors ? 'Watch less' : 'Watch more'}
            </button>
            <EpisodesSection showIndex={index}></EpisodesSection>
            
        </>
    )
}

export {Show}

function removeHtmlTags(input) {
    return input.replace(/<[^>]*>/g, '');
}