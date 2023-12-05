import React from 'react';
import './SeasonSelector.css';

function SeasonSelector ({seasons, selectSeason}) {
    // console.log(seasons);
    return (
        <select className='season_selector'
        onChange={(event) => {
           selectSeason(event.target.value);
        }}
        >
            {!!seasons && seasons.map((season, key) => <option key={key+1} value={key + 1}>
                        Season {key + 1}
                </option>
            )}
        </select>
    )
}

export { SeasonSelector }