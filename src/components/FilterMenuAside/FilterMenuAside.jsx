// Styles
import './filter-menu-aside.scss';

// Components
import Button from '../../components/Button/Button';

// Dependencies
import { useContext } from 'react';
import { HomeContext } from '../../context/HomeContext';

function FilterMenuAside() {
	//Functions
	const { handleToggleClick } = useContext(HomeContext);

	return (
		<aside className="filter-menu-aside">
			<h3 className="filter-menu-aside__subtitle">Filter</h3>

			<div className="filter-menu-aside__divider" />

			<div className="filter-menu-aside__body">
				<div className="filter-menu-aside__filter">
					<h2 className="filter-menu-aside__title">skill</h2>
					<div className="filter-menu-aside__filter-option">
						<p className="filter-menu-aside__filter-name">Recreational</p>
						<input className="filter-menu-aside__checkbox" type="checkbox" value="Recreational" />
					</div>
					<div className="filter-menu-aside__filter-option">
						<p className="filter-menu-aside__filter-name">Beginner</p>
						<input className="filter-menu-aside__checkbox" type="checkbox" value="Beginner" />
					</div>
					<div className="filter-menu-aside__filter-option">
						<p className="filter-menu-aside__filter-name">Intermediate</p>
						<input className="filter-menu-aside__checkbox" type="checkbox" value="Intermediate" />
					</div>
					<div className="filter-menu-aside__filter-option">
						<p className="filter-menu-aside__filter-name">Advanced</p>
						<input className="filter-menu-aside__checkbox" type="checkbox" value="Advanced" />
					</div>
				</div>
				<div className="filter-menu-aside__filter">
					<h2 className="filter-menu-aside__title">gender</h2>
					<div className="filter-menu-aside__filter-option">
						<p className="filter-menu-aside__filter-name">Mens</p>
						<input className="filter-menu-aside__checkbox" type="checkbox" value="Mens" />
					</div>
					<div className="filter-menu-aside__filter-option">
						<p className="filter-menu-aside__filter-name">Womens</p>
						<input className="filter-menu-aside__checkbox" type="checkbox" value="Womens" />
					</div>
					<div className="filter-menu-aside__filter-option">
						<p className="filter-menu-aside__filter-name">Coed</p>
						<input className="filter-menu-aside__checkbox" type="checkbox" value="Coed" />
					</div>
				</div>
				<div className="filter-menu-aside__filter">
					<h2 className="filter-menu-aside__title">type</h2>
					<div className="filter-menu-aside__filter-option">
						<p className="filter-menu-aside__filter-name">Beach</p>
						<input className="filter-menu-aside__checkbox" type="checkbox" value="Indoor Beach" />
					</div>
					<div className="filter-menu-aside__filter-option">
						<p className="filter-menu-aside__filter-name">Court</p>
						<input className="filter-menu-aside__checkbox" type="checkbox" value="Court" />
					</div>
					<div className="filter-menu-aside__filter-option">
						<p className="filter-menu-aside__filter-name">Grass</p>
						<input className="filter-menu-aside__checkbox" type="checkbox" value="Grass" />
					</div>
					<div className="filter-menu-aside__filter-option">
						<p className="filter-menu-aside__filter-name">Tournament</p>
						<input className="filter-menu-aside__checkbox" type="checkbox" value="Tournament" />
					</div>
				</div>
			</div>

			<div className="filter-menu-aside__divider" />

			<div className="filter-menu-aside__footer">
				<p
					className="filter-menu-aside__CTA"
					onClick={() => {
						handleToggleClick('filterMenuAside');
					}}
				>
					Close
				</p>
				<Button text="Search" types={[ 'blue', 'small' ]} />
			</div>
		</aside>
	);
}

export default FilterMenuAside;
