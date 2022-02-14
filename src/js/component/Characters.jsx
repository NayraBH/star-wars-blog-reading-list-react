import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { getCharacters } from "../service/characters.js";

import Card from "../component/Card.jsx";
import Spinner from "./Spinner.jsx";

const Characters = () => {
    const { store, actions } = useContext(Context); 

    const [loading, setLoading] = useState(false); 

    const getAllCharacters = () => {
        setLoading(true);
		getCharacters()
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				actions.setCharacters(data.results);
			})
			.catch((err) => {
				console.log(err);
			}).finally (() => {
                setLoading(false);
            });
	};

    useEffect(() => {
		getAllCharacters();
	}, []);

    return (
        <div>
            <h1 className="ms-3">Characters</h1>
            <div className="container-fluid">
                 <div className="row flex flex-nowrap overflow-scroll"> 
                    { loading ? <Spinner /> 
                    : store.characters.map((character) => (
                        <Card
                            key={character.uid}
                            id={parseInt(character.uid)}
                            name={character.name}
                            type="character"
                        />
                    ))}
                </div>
            </div>
        </div>
    )
};

export default Characters;