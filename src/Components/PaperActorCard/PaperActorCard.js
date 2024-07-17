import React from "react";
import { fetchData } from "../../Utils/fetchData";
import { Link } from "react-router-dom";
import defaultActorImage from '../../static/defaultActor.png';
import defaultShowImage from '../../static/default_show_image.png';
import './PaperActorCard.css'

function PaperActorCard({characterId, showId}) {
    console.log(characterId);
    const [character, setCharacter] = React.useState([]);
    const [show, setShow] = React.useState([]);

    React.useEffect(() => {
        const fetchCharacter = fetchData(characterId);
        const fetchShow = fetchData(showId);
        Promise.all([fetchCharacter, fetchShow])
        .then(paperData => {
            console.log(paperData)
            setCharacter(paperData[0]);
            setShow(paperData[1]);
          })
        .catch(error => console.error('Error en alguna de las solicitudes fetch:', error));
    }, [characterId, showId])

    return (
        <Link to={'/show/'+show.id}>
            <div className="paperCard_container">
                <img className="character_image" src={character.image ? character.image?.medium : defaultActorImage} alt="" />
                <div className="divisor_line"></div>
                <div className="paper_text">
                    <div className="character_text">
                        <h3 className="paperText_title">CHARACTER</h3>
                        <h3 className="paperText_description">{character?.name}</h3>
                    </div> 
                    
                    <div className="show_text">
                        <h3 className="paperText_title">SHOW</h3>
                        <h3 className="paperText_description">{show?.name}</h3>
                    </div>
                </div>
                {/* <img className="showPaper_image" src={show.image?.medium} alt="" /> */}
                <img className="showPaper_image" src={show.image ? 
                show.image?.medium : defaultShowImage} alt="" />
            </div>
        </Link>
    )
        
}

export {PaperActorCard}
