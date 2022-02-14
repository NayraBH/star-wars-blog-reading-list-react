import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { getStarship } from "../service/starships.js";

import Spinner from "../component/Spinner.jsx";

export const Starship = () => {
    const {id} = useParams();
    const { store, actions } = useContext(Context); 

    const [loading, setLoading] = useState(false); 
    
    const getStarshipInfo = async () => {
        try {
            setLoading(true);
            const res = await getStarship(id);
            const data = await res.json();
            actions.setStarshipInfo(data.result.properties);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
	};

    useEffect(() => {
		getStarshipInfo();
	}, []);

    return (<div className="container">
                <div className="d-flex">
                    <img className="image col-4 p-3"
                        src={`https://starwars-visualguide.com/assets/img/starships/${id}.jpg`}
                        alt={store.starshipInfo.name}
                        onError={(e) => {
                            e.target.onerror = null
                            e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"
                          }}                    />
                    <div className="col-6 p-3">
                        <h1 className="text-center">{loading ? <Spinner /> : store.starshipInfo.name}</h1>
                        <p className="text-center">description text</p>
                    </div>
                </div>
                <div>
                    <hr />
                    <div className="row text-center m-3">
                        <div className="col-2">Starship class</div>
                        <div className="col-2">Manufacturer</div>
                        <div className="col-2">Cost in credits</div>
                        <div className="col-2">Crew</div>
                        <div className="col-2">Passengers</div>
                        <div className="col-2">Consumables</div>
                    </div>
                    <div className="row text-center m-3">
                        <div className="col-2">{store.starshipInfo.starship_class}</div>
                        <div className="col-2">{store.starshipInfo.manufacturer}</div>
                        <div className="col-2">{store.starshipInfo.cost_in_credits}</div>
                        <div className="col-2">{store.starshipInfo.crew}</div>
                        <div className="col-2">{store.starshipInfo.passengers}</div>
                        <div className="col-2">{store.starshipInfo.consumables}</div>
                    </div>
                </div>
            </div>)
}