import React from 'react';
// import FootRowLogo from "./footRowLogo";
import FootRowMenu from "./footRowMenu";

function FootRow(props) {
	return (
		<div className="row align-items-center">
			{/*<FootRowLogo />*/}
			<FootRowMenu />
		</div>
	);
}

export default FootRow;