import {NavLink} from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
	return (
		<nav className={styles.navbar}>
			<span>Employee Pairs</span>

			<ul>
				<li>
					<NavLink to='/'>Home</NavLink>
				</li>
				<li>
					<NavLink to='/controls'>Controls</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;
