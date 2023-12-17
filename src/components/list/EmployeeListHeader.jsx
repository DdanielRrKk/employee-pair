import DropdownMenu from '../dropdownMenu/DropdownMenu';
import {SORT_DROPDOWN_OPTIONS} from '../../utils/constants';
import styles from './List.module.css';

function EmployeeListHeader({count, selectHandler}) {
	return (
		<div className={styles.header}>
			<h3>RESULT {count}</h3>
			<DropdownMenu
				label='SORT BY'
				options={SORT_DROPDOWN_OPTIONS}
				selectHandler={selectHandler}
			/>
		</div>
	);
}

export default EmployeeListHeader;
