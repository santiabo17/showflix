import React from "react"
import { useParams } from "react-router-dom";
import { PaperActorCard } from "../../Components/PaperActorCard/PaperActorCard";
import downArrowIcon from '../../static/down_arrow_black.svg';
import femaleIcon from '../../static/female.svg';
import maleIcon from '../../static/male.svg';
import cakeIcon from '../../static/cake.svg';
import flagIcon from '../../static/flag.svg';
import './ActorPage.css'
import { calculateAge } from "../../Utils/calculateAge";

function ActorPage() {
    const [showInfo, setShowInfo] = React.useState(false);


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
        <div className="actor_page_container">
            <div className="actor_data_card">
                <div className="actor_info_container">
                    <div className="actorPage_name">
                        <h1 >{actor?.name}</h1>
                        <img className={`down_arrow ${showInfo && 'down_arrow_choosed'}`} src={downArrowIcon} alt="" srcset="" onClick={() => setShowInfo(!showInfo)}/>
                    </div>
                    <div className={`actor_info ${showInfo && 'actor_info_showed'}`}>
                        <div className="gender_info">
                            <img className="temathic_logo" src={actor?.gender == 'Male' ? maleIcon : femaleIcon} alt="" />
                            <h3>{actor?.gender}</h3>
                        </div>
                        <div className="country_info">
                            <img className="temathic_logo" src={flagIcon} alt="" />
                            <h3>{actor.country?.name}</h3>
                        </div>
                        <div className="birth_info">
                            <h3>{calculateAge(actor?.birthday)} YEARS OLD</h3>
                            <img className="temathic_logo" src={cakeIcon} alt="" />
                            <h3>{actor?.birthday}</h3>
                        </div>
                    </div>
                </div>
                <img className="actorPage_image" src={actor.image?.medium}/>
            </div>
            <h3 className="papers_title">ACTOR'S PAPERS</h3>
            {papers.slice(0,20)?.map(paper => 
                <PaperActorCard characterId={paper._links.character.href} showId={paper._links.show.href}/>
            )}
        </div>
    )
}

export {ActorPage}