import {NavLink} from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
	return (
		<nav className={styles.navbar}>
			<p>
				Employee <span>Pairs</span>
			</p>

			<ul>
				<li>
					<NavLink to='/'>Home</NavLink>
				</li>
				<li>
					<NavLink to='/statistics'>Statistics</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;
