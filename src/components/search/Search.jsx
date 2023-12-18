import DropdownMenu from '../dropdownMenu/DropdownMenu';
import styles from './Search.module.css';

function Search({options, selectHandler, changeHandler}) {
	return (
		<div className={styles.search}>
			<DropdownMenu
				label='SEARCH BY'
				options={options}
				selectHandler={selectHandler}
			/>

			<input
				type='text'
				placeholder='Search...'
				onChange={changeHandler}
			/>
		</div>
	);
}

export default Search;
