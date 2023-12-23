import {Routes, Route} from 'react-router-dom';

import Feed from './pages/feed/Feed';
import Statistics from './pages/statistics/Statistics';

import './App.css';
import Layout from './pages/layout/Layout';

function App() {
	return (
		<Routes>
			<Route
				path='/'
				element={<Layout />}
			>
				<Route
					path=''
					element={<Feed />}
				/>
				<Route
					path='/statistics'
					element={<Statistics />}
				/>
			</Route>
		</Routes>
	);
}

export default App;
