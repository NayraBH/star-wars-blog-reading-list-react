import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";

import logo from "../../img/star-wars-logo.png";
import { FaTrashAlt } from "react-icons/fa";

export const Navbar = () => {
	const { store, actions } = useContext(Context);    

	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<img src={logo} alt="Logo Star Wars" className="m-3"/>
			</Link>
			<div className="btn-group">
				<button type="button" className="btn btn-primary dropdown-toggle m-3" data-bs-toggle="dropdown" aria-expanded="false">
					Favorites {store.favorites.length}
				</button>
				<ul className="dropdown-menu dropdown-menu-end">
					{store.favorites.map(favorite => <li className="dropdown-item m-3 pt-3 d-flex justify-content-between"
					key={`${favorite.name}_${favorite.id}`}><Link to={favorite.url}>{favorite.name}</Link>
					<FaTrashAlt
						className="m-2"
						onClick={() =>  actions.deleteFavorites(favorite.name)}
					/></li>)}
				</ul>
				</div>
		</nav>
	);
};
