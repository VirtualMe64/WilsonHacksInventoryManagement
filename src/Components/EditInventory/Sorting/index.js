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
        name: "Name",
        //true is up
        direction: true
    });

    React.useEffect(() => {
        props.sortFunction(() => sortingMethod(state));
    }, [])
    
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
            props.sortFunction(() => sortingMethod(temp));
            return temp
        })
    }

    const nameSort = (a, b) => {
        if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
    }

    const reverseNameSort = (a, b) => {
        if(a.name.toLowerCase() < b.name.toLowerCase()) return 1;
        if(a.name.toLowerCase() > b.name.toLowerCase()) return -1;
        return 0;
    }

    const quantitySort = (a, b) => {
        if(a.unit !== b.unit){
            if(a.unit.toLowerCase() < b.unit.toLowerCase()) return -1;
            if(a.unit.toLowerCase() > b.unit.toLowerCase()) return 1;
        }
        return a.amount - b.amount
    }

    const reverseQuantitySort = (a, b) => {
        if(a.unit !== b.unit){
            if(a.unit.toLowerCase() < b.unit.toLowerCase()) return -1;
            if(a.unit.toLowerCase() > b.unit.toLowerCase()) return 1;
        }
        return b.amount - a.amount
    }

    const dateSort = (a, b) => {
        if (a.date > b.date) return 1;
        if (a.date == b.date) return 0;
        if (a.date < b.date) return -1;
    }

    const reverseDateSort = (a, b) => {
        if (a.date > b.date) return -1;
        if (a.date == b.date) return 0;
        if (a.date < b.date) return 1;
    }

    const sortingMethod = (currState) => {;
        switch(currState.name){
            case "Name":
                if (!currState.direction) {
                    return nameSort;
                } else {
                    return reverseNameSort;
                }

            case "Quantity":
                if (!currState.direction) {
                    return quantitySort
                } else {
                    return reverseQuantitySort;
                }

            case "Last Changed":
                if (!currState.direction) {
                    return dateSort;
                } else {
                    return reverseDateSort;
                }

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