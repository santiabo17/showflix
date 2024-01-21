import './EpisodeCard.css'
import { LoadingCard } from '../LoadingCard'

function EpisodeCard(props){
    return(
        <div 
            className={props.episodeSelected == props.number ? "episode_card_container episode_selected" : "episode_card_container"}
            onClick={() => {
                props.setEpisodeSelected(props.number);
                if(props.number > 4){
                    const episodesCards = document.querySelectorAll(".episode_card_container");
                    const episodeCard = episodesCards[props.number - 1];
                    const cardBound = episodeCard.getBoundingClientRect();
                    const distanceToTop = cardBound.top + window.scrollY - (window.innerHeight / 2);
                    window.scrollTo({top: distanceToTop, behavior: "smooth"});
                }
                
            }}
        >
            {!!props.loading && <LoadingCard width='100%' height='100px'/>}
            <section className='episode_info'>
                <h4 className='episode_data'>Episode {props.number}</h4>
                <h4 className='episode_data'>{props.name}</h4>
            </section>
            <img className='img_episode' src={props.image}/>
        </div>
    )
}

export { EpisodeCard }