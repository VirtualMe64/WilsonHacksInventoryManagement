import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { faSortUp } from "@fortawesome/free-solid-svg-icons";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
const sortOptions = [
    {
        name: "Name",
        width: "20vw"
    },
    {
        name: "Quantity",
        width: "20vw"
    },
    {
        name: "Last Changed",
        width: "30vw"
    },
    {
        name: "",
        width: "20vw"
    },
    {
        name: "",
        width: "10vw"
    },
]
const SortingBar = (props) => {
    const [state, changeState] = React.useState({
        name: "Last Changed",
        //true is up
        direction: true
    });
    
    const updateDirection = (name) => {
        changeState((s) => {
            var temp = {...s}
            if(temp.name == name){
                temp.direction = !temp.direction;
            }
            else{
                temp.name = name;
                temp.direction = true;
            }
            return temp
        })
    }

    return(
        <div style={style}>
            {sortOptions.map((sortType) => {
                return(
                    <div onClick={() => updateDirection(sortType.name)} style={{width: sortType.width, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                        <h1>{sortType.name}</h1>
                        {console.log(state)}
                        {sortType.name !== state.name && sortType.name !=="" && (
                            <FontAwesomeIcon size="lg" icon={faSort}/>
                        )}
                        {sortType.name === state.name && (
                            <FontAwesomeIcon size="lg" icon={state.direction ? faSortUp : faSortDown}/>
                        )}
                    </div>
                )
            })}
        </div>
    )
}
const style = {

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 0,
    margin: 8,
    justifyContent: "space-around",
    color: "white"
}

export default SortingBar