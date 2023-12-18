import {Outlet} from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';

import styles from './Layout.module.css';

function Layout() {
	return (
		<div className={styles.container}>
			<header>
				<Navbar />
			</header>

			<main>
				<Outlet />
			</main>

			<footer>
				<p>&copy; 2023 Employee Pairs. All rights reserved.</p>
			</footer>
		</div>
	);
}

export default Layout;
