import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { getPlanets } from "../service/planets";

import Card from "../component/Card.jsx";
import Spinner from "./Spinner.jsx";

const Planets = () => {
	const { store, actions } = useContext(Context);

    const [loading, setLoading] = useState(false);   

    const getAllPlanets = () => {
        setLoading(true);
		getPlanets()
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				actions.setPlanets(data.results);
			})
			.catch((err) => {
				console.log(err);
			}).finally (() => {
                setLoading(false);
            });
	};

    useEffect(() => {
		getAllPlanets();
	}, []);

    return (
        <div>
            <h1 className="ms-3">Planets</h1>
            <div className="container-fluid">
				<div className="row flex flex-nowrap overflow-scroll"> 
                    { loading ? <Spinner /> 
                    : store.planets.map((planet) => (
                        <Card
                            key={planet.uid}
                            id={parseInt(planet.uid)}
                            name={planet.name}
                            type="planet"
                        />
                    ))}
                </div>
            </div>
        </div>
    )
};

export default Planets;