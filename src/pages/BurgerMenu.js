import React from "react";

function BurgerMenu({ active, toggleSidebar }) {
	return (
		<div
			className={active ? "burger-menu active" : "burger-menu"}
			onClick={toggleSidebar}
		>
			<div className="bar1"></div>
			<div className="bar2"></div>
			<div className="bar3"></div>
		</div>
	);
}

export default BurgerMenu;
