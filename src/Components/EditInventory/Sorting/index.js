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
        props.sortFunction(sortingMethod())
    }

    const nameSort = (x,y) => {
        return x.name.toLowerCase().compareTo(y.name.toLowerCase()) > 0
    }
    const quantitySort = (x,y) => {
        if(x.unit !== y.unit){
            return x.unit.compareTo(y.unit)
        }
        return x.amount > y.amount
    }
    const dateSort = (x,y) => {
        return x.date.getTime() < y.date.getTime()
    }

    const sortingMethod = () => {
        switch(state.name){
            case "Name":
                return nameSort
            case "Quantity":
                return quantitySort
            case "Last Changed":
                return dateSort
            default:
                console.log("how")
                break
        }
    }

    return(
        <div style={style}>
            {sortOptions.map((sortType) => {
                return(
                    <div onClick={() => updateDirection(sortType.name)} style={{width: sortType.width, display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                        <h1 style={{color: "#2EC4B6"}}>{sortType.name}</h1>
                        {console.log(state)}
                        {sortType.name !== state.name && sortType.name !=="" && (
                            <FontAwesomeIcon size="lg" icon={faSort} style={{color: "#2EC4B6"}}/>
                        )}
                        {sortType.name === state.name && (
                            <FontAwesomeIcon size="lg" icon={state.direction ? faSortUp : faSortDown} style={{color: "#2EC4B6"}}/>
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