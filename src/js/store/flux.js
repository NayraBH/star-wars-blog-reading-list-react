const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			characters: [],
			characterInfo: [],
			planets: [],
			planetInfo: [],
			starships: [],
			starshipInfo: [],
			favorites: [],
		},
		actions: {

			setCharacters: (data) => {
				const store = getStore();
				setStore({...store, characters: data})
			},

			setPlanets: (data) => {
				const store = getStore();
				setStore({...store, planets: data})
			},

			setStarships: (data) => {
				const store = getStore();
				setStore({...store, starships: data})
			},

			setCharacterInfo: (data) => {
				const store = getStore();
				setStore({...store, characterInfo: data})
			},

			setPlanetInfo: (data) => {
				const store = getStore();
				setStore({...store, planetInfo: data})
			},	

			setStarshipInfo: (data) => {
				const store = getStore();
				setStore({...store, starshipInfo: data})
			},
			
			addFavorites: (type, id) => {
				const store = getStore();
				let data = {};
				data.id = id;
				data.type = type;
				if (type === "character") {
					data.name = store.characters[id-1].name;
					data.url = `/${type}/${id}`;
				} else if (type === "planet"){
					data.name = store.planets[id-1].name;
					data.url = `/${type}/${id}`;
				} else {
					const ship = store.starships.find(starship => starship.uid === id);
					data.name = ship.name;
					data.url = `/${type}/${id}`;
				}
				setStore({...store, favorites: [...store.favorites, data]});
			},

			deleteFavorites: (name) => {
				const store = getStore();
				const data = store.favorites.filter((f) => (f.name !== name));
				setStore({...store, favorites: data});
			}
		}
	};
};

export default getState;
