import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../Context/global';
import { Link } from 'react-router-dom';

function Sidebar() {
	const { randomAnime } = useGlobalContext();

	return (
		<SidebarStyled>
			<h3>My Favorites</h3>
			<div className='anime'>Placeholder</div>
		</SidebarStyled>
	);
}

const SidebarStyled = styled.div`
	margin-top: 2rem;
	background-color: white;
	border-top: 5px solid #e5e7eb;
	padding-right: 5rem;
	padding-left: 2rem;
	padding-top: 2rem;
	.anime {
		display: flex;
		flex-direction: column;
		width: 150px;
		img {
			width: 100%;
			border-radius: 5px;
			border: 5px solid #e5e7eb;
		}
		a {
			margin-top: 1rem;
			display: flex;
			flex-direction: column;
			gap: 0.4rem;
			color: #27ae60;
			h5 {
				font-size: 1.1rem;
			}
		}
	}
`;

export default Sidebar;
