import './EpisodesSection.css'
import React from "react";
import { SeasonSelector } from "../SeasonSelector";
import { EpisodeCard } from "../EpisodeCard";
import { LoadingCard } from '../LoadingCard';
import { removeHtmlTags } from '../../Utils/removeHtmlTags';

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
                console.log(episodes);
                setEpisodes(episodes);
            })
            setTimeout(() => setLoading(false), 1500)
        }
    }, [season,selectedSeason])

    React.useEffect(() => {
        setTimeout(() => {
            console.log(episodeSelected);
            const episodeInfo = document.querySelector(".episode_selected_content");
            if(episodeInfo != null){
                console.log(episodeInfo);
                const episodeInfoStyle = getComputedStyle(episodeInfo);
                const contentHeight = episodeInfoStyle.height.substring(0, episodeInfoStyle.height.length - 2);
                console.log(contentHeight);
                console.log(contentHeight/2);
                // console.log((episodes.length - episodeSelected + 1)* 110 - 60);
                if(episodeSelected > 4){
                    if (contentHeight/2 > ((episodes.length - episodeSelected + 1)* 110 - 60)){
                        episodeInfo.style.marginTop = (((episodes.length)*110) - 10 - contentHeight) +"px"
                    } else {
                        episodeInfo.style.marginTop = (((episodeSelected-1)*110) - (contentHeight/2) + 50) + 'px';
                    }
                } 
            }
        }, 1000)
    }, [episodeSelected])

    return(
        <>
            <h2 className='episodes_title'>EPISODES</h2>
            <section className="episodes_section">
                <div className={episodeSelected ? 'episodes_selector episodes_selector_left' : 'episodes_selector'}>
                    <SeasonSelector seasons={season} selectSeason={setSelectedSeason}></SeasonSelector>
                    <div className="episodes_container">
                        {episodes?.map((episode, key) => <EpisodeCard key={key} number={key+1} name= {episode.name} image={episode.image?.medium} loading={loading} episodeSelected={episodeSelected} setEpisodeSelected={setEpisodeSelected}/>)} 
                    </div>
                </div>
                {episodeSelected && 
                    <div key={episodeSelected} className='episode_selected_content episode_selected_content_animation'>
                        <img className='img_episode_info' src={episodes[episodeSelected-1].image.original}/>
                        <h1>{episodes[episodeSelected-1].name}</h1>
                        <p>{removeHtmlTags(episodes[episodeSelected-1].summary)}</p>
                    </div>}
            </section> 
        </>
        
    )
}

export {EpisodesSection}