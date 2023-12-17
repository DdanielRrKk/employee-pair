import styles from './DropdownMenu.module.css';

function DropdownMenu({label, options, selectHandler}) {
	function handleSelectOption(e) {
		selectHandler(e.target.value);
	}

	return (
		<div className={styles.container}>
			<h3>{label}</h3>

			<select
				className={styles.select}
				onChange={handleSelectOption}
			>
				<option value='none'>---Select---</option>
				{options.map(option => (
					<option
						key={option.value}
						value={option.value}
					>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
}

export default DropdownMenu;
