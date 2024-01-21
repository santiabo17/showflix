import React from "react";
import { LoadingCard } from "../LoadingCard";

function ImageCard({url, width, height, loading}){
    return(
        <div> 
            {!!loading && <LoadingCard width={width} height={height}/>}
            <img src={url} style={{width: width, height: height}}/>
        </div>
       
    )
}

export {ImageCard};