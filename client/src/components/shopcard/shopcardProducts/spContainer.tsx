import SpcRowHead from "./spcRowHead";
import SpcRowContent from "./spcRowContent";
import SpcRowFoot from "./spcRowFoot";

function SpContainer() {
	return (
		<div className="container-fluid">
			<SpcRowHead />
			<SpcRowContent />
			<SpcRowFoot />
		</div>
	);
}

export default SpContainer;