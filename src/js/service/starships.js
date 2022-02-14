const URL = "https://www.swapi.tech/api/starships";

export const getStarships = () => {
	return fetch(URL);
};

export const getStarship = (id) => {
	return fetch(`${URL}/${id}`);
}