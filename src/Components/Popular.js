import React from 'react';
import { useGlobalContext } from '../Context/global';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './Sidebar';

export default function Popular() {
	const { popularAnime, searchResults, isSearching } = useGlobalContext();

	const conditionalRender = () => {
		if (!isSearching) {
			return popularAnime.map(anime => {
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
		<PopularStyled>
			<div className='popular-anime'>{conditionalRender()}</div>
		</PopularStyled>
	);
}

const PopularStyled = styled.div`
	display: flex;
	.popular-anime {
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
