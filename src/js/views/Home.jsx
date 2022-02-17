import React from "react";

import Characters from "../component/Characters.jsx"
import Planets from "../component/Planets.jsx"
import Starships from "../component/Starships.jsx";

export const Home = () => (
	<div className="m-3">
		<Characters />
		<Planets />
		<Starships />
	</div>
);
