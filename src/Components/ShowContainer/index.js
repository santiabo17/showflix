import React from 'react'
import { ShowCard } from '../ShowCard'
import { ShowsLoading } from '../ShowsLoading'
import './ShowContainer.css'

function ShowContainer({loading, shows, section, favouritesShows, favShowAction}){
    console.log(shows);
    console.log(loading);
    console.log(section);
    return(
            <div className="show_container">
                {/* {props.children} */}
                {!loading ? shows.slice((42 * (section-1)), (42 * section)).map(show => <ShowCard show={show} key={show.id} favouritesShows={favouritesShows} favShowAction={favShowAction}/>) : <ShowsLoading/>}
            </div>
    )
}

export {ShowContainer}