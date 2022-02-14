import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { getCharacter } from "../service/characters.js";

import Spinner from "../component/Spinner.jsx";

export const Character = () => {
    const {id} = useParams();
    const { store, actions } = useContext(Context);
    
    const [loading, setLoading] = useState(false); 
    
    const getCharacterInfo = async () => {
        try {
            setLoading(true);
            const res = await getCharacter(id);
            const data = await res.json();
            actions.setCharacterInfo(data.result.properties);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
	};

    useEffect(() => {
		getCharacterInfo();
	}, []);

    return (<div className="container">
                <div className="d-flex">                 
                    <img className="image col-4 p-3"
                        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
                        alt={store.characterInfo.name}
                        onError={(e) => {
                            e.target.onerror = null
                            e.target.src = "https://starwars-visualguide.com/assets/img/placeholder.jpg"
                        }}
                    />
                    <div className="col-6 p-3">
                        <h1 className="text-center">{ loading ? <Spinner /> : store.characterInfo.name}</h1>
                        <p className="text-center">description text</p>
                    </div>
                </div>
                <div>
                    <hr />
                    <div className="row text-center m-3">
                        <div className="col-2">Name</div>
                        <div className="col-2">Birth Year</div>
                        <div className="col-2">Gender</div>
                        <div className="col-2">Height</div>
                        <div className="col-2">Skin Color</div>
                        <div className="col-2">Eye Color</div>
                    </div>
                    <div className="row text-center m-3">
                        <div className="col-2">{store.characterInfo.name}</div>
                        <div className="col-2">{store.characterInfo.birth_year}</div>
                        <div className="col-2">{store.characterInfo.gender}</div>
                        <div className="col-2">{store.characterInfo.height}</div>
                        <div className="col-2">{store.characterInfo.skin_color}</div>
                        <div className="col-2">{store.characterInfo.eye_color}</div>
                    </div>
                </div>
            </div>)
}