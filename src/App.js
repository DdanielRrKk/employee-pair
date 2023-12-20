import {Routes, Route} from 'react-router-dom';

import Feed from './pages/feed/Feed';
import Controls from './pages/controls/Controls';

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
					path='/controls'
					element={<Controls />}
				/>
			</Route>
		</Routes>
	);
}

export default App;
