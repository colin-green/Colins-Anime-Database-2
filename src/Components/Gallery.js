import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useGlobalContext } from '../Context/global';

function Gallery() {
	const { getCharacterPictures, pictures } = useGlobalContext();
	const { malID } = useParams();

	// Setting state

	const [index, setIndex] = React.useState(0);

	const handleImageClick = i => {
		setIndex(i);
	};

	React.useEffect(() => {
		getCharacterPictures(malID);
	}, [malID]);

	return (
		<GalleryStyled>
			<div className='back'>
				<Link to='/'>Home Page</Link>
			</div>
			<div className='big-image'>
				<img src={pictures[index]?.jpg.image_url} alt='' />
			</div>
			<div className='small-images'>
				{pictures?.map((picture, i) => {
					return (
						<div
							className='image-con'
							key={i}
							onClick={() => handleImageClick(i)}
						>
							<img
								src={picture?.jpg.image_url}
								style={{
									border: i === index ? '3px solid #27ae60' : '',
									filter: i === index ? 'grayscale(0)' : 'grayscale(75%)',
									transform: i === index ? 'scale(1.1)' : 'scale(1)',
									transition: 'all 0.1s ease-in-out',
								}}
								alt={i}
							/>
						</div>
					);
				})}
			</div>
		</GalleryStyled>
	);
}

const GalleryStyled = styled.div`
	background-color: #ededed;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	.back {
		position: absolute;
		top: 2rem;
		left: 2rem;
		a {
			font-weight: 600;
			color: brown;
		}
	}
	.big-image {
		display: inline-block;
		padding: 2rem;
		margin: 2rem 0;
		background-color: white;
		border-radius: 7px;
		border: 5px solid #e5e7eb;
		position: relative;
		img {
			width: 350px;
		}
	}
	.small-images {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		width: 80%;
		padding: 2rem;
		border-radius: 7px;
		background-color: white;
		border: 5px solid #e5e7eb;
		img {
			width: 6rem;
			height: 6rem;
			object-fit: cover;
			cursor: pointer;
			border-radius: 5px;
			border: 3px solid #e5e7eb;
		}
	}
`;

export default Gallery;
