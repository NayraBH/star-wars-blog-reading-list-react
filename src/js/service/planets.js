const URL = "https://www.swapi.tech/api/planets";

export const getPlanets = () => {
	return fetch(URL);
};

export const getPlanet = (id) => {
	return fetch(`${URL}/${id}`);
}