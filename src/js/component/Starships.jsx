import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { getStarships } from "../service/starships.js";

import Card from "../component/Card.jsx";
import Spinner from "./Spinner.jsx";

const Starships = () => {
	const { store, actions } = useContext(Context);

    const [loading, setLoading] = useState(false);   

    const getAllStarships = () => {
        setLoading(true);
		getStarships()
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				actions.setStarships(data.results);
			})
			.catch((err) => {
				console.log(err);
			}).finally (() => {
                setLoading(false);
            });
	};

    useEffect(() => {
		getAllStarships();
	}, []);

    return (
        <div>
            <h1 className="ms-3">Starships</h1>
            <div className="container-fluid">
				<div className="row flex flex-nowrap overflow-scroll"> 
                    { loading ? <Spinner /> 
                    : store.starships.map((starship) => (
                        <Card
                            key={starship.uid}
                            id={parseInt(starship.uid)}
                            name={starship.name}
                            type="starship"
                        />
                    ))}
                </div>
            </div>
        </div>
    )
};

export default Starships;