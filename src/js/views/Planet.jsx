import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { getPlanet } from "../service/planets.js";

import Spinner from "../component/Spinner.jsx";

export const Planet = () => {
    const {id} = useParams();
    const { store, actions } = useContext(Context); 

    const [loading, setLoading] = useState(false); 
    
    const getPlanetInfo = async () => {
        try {
            setLoading(true);
            const res = await getPlanet(id);
            const data = await res.json();
            actions.setPlanetInfo(data.result.properties);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
	};

    useEffect(() => {
		getPlanetInfo();
	}, []);

    return (<div className="container">
                <div className="d-flex">
                    <img className="image col-4 p-3"
                        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
                        alt={store.planetInfo.name}
                        onError={(e) => {
                            e.target.onerror = null
                            e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"
                          }}                    />
                    <div className="col-6 p-3">
                        <h1 className="text-center">{loading ? <Spinner /> : store.planetInfo.name}</h1>
                        <p className="text-center">description text</p>
                    </div>
                </div>
                <div>
                    <hr />
                    <div className="row text-center m-3">
                        <div className="col-2">Name</div>
                        <div className="col-2">Climate</div>
                        <div className="col-2">Population</div>
                        <div className="col-2">Orbital Period</div>
                        <div className="col-2">Rotation Period</div>
                        <div className="col-2">Diameter</div>
                    </div>
                    <div className="row text-center m-3">
                        <div className="col-2">{store.planetInfo.name}</div>
                        <div className="col-2">{store.planetInfo.climate}</div>
                        <div className="col-2">{store.planetInfo.population}</div>
                        <div className="col-2">{store.planetInfo.orbital_period}</div>
                        <div className="col-2">{store.planetInfo.rotation_period}</div>
                        <div className="col-2">{store.planetInfo.diameter}</div>
                    </div>
                </div>
            </div>)
}