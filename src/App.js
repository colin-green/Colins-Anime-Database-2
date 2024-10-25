import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';
import AnimeItem from './Components/AnimeItem';
import Gallery from './Components/Gallery';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/anime/:malID' element={<AnimeItem />} />
				<Route path='/character/:malID' element={<Gallery />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
