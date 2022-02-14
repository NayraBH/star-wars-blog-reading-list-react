const URL = "https://www.swapi.tech/api/people";

export const getCharacters = () => {
	return fetch(URL);
};

export const getCharacter = (id) => {
	return fetch(`${URL}/${id}`);
}