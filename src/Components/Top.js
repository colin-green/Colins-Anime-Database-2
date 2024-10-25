import React from 'react';
import { useGlobalContext } from '../Context/global';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './Sidebar';

export default function Top({ rendered }) {
	const { topAnime, isSearching, searchResults } = useGlobalContext();

	const conditionalRender = () => {
		if (!isSearching) {
			return topAnime.map(anime => {
				return (
					<Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
						<img src={anime.images.jpg.large_image_url} alt={anime.title} />
					</Link>
				);
			});
		} else {
			return searchResults?.map(anime => {
				return (
					<Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
						<img src={anime.images.jpg.large_image_url} alt={anime.title} />
					</Link>
				);
			});
		}
	};

	return (
		<TopStyled>
			<div className='top-anime'>{conditionalRender()}</div>
		</TopStyled>
	);
}

const TopStyled = styled.div`
	display: flex;
	.top-anime {
		margin-top: 2rem;
		padding-top: 2rem;
		padding-bottom: 2rem;
		padding-left: 5rem;
		padding-right: 5rem;
		width: 100%;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		grid-gap: 2rem;
		background-color: #fff;
		border-top: 5px solid green;
		a {
			height: 500px;
			border-radius: 7px;
			border: 5px solid green;
		}
		a img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			border-radius: 5px;
		}
	}
`;
