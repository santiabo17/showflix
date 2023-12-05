import './EpisodesSection.css'
import React from "react";
import { SeasonSelector } from "../SeasonSelector";
import { EpisodeCard } from "../EpisodeCard";
import { LoadingCard } from '../LoadingCard';

function EpisodesSection({showIndex}){
    const [loading, setLoading] = React.useState(true);
    const [season, setSeason] = React.useState(null);
    const [selectedSeason, setSelectedSeason] = React.useState(1);
    const [episodes, setEpisodes] = React.useState(null);
    const [episodeSelected, setEpisodeSelected] = React.useState(null);

    async function fetchSeasons () {
        const response = await fetch('https://api.tvmaze.com/shows/'+showIndex+'/seasons');
        return await response.json();
    }

    React.useEffect(() => {
        fetchSeasons().then(seasonsData => {
            const smallSeasons = [];
            seasonsData.map(season => smallSeasons.push([season.id, season.episodeOrder]))
            setSeason(smallSeasons);
            setLoading(false);
        });
    }, []);

    React.useEffect(() => {
        setLoading(true);
        setEpisodeSelected(null);
        if (!!season){
            fetch('https://api.tvmaze.com/seasons/'+season[selectedSeason-1][0]+'/episodes')
            .then(episodes => episodes.json())
            .then(episodes => {
                setEpisodes(episodes);
                
            })
            setTimeout(() => setLoading(false), 1500)
        }
    }, [season,selectedSeason])

    React.useEffect(() => {
        const episodeSection = document.querySelector(".episodes_section");
        if(episodeSelected != null){
            episodeSection.style.justifyContent = "left";
            episodeSection.style.paddingLeft = "30px";
        } else {
            episodeSection.style.justifyContent = "center";
            episodeSection.style.paddingLeft = "0px";
        }
    }, [episodeSelected])

    return(
        <>
            <h2 className='episodes_title'>EPISODES</h2>
            <section className="episodes_section">
                <SeasonSelector seasons={season} selectSeason={setSelectedSeason}></SeasonSelector>
                <div className="episodes_container">
                    {episodes?.map((episode, key) => <EpisodeCard key={key} number={key+1} name= {episode.name} image={episode.image?.medium} loading={loading} episodeSelected={episodeSelected} setEpisodeSelected={setEpisodeSelected}/>)} 
                </div>
            </section> 
        </>
        
    )
}

export {EpisodesSection}