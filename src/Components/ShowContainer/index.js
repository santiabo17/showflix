import './ShowContainer.css'

function ShowContainer(props){
    return(
            <div className="show_container">
                {props.children}
            </div>
    )
}

export {ShowContainer}