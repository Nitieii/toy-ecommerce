import SpcRowHead from "./spcRowHead.tsx";
import SpcRowContent from "./spcRowContent.tsx";
import SpcRowFoot from "./spcRowFoot.tsx";

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