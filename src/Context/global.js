import React, {
	createContext,
	useContext,
	useEffect,
	useReducer,
	useState,
} from 'react';

const GlobalContext = createContext();

const baseURL = 'https://api.jikan.moe/v4';

// Actions

const LOADING = 'LOADING';
const SEARCH = 'SEARCH';
const GET_TOP_ANIME = 'GET_TOP_ANIME';
const GET_POPULAR_ANIME = 'GET_POPULAR_ANIME';
const GET_AIRING_ANIME = 'GET_AIRING_ANIME';
const GET_MY_ANIME = 'GET_MY_ANIME';
const GET_CHARACTER_PICTURES = 'GET_CHARACTER_PICTURES';

// Reducer

const reducer = (state, action) => {
	switch (action.type) {
		case LOADING:
			return { ...state, loading: true };
		case GET_TOP_ANIME:
			return { ...state, topAnime: action.payload, loading: false };
		case GET_POPULAR_ANIME:
			return { ...state, popularAnime: action.payload, loading: false };
		case GET_AIRING_ANIME:
			return { ...state, airingAnime: action.payload, loading: false };
		case GET_MY_ANIME:
			return {
				...state,
				myAnime: action.payload,
				loading: false,
			};
		case SEARCH:
			return { ...state, searchResults: action.payload, loading: false };
		case GET_CHARACTER_PICTURES:
			return { ...state, pictures: action.payload, loading: false };
		default:
			return state;
	}
};

export const GlobalContextProvider = ({ children }) => {
	const initialState = {
		pictures: [],
		isSearching: false,
		searchResults: [],
		loading: false,
		topAnime: [],
		popularAnime: [],
		airingAnime: [],
		myAnime: [],
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	const [search, setSearch] = useState('');

	const handleChange = event => {
		setSearch(event.target.value);
		if (event.target.value === '') {
			state.isSearching = false;
		}
	};

	const handleSubmit = event => {
		event.preventDefault();
		if (search) {
			searchAnime(search);
			state.isSearching = true;
		} else {
			state.isSearching = false;
			alert('Please enter a search term.');
		}
	};

	// Fetch top anime

	const getTopAnime = async () => {
		dispatch({ type: LOADING });
		const response = await fetch(`${baseURL}/top/anime`);
		const data = await response.json();
		dispatch({ type: GET_TOP_ANIME, payload: data.data });
	};

	// Fetch popular anime

	const getPopularAnime = async () => {
		dispatch({ type: LOADING });
		const response = await fetch(`${baseURL}/top/anime?filter=bypopularity`);
		const data = await response.json();
		dispatch({ type: GET_POPULAR_ANIME, payload: data.data });
	};

	// Fetch currently airing anime

	const getAiringAnime = async () => {
		dispatch({ type: LOADING });
		const response = await fetch(`${baseURL}/seasons/now`);
		const data = await response.json();
		dispatch({ type: GET_AIRING_ANIME, payload: data.data });
		// console.log(data.data);
	};

	// Searching for anime

	const searchAnime = async query => {
		dispatch({ type: LOADING });
		const response = await fetch(
			`${baseURL}/anime?q=${query}&order_by=score&sort=desc&sfw`
		);
		const data = await response.json();
		dispatch({ type: SEARCH, payload: data.data });
	};

	// Get character pictures

	const getCharacterPictures = async id => {
		dispatch({ type: LOADING });
		const response = await fetch(`${baseURL}/characters/${id}/pictures`);
		const data = await response.json();
		dispatch({ type: GET_CHARACTER_PICTURES, payload: data.data });
	};

	// Initial render

	useEffect(() => {
		getTopAnime();
	}, []);

	return (
		<GlobalContext.Provider
			value={{
				...state,
				handleChange,
				handleSubmit,
				getTopAnime,
				getPopularAnime,
				getAiringAnime,
				searchAnime,
				getCharacterPictures,
				search,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export const useGlobalContext = () => {
	return useContext(GlobalContext);
};
