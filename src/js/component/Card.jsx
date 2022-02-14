import React, { useContext } from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";

const Card = (props) => {
    const { store, actions } = useContext(Context);    

    // Falta arrelgar esta función y luego mostrar en el navbar el array favorites
    const handleLike = (e) => {
        if ( store.favorites.some(f => f.name === e.target.value) ) {
            actions.deleteFavorites(e.target.value);}
        else { actions.addFavorites(e.target.title, e.target.id) }
    }

    return (
        <div className="card m-3 col-3">
            <div className="card-body">
                <img className="col-12 p-3"
                    src={`https://starwars-visualguide.com/assets/img/${props.type}s/${props.id}.jpg`}
                    alt={props.name}
                    onError={(e) => {
                        e.target.onerror = null
                        e.target.src = "https://starwars-visualguide.com/assets/img/big-placeholder.jpg" 
                      }}
                    />
                <h5 className="card-title mt-3 mb-3">{props.name}</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <div className="d-flex justify-content-between">
                    <Link to={`/${props.type}/${props.id}`}>
                        <button className="btn btn-outline-primary">Learn more!</button>
                    </Link>
                    <button className="btn btn-outline-warning" title={props.type} id={props.id} value={props.name} onClick={handleLike}>♡</button>
                </div>
            </div>
        </div>
    )
}

Card.propTypes = {
    id: propTypes.number,
    name: propTypes.string,
    type: propTypes.string,
}

export default Card;