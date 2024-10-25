import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

function AnimeItem() {
	const { malID } = useParams();

	// State management

	const [anime, setAnime] = useState({});
	const [characters, setCharacters] = useState([]);
	const [showMore, setShowMore] = useState(false);

	// Destructuring  the anime

	const {
		title,
		title_english,
		synopsis,
		trailer,
		duration,
		aired,
		season,
		images,
		rank,
		score,
		scored_by,
		popularity,
		status,
		rating,
		source,
	} = anime;

	function capitalize(word) {
		return word?.charAt(0).toUpperCase() + word?.slice(1);
	}

	function showMoreHandler() {
		setShowMore(!showMore);
	}

	// Fetch anime using the malID

	const getAnime = async animeID => {
		const response = await fetch(`https://api.jikan.moe/v4/anime/${animeID}`);
		const data = await response.json();
		setAnime(data.data);
	};

	// Fetch characters

	const getCharacters = async animeID => {
		const response = await fetch(
			`https://api.jikan.moe/v4/anime/${animeID}/characters`
		);
		const data = await response.json();
		setCharacters(data.data);
	};

	// Initial render

	useEffect(() => {
		getAnime(malID);
		getCharacters(malID);
	}, []);

	return (
		<AnimeItemStyled>
			<h1>{title}</h1>
			{title !== title_english && <h2>aka {title_english}</h2>}
			<div className='details'>
				<div className='detail'>
					<div className='image'>
						<img src={images?.jpg.large_image_url} alt={title}></img>
					</div>
					<div className='anime-details'>
						<p>
							<span>Aired: </span>
							<span>{aired?.string}</span>
						</p>
						<p>
							<span>Rating: </span>
							<span>{rating}</span>
						</p>
						<p>
							<span>Rank: </span>
							<span>{rank}</span>
						</p>
						<p>
							<span>Score: </span>
							<span>{score}</span>
						</p>
						<p>
							<span>Scored By: </span>
							<span>{scored_by}</span>
						</p>
						<p>
							<span>Popularity Rank: </span>
							<span>{popularity}</span>
						</p>
						<p>
							<span>Status: </span>
							<span>{status}</span>
						</p>
						<p>
							<span>Source: </span>
							<span>{source}</span>
						</p>
						<p>
							<span>Season: </span>
							<span>{capitalize(season)}</span>
						</p>
						<p>
							<span>Duration: </span>
							<span>{duration}</span>
						</p>
					</div>
				</div>
				<p className='description'>
					{showMore ? synopsis : synopsis?.substring(0, 450) + '...'}
					<button onClick={showMoreHandler}>
						{showMore ? 'Show Less' : 'Show More'}
					</button>
				</p>
			</div>
			<h3 className='title'>Trailer</h3>
			<div className='trailer-container'>
				{trailer?.embed_url && (
					<iframe
						// Slice removes the autoplay from the embed URL
						src={trailer?.embed_url.slice(0, -11)}
						title={title}
						width='800'
						height='450'
					/>
				)}
			</div>
			<h3 className='title'>Characters</h3>
			<div className='characters'>
				{characters?.map((character, index) => {
					const { role } = character;
					const { images, name, mal_id } = character.character;
					return (
						<Link to={`/character/${mal_id}`} key={index}>
							<div className='character'>
								<img src={images?.jpg.image_url} alt={name} />
								<h4>{name}</h4>
								<p>{role}</p>
							</div>
						</Link>
					);
				})}
			</div>
		</AnimeItemStyled>
	);
}

const AnimeItemStyled = styled.div`
	padding: 3rem 18rem;
	background-color: #ededed;
	h1 {
		display: inline-block;
		font-size: 3rem;
		margin-bottom: 1.5rem;
		cursor: pointer;
		background: linear-gradient(to right, green, cyan);
	}
	.title {
		display: inline-block;
		font-size: 2rem;
		margin: 3rem 0;
		cursor: pointer;
		background: linear-gradient(to right, green, cyan);
	}
	.description {
		margin-top: 2rem;
		color: green;
		line-height: 1.7rem;
		button {
			background-color: transparent;
			border: none;
			outline: none;
			cursor: pointer;
			font-size: 1.2rem;
			color: blue;
			font-weight: 600;
		}
	}
	.trailer-container {
		display: flex;
		justify-content: center;
		align-items: center;
		iframe {
			outline: none;
			border: 5px solid #e5e7eb;
			padding: 1.5rem;
			border-radius: 10px;
			background-color: white;
		}
	}
	.details {
		background-color: white;
		border-radius: 20px;
		padding: 2rem;
		border: 5px solid #e5e7eb;
		.detail {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			img {
				border-radius: 7px;
			}
		}
		.anime-details {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			p {
				display: flex;
				gap: 1rem;
			}
			p span:first-child {
				font-weight: 600;
				color: #6c7983;
			}
		}
	}
	.characters {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		grid-gap: 2rem;
		background-color: white;
		padding: 2rem;
		border-radius: 20px;
		border: 5px solid #e5e7eb;
		.character {
			padding: 0.4rem 0.6rem;
			border-radius: 7px;
			background-color: #ededed;
			transition: all 0.4s ease-in-out;
			img {
				width: 100%;
			}
			h4 {
				color: #454e56;
			}
			p {
				color: green;
			}
			&:hover {
				transform: translateY(-5px);
			}
		}
	}
`;

export default AnimeItem;
