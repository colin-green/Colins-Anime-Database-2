import { useState } from 'react';
import Popular from './Popular';
import Airing from './Airing';
import Top from './Top';
import { useGlobalContext } from '../Context/global';
import styled from 'styled-components';
import Sidebar from './Sidebar';

function HomePage() {
	const {
		handleChange,
		handleSubmit,
		search,
		isSearching,
		getTopAnime,
		getPopularAnime,
		getAiringAnime,
	} = useGlobalContext();

	const [rendered, setRendered] = useState('top');

	const switchComponent = () => {
		switch (rendered) {
			case 'top':
				return <Top rendered={rendered} />;
			case 'popular':
				return <Popular rendered={rendered} />;
			case 'airing':
				return <Airing rendered={rendered} />;
			default:
				return <Top rendered={rendered} />;
		}
	};

	return (
		<>
			<HomePageStyled>
				<header>
					<div className='logo'>
						<h1>
							{rendered === 'popular'
								? 'Popular Anime'
								: rendered === 'airing'
								? 'Currently Airing Anime'
								: rendered === 'top'
								? 'Top Ranked Anime'
								: 'Search Results'}
						</h1>
					</div>
					<div className='search-container'>
						<div className='filter-btn top-filter'>
							<button
								onClick={() => {
									if (rendered !== 'top') {
										setRendered('top');
										getTopAnime();
									}
								}}
							>
								Top Ranked
							</button>
						</div>
						<div className='filter-btn popular-filter'>
							<button
								onClick={() => {
									if (rendered !== 'popular') {
										setRendered('popular');
										getPopularAnime();
									}
								}}
							>
								Popular
							</button>
						</div>
						<div className='filter-btn airing-filter'>
							<button
								onClick={() => {
									if (rendered !== 'airing') {
										setRendered('airing');
										getAiringAnime();
									}
								}}
							>
								Currently Airing
							</button>
						</div>
						<form action='' className='search-form' onSubmit={handleSubmit}>
							<div className='input-control'>
								<input
									type='text'
									placeholder='Search for an anime'
									value={search}
									onChange={handleChange}
								></input>
								<button type='submit'>Search</button>
							</div>
						</form>
					</div>
				</header>
				{switchComponent()}
			</HomePageStyled>
		</>
	);
}

export default HomePage;

const HomePageStyled = styled.div`
	background-color: #ededed;
	header {
		padding: 2rem 5rem;
		width: 60%;
		margin: 0 auto;
		transition: all 0.4s ease-in-out;
		.logo {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom: 2rem;
		}
		.search-container {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 1rem;
			button {
				display: flex;
				align-items: center;
				gap: 0.5rem;
				padding: 0.5rem 1rem;
				outline: none;
				border-radius: 20px;
				font-size: 1rem;
				background-color: white;
				cursor: pointer;
				transition: all 0.4s ease-in-out;
				border: 5px solid #e5e7eb;
			}
			form {
				position: relative;
				width: 100%;
				.input-control input {
					padding: 0.7rem 1rem;
					border: none;
					outline: none;
					border-radius: 20px;
				}
			}
		}
	}
`;
